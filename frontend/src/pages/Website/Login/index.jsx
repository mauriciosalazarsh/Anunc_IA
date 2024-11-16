import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import Layout from "../../../layout/website";
import Section from "../../../layout/global/Section";
import Container from "../../../layout/global/Container";
import { Label, Input, Button } from "../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Navigate } from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { login, isAuthenticated, isLoading } = useContext(AuthContext);

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            // Redirigir al dashboard si ya está autenticado
            // Puedes usar Navigate o useNavigate
            // Aquí usaremos Navigate para mantener la lógica declarativa
        }
    }, [isLoading, isAuthenticated]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            await login(email, password);
            // La redirección está manejada por el AuthContext's login function
        } catch (error) {
            setErrorMessage(error.message || "Correo o contraseña incorrectos");
            console.error("Error:", error);
        }
    };

    if (isLoading) {
        return (
            <Layout title="Cargando...">
                <Section className="py-10 my-auto">
                    <Container>
                        <p className="text-center text-slate-500">Verificando sesión...</p>
                    </Container>
                </Section>
            </Layout>
        );
    }

    if (isAuthenticated) {
        // Redirigir al dashboard si ya está autenticado
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <Layout title="Iniciar Sesión">
            <Section className="py-10 my-auto">
                <Container>
                    <div className="flex justify-center -mx-3">
                        <div className="w-full xs:w-4/5 sm:w-3/5 md:w-1/2 lg:w-2/5 xl:w-1/3 px-3">
                            <div className="bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 w-full p-6 pt-5">
                                <div className="mb-2">
                                    <h3 className="text-xl font-bold text-slate-700 dark:text-white mb-1">
                                        Iniciar Sesión
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Verifica tu información
                                    </p>
                                </div>
                                {errorMessage && (
                                    <p className="text-red-500 text-sm">{errorMessage}</p>
                                )}
                                <form onSubmit={handleLogin}>
                                    <div className="py-2">
                                        <Label htmlFor="correo-electronico" className="mb-2">
                                            Correo Electrónico
                                        </Label>
                                        <Input
                                            placeholder="ejemplo@gmail.com"
                                            id="correo-electronico"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="py-2">
                                        <Label htmlFor="contrasena" className="mb-2 justify-between w-full items-center">
                                            Contraseña
                                            <a className="text-xs text-blue-500 hover:text-blue-700" href="#">
                                                Olvidé mi contraseña
                                            </a>
                                        </Label>
                                        <Input
                                            id="contrasena"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="pt-3">
                                        <Button type="submit" block className="bg-blue-600 text-white hover:bg-blue-800">
                                            Iniciar Sesión
                                        </Button>
                                    </div>
                                </form>
                                <div className="mt-5 mb-4">
                                    <h6 className="text-slate-400 text-[11px] uppercase text-center font-bold tracking-wider">
                                        Iniciar Sesión Con
                                    </h6>
                                </div>
                                <div className="flex flex-wrap -mx-3">
                                    <div className="w-1/2 px-3">
                                        <Button
                                            block
                                            className="bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-200 hover:bg-blue-100 hover:dark:bg-blue-950 hover:text-blue-600 hover:dark:text-blue-600 border border-slate-200 dark:border-slate-800 hover:dark:border-blue-950"
                                        >
                                            <FontAwesomeIcon icon={faGoogle} />
                                            <span>Google</span>
                                        </Button>
                                    </div>
                                    <div className="w-1/2 px-3">
                                        <Button
                                            block
                                            className="bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-200 hover:bg-blue-100 hover:dark:bg-blue-950 hover:text-blue-600 hover:dark:text-blue-600 border border-slate-200 dark:border-slate-800 hover:dark:border-blue-950"
                                        >
                                            <FontAwesomeIcon icon={faFacebookF} />
                                            <span>Facebook</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>
        </Layout>
    );
}

export default LoginPage;