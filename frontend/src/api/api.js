import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000", // Cambia al dominio correcto
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Asegura que se envíen cookies o credenciales
});

export default axiosInstance;