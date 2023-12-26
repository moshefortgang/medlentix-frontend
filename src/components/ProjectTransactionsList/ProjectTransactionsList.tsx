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
	columnHelper.accessor('saleDate', {
    cell: info => info.getValue().toLocaleDateString(),
    header: () => <span>תאריך</span>,
  }),
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
  columnHelper.accessor('pricePerSquareMeter', {
    id: 'pricePerSquareMeter',
    cell: info => {
      const saleValue = info.row.original.saleValueInShekel;
      const area = info.row.original.area;
      const pricePerSquareMeter = Math.round(saleValue / area); // Round the value
      return <span>{pricePerSquareMeter}</span>;
    },
    // eslint-disable-next-line react/no-unescaped-entities
    header: () => <span>מחיר למ"ר</span>,
  }),

]

type TableProps<TData> = {
  data: RealEstateTransaction[];
};

export function ProjectTransactionsList({ data }: TableProps<[]>): JSX.Element {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="bg-gray-50 min-h-screen">
      <nav>
      </nav>
      <div className='Properties scroll-px-0 p-5'>
        <table>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="bg-cyan-300">
                    {header.isPlaceholder
                      ? null
                      : (
                        <div className="text-lg font-bold text-gray-800">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </div>
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}  className={Number(row.id) % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="py-4 px-6">
                    <div className="py-2 px-4 border-gray-200">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map(footerGroup => (
              <tr key={footerGroup.id} className={Number(footerGroup.id) % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>  
                {footerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : (
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
        <div className="h-4" />
      </div>
    </div>
  )
}
