"use client"

import * as React from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { RealEstateTransactionsNadlanGov } from '@/types/RealEstateTransaction'

const columnHelper = createColumnHelper<RealEstateTransactionsNadlanGov>()

const columns = [
	columnHelper.accessor('dealDateTime', {
    cell: info => info.getValue().toLocaleDateString(),
    header: () => <span>תאריך</span>,
  }),
  columnHelper.accessor('dealAmount', {
    cell: info => {
      const value = info.getValue()
      return value
    },
    header: () => <span>מחיר</span>,
  }),
  columnHelper.accessor(row => row.dealNature, {
    id: 'dealNature',
    cell: info => <i>{info.getValue()}</i>,
    // eslint-disable-next-line react/no-unescaped-entities
    header: () => <span>מ"ר</span>,
  }),
  columnHelper.accessor('assetRoomNum', {
    cell: info => info.getValue(),
    header: () => <span>חדרים</span>,
  }),
  columnHelper.accessor('buildingYear', {
    cell: info => info.getValue(),
    header: () => <span>שנת בנייה</span>,
  }),
  columnHelper.accessor('floorNo', {
    cell: info => info.getValue(),
    header: () => <span>קומה</span>,
  }),
  columnHelper.accessor('displayAddress', {
    cell: info => info.getValue(),
    header: () => <span>כתובת</span>,
  }),
  columnHelper.accessor('pricePerSquareMeter', {
    id: 'pricePerSquareMeter',
    cell: info => {
  const saleValue = info.row.original.dealAmount.toString().replace(/,/g, '');
  const pricePerSquareMeter = Math.round(+saleValue / info.row.original.dealNature);
  return pricePerSquareMeter.toLocaleString();
    },
    // eslint-disable-next-line react/no-unescaped-entities
    header: () => <span>מחיר למ"ר</span>,
  }),
]


type TableProps<TData> = {
  data: RealEstateTransactionsNadlanGov[];
};

export function ProjectTransactionsList({ data }: TableProps<[]>): JSX.Element {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="bg-gray-50 min-h-screen">
      <nav>{/* Navigation content goes here */}</nav>
      <div className='Properties scroll-px-0 p-5'>
        <table className="w-full text-center"> {/* Added text-center class */}
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
              <tr key={row.id} className={Number(row.id) % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
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
