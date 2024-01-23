"use client";

import * as React from "react";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { RealEstateTransactionsNadlanGov } from "@/types/RealEstateTransaction";
import { Project } from "@/types/Project";
import Link from 'next/link'

const columnHelper = createColumnHelper<Project>();

const columns = [
  columnHelper.accessor("projectName", {
    cell: (info) => {
      const projectName = info.getValue();
      const id = info.row.original.id;
      return (
        <Link className="text-blue-500 hover:text-blue-700 border-b border-blue-500 hover:border-blue-700" href={{ pathname: `/project/${id}` }}>
          {projectName}
        </Link>
      );
    },
    header: () => <span>שם הפרויקט</span>,
  }),

  columnHelper.accessor("shchuna", {

    header: () => <span>שכונה</span>,
  }),
  columnHelper.accessor("VaadaDate", {
    cell: (info) => {
      const value = new Date(info.getValue());
      return (value.toLocaleDateString());
    },
    header: () => <span>ת. זכייה</span>,
  }),
  columnHelper.accessor("totalCount", {
    cell: (info) => {
      return info.getValue() + " מתוך " + info.row.original.Kibolet;
    },
    // eslint-disable-next-line react/no-unescaped-entities
    header: () => <span>סה"כ עסקאות</span>,
  }),
];

type TableProps<TData> = {
  data: Project[];
};

export function ProjectsListComponent({ data }: TableProps<[]>): JSX.Element {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="bg-gray-50 h-96 overflow-x-auto">
      <table className="items-center bg-transparent border-collapse" style={{ tableLayout: 'fixed', width: '100%' }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-2 align-middle border border-solid text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left bg-blueGray-100 text-blueGray-500 border-blueGray-200 max-w-40"
                  style={{ maxWidth: `100px` }}
                >
                  {header.isPlaceholder ? null : (
                    <div style={{ textAlign: "center" }}>
                      <div className="text-lg font-bold text-gray-800">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={Number(row.id) % 2 === 0 ? "bg-gray-100" : "bg-white"}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border-t-0 p-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap"
                >
                  <div className="p-2 pl-0 border-gray-200 truncate">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id} className={Number(footerGroup.id) % 2 === 0 ? "bg-gray-100" : "bg-white"}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div className="text-lg font-bold text-gray-800">
                      {flexRender(header.column.columnDef.footer, header.getContext())}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div />
    </div>
  );
}
