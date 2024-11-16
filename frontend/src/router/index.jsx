import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ThemeProvider from "../layout/provider";
import WebsiteIntro from "../pages/Website/Home";
import LoginPage from "../pages/Website/Login";
import CreateAccountPage from "../pages/Website/CreateAccount";
import TemplatesPage from "../pages/App/Templates";
import TemplatesWriterPage from "../pages/App/Templates/Writer";

// app
import AppDashboard from "../pages/App/Dashboard";

// Importa el componente ProtectedRoute
import ProtectedRoute from "./ProtectedRoute";

// Importa el AuthProvider
import { AuthProvider } from "../context/AuthContext";

const ScrollToTop = (props) => {
    const location = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return <>{props.children}</>;
};

function Router() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ScrollToTop>
                    <Routes>
                        <Route element={<ThemeProvider />}>
                            {/* Rutas públicas */}
                            <Route index element={<WebsiteIntro />} />
                            <Route path="login" element={<LoginPage />} />
                            <Route path="create-account" element={<CreateAccountPage />} />

                            {/* Rutas protegidas */}
                            <Route 
                                path="template" 
                                element={<ProtectedRoute><TemplatesPage /></ProtectedRoute>} 
                            />
                            <Route 
                                path="template/:writerslug" 
                                element={<ProtectedRoute><TemplatesWriterPage /></ProtectedRoute>} 
                            />
                            <Route 
                                path="dashboard" 
                                element={<ProtectedRoute><AppDashboard /></ProtectedRoute>} 
                            />
                        </Route>
                    </Routes>
                </ScrollToTop>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default Router;