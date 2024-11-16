import React from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "../../../components";
import { templates, documents } from "../../../store";
import DocumentRow from "./DocumentRow"; // Importamos el nuevo componente

function RecentDocument() {
    return (
        <Card className="h-full w-full">
            <div className="flex flex-col isolate relative">
                <div className="p-5 flex justify-between items-center gap-x-4">
                    <h6 className="text-md font-bold text-slate-700 dark:text-white">
                        Documentos Recientes
                    </h6>
                    <Link
                        to="/documents"
                        className="font-medium text-sm text-blue-600 hover:text-blue-800"
                    >
                        Ver Todos
                    </Link>
                </div>
                <div className="overflow-x-auto scrollbar-thin scrollbar-track-slate-200 dark:scrollbar-track-slate-800 scrollbar-thumb-slate-600">
                    <table className="table-auto w-full text-sm border-t border-slate-200 dark:border-slate-800 border-collapse">
                        <thead className="text-slate-600 dark:text-slate-200">
                            <tr>
                                <th className="text-start px-5 py-2">Documento</th>
                                <th className="text-start px-5 py-2">Creado</th>
                                <th className="sticky end-0 bg-white dark:bg-slate-950"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.length ? (
                                documents.slice(0, 3).map((item, index) => {
                                    const template = templates.find(template =>
                                        template.name.includes(item.template)
                                    );

                                    const icon = template?.icon || (
                                        <span role="img" aria-label="Documento">
                                            📄
                                        </span> // Valor predeterminado
                                    );

                                    return (
                                        <DocumentRow
                                            key={index}
                                            item={item}
                                            icon={icon}
                                        />
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        className="px-5 py-8 border-t text-center"
                                        colSpan={3}
                                    >
                                        <span className="block text-slate-500 dark:text-slate-400 mb-3">
                                            No hay documentos para mostrar
                                        </span>
                                        <Button
                                            as="Link"
                                            to="/templates"
                                            className="bg-blue-600 text-white hover:bg-blue-800"
                                        >
                                            Crear Nuevo
                                        </Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Card>
    );
}

export default RecentDocument;
