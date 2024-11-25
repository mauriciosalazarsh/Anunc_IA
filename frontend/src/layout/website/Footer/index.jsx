import React from "react";
import Container from "../../global/Container";

function Footer() {
    return (
        <>
            <div className="isolate relative py-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                <Container>
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-200">
                            &copy; 2024. Todos los derechos reservados&nbsp;
                            <a
                                className="text-slate-700 dark:text-white hover:text-blue-600 hover:dark:text-blue-600 transition-all"
                                href="#"
                                target="_blank"
                            >
                                AnuncIA
                            </a>
                        </p>
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-200">
                            <a
                                className="text-slate-700 dark:text-white hover:text-blue-600 hover:dark:text-blue-600 transition-all"
                                href="/terms"
                            >
                                FAQ
                            </a>
                        </p>
                    </div>
                </Container>
            </div>
        </>
    );
}

export default Footer;
