"use client"

import * as React from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { RealEstateTransaction } from '@/types/RealEstateTransaction'



const columnHelper = createColumnHelper<RealEstateTransaction>()

const columns = [
  columnHelper.accessor('saleValueInShekel', {
    cell: info => info.getValue(),
		header: () => <span>מחיר</span>,
  }),
  columnHelper.accessor(row => row.area, {
    id: 'area',
    cell: info => <i>{info.getValue()}</i>,
    // eslint-disable-next-line react/no-unescaped-entities
    header: () => <span>מ"ר</span>,
  }),
	columnHelper.accessor('rooms', {
    cell: info => info.getValue(),
		header: () => <span>חדרים</span>,
  }),
	columnHelper.accessor('constructionYear', {
    cell: info => info.getValue(),
		header: () => <span>שנת בנייה</span>,
  }),

]

type TableProps<TData> = {
  data: RealEstateTransaction[];
};

export function ProjectTransactionsList ({ data}: TableProps<[]>): JSX.Element {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />

    </div>
  )
}

