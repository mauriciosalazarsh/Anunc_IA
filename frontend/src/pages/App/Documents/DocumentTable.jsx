import React from "react";
import { DataTable } from "../../../components";
import { ButtonIcon } from "../../../components";
import { documents, templates } from "../../../store";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";

import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

function DocumentTable() {
    const columns = [
        columnHelper.accessor("name", {
            header: (info) => "Document",
            cell: ({ row }) => {
                const icon = templates.filter((template) =>
                    template.name.includes(row.original.template)
                );

                // Verificar si se encontró un ícono, usar un valor predeterminado si no
                const templateIcon = icon.length > 0 ? icon[0].icon : <EyeIcon className="h-6 w-6" />;

                return (
                    <div className="flex items-center w-60 sm:w-auto">
                        <span className="h-6 w-6 block">{templateIcon}</span>
                        <div className="ms-3">
                            <div className="text-slate-600 dark:text-slate-200 font-bold text-xs line-clamp-2">
                                {row.original.name}
                            </div>
                            <div className="block text-slate-500 dark:text-slate-400 text-[11px] font-medium">
                                {row.original.template}
                            </div>
                        </div>
                    </div>
                );
            },
        }),
        columnHelper.accessor("size", {
            header: (info) => "Size",
            cell: ({ row }) => {
                return (
                    <span className="text-slate-500 dark:text-slate-400 text-xs">
                        <strong>{row.original.size} </strong>
                        {row.original.type === "text"
                            ? "Words"
                            : row.original.type === "image"
                            ? "Pixels"
                            : row.original.type === "code"
                            ? "Lines"
                            : ""}
                    </span>
                );
            },
        }),
        columnHelper.accessor("created", {
            header: (info) => "Created At",
            cell: (info) => {
                return (
                    <>
                        <span className="block text-slate-600 dark:text-slate-200 text-xs font-bold whitespace-nowrap">
                            {info.getValue().split(",")[0]}
                        </span>
                        <span className="block text-slate-500 dark:text-slate-400 text-[11px] font-medium">
                            {info.getValue().split(",")[1]}
                        </span>
                    </>
                );
            },
        }),
        columnHelper.display({
            id: "tableAction",
            header: (info) => "",
            cell: (info) => {
                return (
                    <>
                        <ul className="flex justify-end gap-2">
                            <li>
                                <ButtonIcon
                                    as="Link"
                                    to={`/documents/edit/${info.row.original.id}`}
                                    circle
                                    size="sm"
                                    className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-200 hover:bg-blue-600 hover:text-white hover:dark:bg-blue-600 hover:dark:text-white"
                                >
                                    <EyeIcon className="h-3 w-3" />
                                </ButtonIcon>
                            </li>
                            <li>
                                <ButtonIcon
                                    circle
                                    size="sm"
                                    className="bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-200 hover:bg-rose-600 hover:text-white hover:dark:bg-rose-600 hover:dark:text-white"
                                >
                                    <TrashIcon className="h-3 w-3" />
                                </ButtonIcon>
                            </li>
                        </ul>
                    </>
                );
            },
        }),
    ];

    return (
        <DataTable columns={columns} tableData={documents} />
    );
}

export default DocumentTable;
