import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading } = useContext(AuthContext);

    if (isLoading) {
        // Mostrar indicador de carga mientras se verifica la sesión
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-center text-slate-500">Cargando...</p>
            </div>
        );
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;