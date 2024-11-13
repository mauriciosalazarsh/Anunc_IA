import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.common.database.database import Base, get_db
from alembic.config import Config
from alembic import command
from fastapi.testclient import TestClient
from backend.main import app
import os
import tempfile

# Crear un archivo temporal para la base de datos SQLite
db_fd, db_path = tempfile.mkstemp()
TEST_DATABASE_URL = f"sqlite:///{db_path}"

# Crear el motor de base de datos
engine = create_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False}
)

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Aplicar migraciones usando Alembic
alembic_ini_path = os.path.join(os.path.dirname(__file__), "../backend/alembic.ini")
alembic_cfg = Config(alembic_ini_path)
alembic_cfg.set_main_option("script_location", os.path.join(os.path.dirname(__file__), "../backend/migrations"))
alembic_cfg.set_main_option("sqlalchemy.url", TEST_DATABASE_URL)
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

# Eliminar el archivo de base de datos temporal después de las pruebas
@pytest.fixture(scope='session', autouse=True)
def cleanup(request):
    def remove_db():
        os.close(db_fd)
        os.unlink(db_path)
    request.addfinalizer(remove_db)
