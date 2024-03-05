import { useRef, useState } from 'react'
import { FiSend } from 'react-icons/fi'
import { MdOutlineContentCopy } from 'react-icons/md'
import { TContactAddress } from '@renderer/@types/store'
import { BlockchainIcon } from '@renderer/components/BlockchainIcon'
import { UtilsHelper } from '@renderer/helpers/UtilsHelper'
import { getI18next } from '@renderer/libs/i18next'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'

import { Button } from '../Button'
import { IconButton } from '../IconButton'
import { Table } from '../Table'

type TProps = {
  contactAddresses: TContactAddress[]
}

const { t } = getI18next()

const columnHelper = createColumnHelper<TContactAddress>()

const columns = [
  columnHelper.accessor('blockchain', {
    cell: info => {
      return (
        <div className="flex flex-row items-center">
          <div className="mr-2 bg-gray-700 p-2 rounded-full">
            <BlockchainIcon blockchain={info.row.original.blockchain} type="white" />
          </div>
          <span className="uppercase">{t(`common:blockchain.${info.row.original.blockchain}`)}</span>
        </div>
      )
    },
    header: t('components:contactAddressTable.blockchain'),
  }),
  columnHelper.accessor('address', {
    cell: info => {
      return (
        <div className="flex items-center gap-x-1">
          {info.row.original.address}
          <IconButton
            icon={<MdOutlineContentCopy className="text-neon" />}
            size="sm"
            onClick={() => UtilsHelper.copyToClipboard(info.row.original.address)}
          />
        </div>
      )
    },
    enableSorting: false,
    header: t('components:contactAddressTable.address'),
  }),
  columnHelper.display({
    id: 'actions',
    cell: () => {
      return (
        <div className="w-full flex justify-end">
          <Button
            variant="text"
            label={t('components:contactAddressTable.sendAssets')}
            leftIcon={<FiSend className="text-neon" />}
            disabled
            flat
          />
        </div>
      )
    },
    enableSorting: false,
  }),
]

export const ContactAddressTable = ({ contactAddresses }: TProps) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  const table = useReactTable({
    data: contactAddresses,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: newSorting => {
      setSorting(newSorting)
      scrollRef.current?.scrollTo(0, 0)
    },
  })

  return (
    <section className="overflow-auto flex flex-col min-h-0 w-full flex-grow mt-4 pr-1 min-w-0" ref={scrollRef}>
      <Table.Root>
        <Table.Header className="sticky top-0 bg-gray-800">
          {table.getHeaderGroups().map(headerGroup => (
            <Table.HeaderRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <Table.Head
                  key={header.id}
                  sortable={header.column.getCanSort()}
                  sortedBy={header.column.getIsSorted()}
                  onClick={header.column.getToggleSortingHandler()}
                  className="font-semibold"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </Table.Head>
              ))}
            </Table.HeaderRow>
          ))}
        </Table.Header>

        <Table.Body>
          {table.getRowModel().rows.map(row => (
            <Table.BodyRow key={row.id} hoverable={false}>
              {row.getVisibleCells().map(cell => (
                <Table.Cell className="truncate" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              ))}
            </Table.BodyRow>
          ))}
        </Table.Body>
      </Table.Root>
    </section>
  )
}
