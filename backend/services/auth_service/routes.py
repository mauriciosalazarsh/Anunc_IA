# backend/services/auth_service/routes.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from services.auth_service import security, schemas
from common.database.database import get_db
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from common.models.usuario import Usuario, Cuenta
from common.schemas.usuario import UsuarioCreate, UsuarioResponse
from services.user_service.routes import get_password_hash  # Importar la función de hash

router = APIRouter()

@router.post("/register", response_model=UsuarioResponse, status_code=status.HTTP_201_CREATED, summary="Registrar un nuevo usuario")
def register_usuario(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    db_usuario = db.query(Usuario).filter(Usuario.email == usuario.email).first()
    if db_usuario:
        raise HTTPException(status_code=400, detail="El email ya está registrado.")
    
    try:
        # Crear el usuario con campos básicos
        hashed_password = security.get_password_hash(usuario.password)
        nuevo_usuario = Usuario(
            nombre=usuario.nombre,
            email=usuario.email,
            contraseña=hashed_password
        )
        
        # Crear una cuenta asociada con valores predeterminados
        nueva_cuenta = Cuenta(
            tipo_cuenta="Standard",
            saldo=0.0
        )
        nuevo_usuario.cuenta = nueva_cuenta
        
        db.add(nuevo_usuario)
        db.commit()
        db.refresh(nuevo_usuario)
        
        return nuevo_usuario
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Error al registrar el usuario.")

@router.post("/login", response_model=schemas.Token, summary="Iniciar sesión de un usuario")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = security.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Credenciales inválidas.",
        )
    access_token_expires = timedelta(minutes=security.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
