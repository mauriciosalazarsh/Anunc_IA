import React from "react";
import { Outlet } from "react-router-dom";
import Layout from "../../../layout/dashboard";
import Section from "../../../layout/global/Section";
import Container from "../../../layout/global/Container";
import { Breadcrumbs, Button } from "../../../components";
import DocumentTable from "./DocumentTable";

function DocumentsPage() {
    return (
        <Layout title="Documents">
            <Section className="py-10 px-3">
                <Container>
                    <div className="mb-7 flex justify-between items-center -mx-3">
                        <div className="px-3">
                            <h2 className="text-xl font-bold text-slate-700 dark:text-white mb-2">
                                All Documents
                            </h2>
                            <Breadcrumbs
                                items={[
                                    { text: "Home", link: "/dashboard" },
                                    { text: "Documents" },
                                ]}
                            />
                        </div>
                        <div className="px-3">
                            <Button
                                as="Link"
                                to="#"
                                className="bg-blue-600 text-white hover:bg-blue-800"
                            >
                                Create New
                            </Button>
                        </div>
                    </div>
                    {/* Renderiza el contenido de la tabla de documentos */}
                    <DocumentTable />
                    {/* Renderiza las subrutas */}
                    <Outlet />
                </Container>
            </Section>
        </Layout>
    );
}

export default DocumentsPage;
