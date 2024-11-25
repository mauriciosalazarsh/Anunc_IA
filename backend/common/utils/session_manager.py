import redis.asyncio as aioredis
from datetime import timedelta
import os
import asyncio

SESSION_TIMEOUT = timedelta(minutes=30)

# Conexión global
redis_client = None

class SessionManager:
    def __init__(self, redis_url=None):
        global redis_client
        if redis_url is None:
            redis_url = os.getenv("REDIS_URL", "redis://redis:6379")  # Usa 'redis' si está en Docker
        print(f"Conectando a Redis en: {redis_url}")
        
        if redis_client is None:
            try:
                redis_client = aioredis.from_url(redis_url, decode_responses=True)
            except Exception as e:
                print(f"Error conectando a Redis: {e}")
                raise
        self.redis = redis_client

    async def store_jwt(self, session_id: str, jwt_token: str):
        """Almacena un JWT asociado a una sesión."""
        try:
            await self.redis.set(session_id, jwt_token, ex=int(SESSION_TIMEOUT.total_seconds()))
        except Exception as e:
            print(f"Error almacenando JWT: {e}")
            raise

    async def get_jwt(self, session_id: str):
        """Recupera un JWT asociado a una sesión."""
        try:
            return await self.redis.get(session_id)
        except Exception as e:
            print(f"Error obteniendo JWT: {e}")
            raise

    async def delete_jwt(self, session_id: str):
        """Elimina un JWT asociado a una sesión."""
        try:
            await self.redis.delete(session_id)
        except Exception as e:
            print(f"Error eliminando JWT: {e}")
            raise

    @staticmethod
    async def test_redis_connection():
        """Prueba la conexión a Redis."""
        try:
            redis_url = os.getenv("REDIS_URL")
            redis_client = aioredis.from_url(redis_url, decode_responses=True)
            # Prueba la conexión con un comando PING
            pong = await redis_client.ping()
            print(f"Conexión exitosa a Redis: {pong}")
        except Exception as e:
            print(f"Error conectando a Redis: {e}")
            raise
        finally:
            await redis_client.close()

# Evitar `asyncio.run()` directamente si el módulo se ejecuta dentro de un entorno que ya tiene un bucle de eventos.
if __name__ == "__main__":
    asyncio.run(SessionManager.test_redis_connection())
