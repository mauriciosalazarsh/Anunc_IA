from fastapi import Depends, HTTPException, status, Request
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from common.database.database import get_db
from common.models.usuario import Usuario
from passlib.context import CryptContext
from common.utils.session_manager import SessionManager  # Importar SessionManager
import os
from datetime import datetime, timedelta, timezone
import logging

# Configuración básica de logging
logger = logging.getLogger("uvicorn.error")

# Configuración para el manejo de contraseñas
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

# Configuración para tokens JWT
SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    raise ValueError("SECRET_KEY no está configurada en las variables de entorno.")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Función para inicializar `SessionManager` como dependencia
async def get_session_manager() -> SessionManager:
    """Devuelve una instancia de SessionManager."""
    return SessionManager()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(
    request: Request,
    db: Session = Depends(get_db),
    session_manager: SessionManager = Depends(get_session_manager),
):
    """Obtiene al usuario actual a partir de un token almacenado en Redis."""
    session_id = request.cookies.get("session_id")
    if not session_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales no proporcionadas.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Obtener el JWT desde Redis
    try:
        token = await session_manager.get_jwt(session_id)
        if not token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Sesión inválida o expirada.",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Convertir bytes a string si es necesario
        if isinstance(token, bytes):
            token = token.decode("utf-8")
    except Exception as e:
        logger.error(f"Error al obtener el token desde Redis: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error interno del servidor.",
        )

    try:
        # Decodificar el token y verificar su validez
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token inválido.",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido o expirado.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Buscar al usuario en la base de datos
    user = db.query(Usuario).filter(Usuario.email == email).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario no encontrado.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return user

def authenticate_user(db: Session, email: str, password: str):
    """Autentica a un usuario verificando su email y contraseña."""
    user = db.query(Usuario).filter(Usuario.email == email).first()
    if not user:
        return False
    if not verify_password(password, user.contraseña):
        return False
    return user