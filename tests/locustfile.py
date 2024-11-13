from locust import HttpUser, task, between
import random
import string

class FastAPIUser(HttpUser):
    wait_time = between(25, 30)
    host = "http://localhost:8000"

    def on_start(self):
        # Registrar y autenticar al usuario al iniciar
        self.register_user()

    def register_user(self):
        # Generar datos aleatorios
        random_name = ''.join(random.choices(string.ascii_letters, k=8))
        random_email = f"{random_name.lower()}@example.com"
        random_password = ''.join(random.choices(string.ascii_letters + string.digits, k=10))

        # Hacer la solicitud POST para el registro de usuario
        response = self.client.post("/auth/register", json={
            "nombre": random_name,
            "email": random_email,
            "password": random_password
        })

        # Guardar las credenciales y la cookie de sesión
        if "session_id" in response.cookies:
            self.client.cookies.set("session_id", response.cookies.get("session_id"))
            self.email = random_email
            self.password = random_password
        else:
            print("Error al registrar usuario.")

    @task(1)
    def definir_campana(self):
        self.client.post("/content/definir_campana", json={
            "nombreProducto": "Producto de prueba",
            "descripcionProducto": "Este es un producto de prueba para las pruebas de carga.",
            "tipoCampana": "Mediana",
            "duracionPreferida": "Media"
        })

    @task(1)
    def definir_publico_ubicaciones(self):
        self.client.post("/content/definir_publico_ubicaciones", json={
            "nombreProducto": "Producto de prueba",
            "descripcionProducto": "Descripción del producto",
            "distrito": "Miraflores",
            "provincia": "Lima",
            "departamento": "Lima"
        })

    @task(1)
    def elegir_formato_cta(self):
        self.client.post("/content/elegir_formato_cta", json={
            "nombreProducto": "Producto de prueba",
            "descripcionProducto": "Descripción breve"
        })

    @task(1)
    def crear_contenido_creativo(self):
        self.client.post("/content/crear_contenido_creativo", json={
            "nombreProducto": "Producto de prueba",
            "descripcionProducto": "Descripción del producto",
            "tonoEstilo": "Moderno y atractivo",
            "publicoObjetivo": "Jóvenes interesados en tecnología"
        })

    @task(1)
    def create_heading(self):
        self.client.post("/content/create_heading", json={
            "nombreProducto": "Producto de prueba",
            "descripcionProducto": "Un producto innovador para mejorar la productividad",
            "palabrasClave": ["eficiencia", "tecnología", "innovación"],
            "estiloEscritura": "Profesional",
            "longitudMaxima": 60,
            "variantes": 3
        })