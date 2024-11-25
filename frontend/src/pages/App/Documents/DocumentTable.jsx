import React, { useEffect, useState } from "react";
import api from "../../../api/api"; // Ruta ajustada para tu archivo api.js
import { DataTable } from "../../../components";
import { ButtonIcon } from "../../../components";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

// Mapeo para traducir los tipos de documento a títulos personalizados
const tipoDocumentoMap = {
    definir_campana: "Definir Campaña",
    definir_publico_ubicaciones: "Definir público objetivo y ubicación",
    elegir_formato_cta: "Elección del formato CTA",
    crear_contenido_creativo: "Copy para anuncio",
    create_heading: "Encabezados",
};

function DocumentTable() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch documents from API
    useEffect(() => {
        async function fetchDocuments() {
            try {
                const response = await api.get("/documents/");
                setDocuments(response.data);

                // Debugger: Mostrar los documentos en la consola
                console.log("Fetched Documents:", response.data);
            } catch (err) {
                setError("Error loading documents");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchDocuments();
    }, []);

    // Handle document deletion
    const handleDelete = async (id) => {
        try {
            await api.delete(`/documents/${id}`);
            setDocuments(documents.filter((doc) => doc.id_documento !== id));
        } catch (err) {
            console.error("Error deleting document:", err);
        }
    };

    // Define columns for the table
    const columns = [
        columnHelper.accessor("id_documento", {
            header: () => "ID",
            cell: ({ row }) => (
                <span className="text-slate-600 dark:text-slate-200 font-bold text-sm">
                    {row.original.id_documento.toString().padStart(2, "0")} {/* Formato "01", "02", etc. */}
                </span>
            ),
        }),
        columnHelper.accessor("tipo_documento", {
            header: () => "Title",
            cell: ({ row }) => (
                <div className="flex items-center">
                    <EyeIcon className="h-5 w-5 text-blue-600" />
                    <span className="ms-3 text-slate-600 dark:text-slate-200 font-bold text-sm">
                        {tipoDocumentoMap[row.original.tipo_documento] || "Título desconocido"}
                    </span>
                </div>
            ),
        }),
        columnHelper.accessor("fecha_creacion", {
            header: () => "Created At",
            cell: ({ row }) => {
                const date = new Date(row.original.fecha_creacion);
                return (
                    <span className="block text-slate-500 dark:text-slate-400 text-xs">
                        {date.toLocaleString()}
                    </span>
                );
            },
        }),
        columnHelper.display({
            id: "actions",
            header: () => "",
            cell: ({ row }) => (
                <div className="flex justify-end gap-2">
                    {/* Actualización para usar el ID real */}
                    <ButtonIcon
                        as="Link"
                        to={`/documents/edit/${row.original.id_documento}`} // Usa el ID real del documento
                        circle
                        size="sm"
                        className="bg-blue-500 text-white hover:bg-blue-700"
                    >
                        <EyeIcon className="h-3 w-3" />
                    </ButtonIcon>
                    <ButtonIcon
                        onClick={() => handleDelete(row.original.id_documento)}
                        circle
                        size="sm"
                        className="bg-red-500 text-white hover:bg-red-700"
                    >
                        <TrashIcon className="h-3 w-3" />
                    </ButtonIcon>
                </div>
            ),
        }),
    ];

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <DataTable columns={columns} tableData={documents} />;
}

export default DocumentTable;
