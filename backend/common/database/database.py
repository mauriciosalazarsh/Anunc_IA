import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv  # Asegúrate de cargar dotenv

# Cargar las variables de entorno desde el archivo .env
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../../.env'))

# Obtener la URL de la base de datos
DATABASE_URL = os.getenv("DATABASE_URL")

# Verificar si se ha cargado correctamente la URL de la base de datos
if DATABASE_URL is None:
    raise ValueError("DATABASE_URL no está definida. Asegúrate de tener un archivo .env correctamente configurado.")

# Configuración de la base de datos con parámetros adicionales para conexiones remotas
engine = create_engine(
    DATABASE_URL,
    pool_size=10,              # Tamaño del pool de conexiones
    max_overflow=20,           # Conexiones adicionales que se pueden abrir si el pool está lleno
    pool_timeout=30,           # Tiempo de espera máximo para obtener una conexión
    pool_recycle=1800,         # Tiempo de reciclaje de conexiones (en segundos)
    pool_pre_ping=True         # Verifica la conexión antes de usarla
)

# Crear la sesión de SQLAlchemy
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependencia para obtener la sesión de la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
