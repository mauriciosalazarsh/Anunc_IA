# tests/test_auth.py
import pytest
from fastapi.testclient import TestClient
from unittest.mock import AsyncMock, patch
from backend.main import app
from backend.common.utils.session_manager import SessionManager

client = TestClient(app)

@pytest.fixture(autouse=True)
def mock_redis():
    # Crear un mock para la instancia de Redis ya inicializada en SessionManager
    with patch.object(SessionManager, 'redis', new_callable=AsyncMock) as mock_redis_instance:
        yield mock_redis_instance

@pytest.fixture
def test_user():
    return {
        "nombre": "Test User",
        "email": "testuser@example.com",
        "password": "password123"
    }

def test_register_user(test_user):
    response = client.post("/auth/register", json=test_user)
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == test_user["email"]
    assert "id_usuario" in data

def test_register_existing_user(test_user):
    client.post("/auth/register", json=test_user)
    response = client.post("/auth/register", json=test_user)
    assert response.status_code == 400
    assert response.json()["detail"] == "El email ya está registrado."

def test_login_user(test_user):
    client.post("/auth/register", json=test_user)
    login_data = {
        "username": test_user["email"],
        "password": test_user["password"]
    }
    response = client.post("/auth/login", data=login_data)
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_login_invalid_credentials():
    login_data = {
        "username": "nonexistent@example.com",
        "password": "wrongpassword"
    }
    response = client.post("/auth/login", data=login_data)
    assert response.status_code == 400
    assert response.json()["detail"] == "Credenciales inválidas."

def test_logout_user(test_user):
    client.post("/auth/register", json=test_user)
    login_data = {
        "username": test_user["email"],
        "password": test_user["password"]
    }
    login_response = client.post("/auth/login", data=login_data)
    session_id = login_response.cookies.get("session_id")
    response = client.post("/auth/logout", cookies={"session_id": session_id})
    assert response.status_code == 200
    assert response.json()["message"] == "Sesión cerrada"

def test_check_session_valid(test_user):
    client.post("/auth/register", json=test_user)
    login_data = {
        "username": test_user["email"],
        "password": test_user["password"]
    }
    login_response = client.post("/auth/login", data=login_data)
    session_id = login_response.cookies.get("session_id")
    response = client.get("/auth/check_session", cookies={"session_id": session_id})
    assert response.status_code == 200
    assert response.json()["message"] == "Sesión válida"

def test_check_session_invalid():
    response = client.get("/auth/check_session")
    assert response.status_code == 401
    assert response.json()["detail"] == "Credenciales no proporcionadas."
