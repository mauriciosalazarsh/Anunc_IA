import React from "react";
import Layout from "../../../layout/website";
import Section from "../../../layout/global/Section";
import Container from "../../../layout/global/Container";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "../../../components";

function TermsPage() {
    return (
        <Layout title="Política de Privacidad y Condiciones del Servicio">
            {/* Header Section */}
            <Section className="py-16 md:py-20 bg-slate-100 dark:bg-slate-950">
                <Container>
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-full md:w-5/12">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold text-slate-700 dark:text-white mb-2">
                                    Política de Privacidad y Condiciones del Servicio
                                </h2>
                                <Breadcrumbs
                                    items={[
                                        { text: "Inicio", link: "/" },
                                        { text: "Políticas y Términos" },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Content Section */}
            <Section className="pt-16 md:pt-20 lg:pt-24 xl:pt-28 pb-2 bg-white dark:bg-slate-900 overflow-hidden">
                <Container>
                    <div className="mx-auto max-w-3xl">
                        <p className="text-sm italic text-slate-500 pb-3">Última actualización: 24 Nov 2024</p>
                        <div className="prose dark:prose-invert prose-headings:font-bold prose-p:mt-2 prose-ul:mt-2 max-w-max">
                            <h3>Política de Privacidad</h3>
                            <p>
                                Bienvenido a AnuncIA. Nos comprometemos a proteger tu información personal. A continuación, detallamos cómo recopilamos, usamos y protegemos tus datos.
                            </p>
                            <h6>1. Información que Recopilamos</h6>
                            <ul>
                                <li>Datos de registro: nombre, correo electrónico, contraseña.</li>
                                <li>Información generada automáticamente: dirección IP, tipo de dispositivo.</li>
                                <li>Cookies: para mejorar tu experiencia y análisis del uso de la app.</li>
                            </ul>
                            <h6>2. Uso de la Información</h6>
                            <p>
                                Utilizamos tus datos para mejorar nuestros servicios, personalizar tu experiencia y garantizar la seguridad de la plataforma.
                            </p>
                            <h6>3. Seguridad</h6>
                            <p>Protegemos tus datos con medidas avanzadas de encriptación y control de acceso.</p>
                            <h6>4. Tus Derechos</h6>
                            <ul>
                                <li>Acceso, corrección o eliminación de tus datos.</li>
                                <li>Retiro del consentimiento para el uso de tus datos.</li>
                            </ul>

                            <h3>Condiciones del Servicio</h3>
                            <h6>1. Aceptación de los Términos</h6>
                            <p>
                                Al usar AnuncIA, aceptas estas condiciones. Si no estás de acuerdo, no utilices la plataforma.
                            </p>
                            <h6>2. Uso Permitido</h6>
                            <ul>
                                <li>No utilizar la app para fines ilegales o perjudiciales.</li>
                                <li>Responsabilidad de garantizar que el contenido generado cumpla con las leyes locales.</li>
                            </ul>
                            <h6>3. Propiedad Intelectual</h6>
                            <ul>
                                <li>Todo el contenido generado por la IA es propiedad del usuario.</li>
                                <li>El software y algoritmos de AnuncIA son propiedad exclusiva de nuestra empresa.</li>
                            </ul>
                            <h6>4. Ley Aplicable</h6>
                            <p>
                                Estas condiciones se rigen por las leyes de Perú. Cualquier disputa será resuelta en los tribunales de Lima.
                            </p>
                            <h6>5. Contacto</h6>
                            <p>
                                Si tienes dudas o inquietudes, contáctanos en: <strong>soporte@anuncia.pe</strong>.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>
        </Layout>
    );
}

export default TermsPage;
