import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://anuncia.tech/", // Cambia al dominio correcto
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Asegura que se envíen cookies o credenciales
});

export default axiosInstance;