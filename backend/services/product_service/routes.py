from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from common.database.database import get_db
from services.product_service import schemas, handlers
from common.models.usuario import Usuario
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta
from services.auth_service.security import SECRET_KEY, ALGORITHM

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

router = APIRouter()

# Función para obtener el usuario actual a partir del token
def obtener_usuario_actual(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> Usuario:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No pudo validar las credenciales",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    usuario = db.query(Usuario).filter(Usuario.email == email).first()
    if usuario is None:
        raise credentials_exception
    return usuario

@router.get("/", response_model=List[schemas.ProductoOut], summary="Listar productos del usuario")
def listar_productos(skip: int = 0, limit: int = 10, usuario: Usuario = Depends(obtener_usuario_actual), db: Session = Depends(get_db)):
    productos = handlers.obtener_productos_por_usuario(db, usuario.id_usuario, skip, limit)
    return productos

@router.post("/", response_model=schemas.ProductoOut, status_code=status.HTTP_201_CREATED, summary="Crear un nuevo producto")
def crear_nuevo_producto(producto: schemas.ProductoCreate, usuario: Usuario = Depends(obtener_usuario_actual), db: Session = Depends(get_db)):
    nuevo_producto = handlers.crear_producto(db, producto, usuario.id_usuario)
    return nuevo_producto

@router.get("/{producto_id}", response_model=schemas.ProductoOut, summary="Obtener un producto específico")
def obtener_un_producto(producto_id: int, usuario: Usuario = Depends(obtener_usuario_actual), db: Session = Depends(get_db)):
    producto = handlers.obtener_producto(db, producto_id, usuario.id_usuario)
    return producto

@router.put("/{producto_id}", response_model=schemas.ProductoOut, summary="Actualizar un producto")
def actualizar_un_producto(producto_id: int, producto_update: schemas.ProductoUpdate, usuario: Usuario = Depends(obtener_usuario_actual), db: Session = Depends(get_db)):
    producto = handlers.actualizar_producto(db, producto_id, producto_update, usuario.id_usuario)
    return producto

@router.delete("/{producto_id}", status_code=status.HTTP_200_OK, summary="Eliminar un producto")
def eliminar_un_producto(producto_id: int, usuario: Usuario = Depends(obtener_usuario_actual), db: Session = Depends(get_db)):
    resultado = handlers.eliminar_producto(db, producto_id, usuario.id_usuario)
    return resultado