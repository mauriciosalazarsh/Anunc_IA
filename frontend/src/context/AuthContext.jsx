import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/api"; // Importar axiosInstance

// Crear el contexto
export const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // Función para verificar la sesión
    const checkSession = async () => {
        try {
            const response = await axiosInstance.get("/auth/check_session");
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Error al verificar la sesión:", error);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    // Verificar la sesión al montar el componente
    useEffect(() => {
        checkSession();
    }, []);

    // Función para iniciar sesión
    const login = async (email, password) => {
        try {
            const response = await axiosInstance.post("/auth/login", {
                username: email,
                password: password,
            });

            setIsAuthenticated(true);
            navigate("/dashboard");
        } catch (error) {
            const errorMessage = error.response?.data?.detail || "Error en el inicio de sesión";
            throw new Error(errorMessage);
        }
    };

    // Función para cerrar sesión
    const logout = async () => {
        try {
            await axiosInstance.post("/auth/logout");
            setIsAuthenticated(false);
            navigate("/login");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
