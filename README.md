
AnuncIA - Despliegue Local
----------

Este proyecto es una aplicación para la automatización de anuncios con inteligencia artificial (AnuncIA). A continuación, se presentan las instrucciones para desplegar y ejecutar el proyecto localmente utilizando Docker y Docker Compose.
tu vijea come pinga
Requisitos
----------

Asegúrate de tener instaladas las siguientes herramientas en tu sistema antes de continuar:

- Git (https://git-scm.com/)
- Docker (https://www.docker.com/)
- Docker Compose (https://docs.docker.com/compose/)

Instrucciones de Despliegue Local
---------------------------------

1. Clonar el repositorio

Primero, clona este repositorio en tu máquina local:

    git clone https://github.com/christophernajarro/Anunc_IA.git
    cd Anunc_IA

2. Configurar las variables de entorno

Copia el archivo de ejemplo para las variables de entorno y modifícalo con tus propios valores:

    .env

Modifica el archivo .env para configurar los valores necesarios, como las credenciales de base de datos y claves secretas.

3. Construir y levantar los contenedores de Docker

Usa Docker Compose para construir y ejecutar la aplicación. Ejecuta el siguiente comando en la raíz del proyecto:

    docker-compose up --build

Este comando construirá las imágenes Docker y levantará los contenedores necesarios para la aplicación, incluyendo el backend, la base de datos, y otros servicios.

4. Acceso a la aplicación

Una vez que los contenedores se hayan iniciado correctamente, la aplicación estará disponible en tu navegador web en la siguiente URL:

    http://localhost:8000

5. Comandos Útiles

- Detener los contenedores: Para detener los contenedores sin eliminarlos, ejecuta:

      docker-compose down

- Recrear los contenedores: Si deseas reconstruir los contenedores y aplicar cambios recientes, puedes usar:

      docker-compose up --build

- Verificar los logs: Para ver los logs de los servicios corriendo, usa:

      docker-compose logs -f

6. Migraciones de Base de Datos

Si necesitas realizar migraciones en la base de datos, puedes ejecutar el siguiente comando dentro del contenedor backend:

    docker-compose exec backend alembic upgrade head

Esto aplicará las últimas migraciones definidas en el proyecto.

Contribuir
----------

Si deseas contribuir al proyecto, por favor sigue las siguientes indicaciones:

1. Crea un fork del repositorio.
2. Crea una nueva rama (git checkout -b feature-nueva-funcionalidad).
3. Haz tus cambios y realiza los commits (git commit -m 'Añadir nueva funcionalidad')
4. Sube tu rama (git push origin feature-nueva-funcionalidad).
5. Crea un Pull Request.


