# tests/conftest.py

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.common.database.database import get_db  # Importar get_db desde la misma ubicación
from fastapi.testclient import TestClient
from backend.main import app
import os
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Obtener la URL de la base de datos de producción
DATABASE_URL = os.getenv("DATABASE_URL")

logger.info(f"Usando DATABASE_URL para pruebas: {DATABASE_URL}")

# Crear el motor de base de datos
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Anular la dependencia get_db para usar la base de datos de producción
def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

# Crear un cliente de pruebas
@pytest.fixture(scope="module")
def test_client():
    with TestClient(app) as client:
        yield client
