import redis.asyncio as aioredis
from datetime import timedelta
import os
import asyncio
import logging

# Configuración básica de logging
logger = logging.getLogger("uvicorn.error")
logger.setLevel(logging.INFO)

SESSION_TIMEOUT = timedelta(minutes=30)

class SessionManager:
    redis_client = None

    @classmethod
    async def initialize_redis(cls):
        """Inicializa la conexión a Redis si no está ya establecida."""
        if cls.redis_client is None:
            redis_url = os.getenv("REDIS_URL", "redis://redis:6379")  # URL por defecto para Docker
            logger.info(f"Conectando a Redis en: {redis_url}")
            try:
                cls.redis_client = aioredis.from_url(
                    redis_url,
                    decode_responses=True,
                    socket_timeout=5,          # Tiempo de espera para operaciones
                    socket_connect_timeout=5   # Tiempo de espera para la conexión
                )
                # Verifica la conexión
                pong = await cls.redis_client.ping()
                if pong:
                    logger.info("Conexión a Redis exitosa.")
            except Exception as e:
                logger.error(f"Error conectando a Redis: {e}")
                raise

    @classmethod
    async def close_redis(cls):
        """Cierra la conexión a Redis si está establecida."""
        if cls.redis_client:
            await cls.redis_client.close()
            cls.redis_client = None
            logger.info("Conexión a Redis cerrada.")

    def __init__(self):
        """Inicializa una instancia de SessionManager. Asegura que Redis esté inicializado."""
        if SessionManager.redis_client is None:
            raise Exception("Redis no está inicializado. Llama a 'SessionManager.initialize_redis()' primero.")
        self.redis = SessionManager.redis_client

    async def store_jwt(self, session_id: str, jwt_token: str):
        """Almacena un JWT asociado a una sesión."""
        try:
            await self.redis.set(session_id, jwt_token, ex=int(SESSION_TIMEOUT.total_seconds()))
            logger.info(f"JWT almacenado para sesión: {session_id}")
        except Exception as e:
            logger.error(f"Error almacenando JWT: {e}")
            raise

    async def get_jwt(self, session_id: str):
        """Recupera un JWT asociado a una sesión."""
        try:
            jwt = await self.redis.get(session_id)
            logger.info(f"JWT recuperado para sesión: {session_id}")
            return jwt
        except Exception as e:
            logger.error(f"Error obteniendo JWT: {e}")
            raise

    async def delete_jwt(self, session_id: str):
        """Elimina un JWT asociado a una sesión."""
        try:
            await self.redis.delete(session_id)
            logger.info(f"JWT eliminado para sesión: {session_id}")
        except Exception as e:
            logger.error(f"Error eliminando JWT: {e}")
            raise

    @staticmethod
    async def test_redis_connection():
        """Prueba la conexión a Redis."""
        try:
            redis_url = os.getenv("REDIS_URL", "redis://redis:6379")
            redis_client = aioredis.from_url(
                redis_url,
                decode_responses=True,
                socket_timeout=5,
                socket_connect_timeout=5
            )
            pong = await redis_client.ping()
            logger.info(f"Conexión exitosa a Redis: {pong}")
        except Exception as e:
            logger.error(f"Error conectando a Redis: {e}")
            raise
        finally:
            await redis_client.close()

# Evitar `asyncio.run()` directamente si el módulo se ejecuta dentro de un entorno que ya tiene un bucle de eventos.
if __name__ == "__main__":
    asyncio.run(SessionManager.test_redis_connection())