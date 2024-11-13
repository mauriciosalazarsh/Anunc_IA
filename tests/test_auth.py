import pytest
from fastapi.testclient import TestClient
from backend.main import app
import uuid

client = TestClient(app)

def test_register_and_login_user():
    # Genera un correo electrónico único para evitar duplicados
    unique_email = f"testuser_{uuid.uuid4()}@example.com"

    # Registro del usuario con correo único
    response = client.post("/auth/register", json={
        "nombre": "Test User",
        "email": unique_email,
        "password": "passwordTest123"
    })
    assert response.status_code == 201
    assert response.json()["email"] == unique_email

    # Iniciar sesión
    response = client.post("/auth/login", data={
        "username": unique_email,
        "password": "passwordTest123"
    }, allow_redirects=True)
    assert response.status_code == 200
    assert response.json()["message"] == "Inicio de sesión exitoso"
    assert "session_id" in response.cookies

    # Configurar la cookie de sesión para solicitudes posteriores
    client.cookies.set("session_id", response.cookies.get("session_id"))

    # Realizar una solicitud a una ruta protegida
    response = client.get(f"/user/{response.json()['user']['id_usuario']}")  # Ajusta la ruta según tu aplicación
    assert response.status_code == 200