// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
            const response = await fetch("http://localhost:8000/auth/check_session", {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
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
        const response = await fetch("http://localhost:8000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            credentials: "include",
            body: new URLSearchParams({
                username: email,
                password: password,
            }),
        });

        if (response.ok) {
            setIsAuthenticated(true);
            navigate("/dashboard");
        } else {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Error en el inicio de sesión");
        }
    };

    // Función para cerrar sesión
    const logout = async () => {
        try {
            const response = await fetch("http://localhost:8000/auth/logout", {
                method: "POST",
                credentials: "include",
            });

            if (response.ok) {
                setIsAuthenticated(false);
                navigate("/login");
            } else {
                throw new Error("Error al cerrar sesión");
            }
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
