import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from common.database.database import Base, get_db
from alembic.config import Config
from alembic import command
from fastapi.testclient import TestClient
from backend.main import app

# Crear un motor de base de datos en memoria para pruebas
SQLALCHEMY_TEST_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(SQLALCHEMY_TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Crear las tablas en la base de datos de pruebas
Base.metadata.create_all(bind=engine)

# Aplicar migraciones usando Alembic
alembic_cfg = Config("alembic.ini")
alembic_cfg.set_main_option("sqlalchemy.url", SQLALCHEMY_TEST_DATABASE_URL)
command.upgrade(alembic_cfg, "head")

# Anular la dependencia get_db para usar la base de datos de pruebas
def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(scope="module")
def test_client():
    with TestClient(app) as client:
        yield client