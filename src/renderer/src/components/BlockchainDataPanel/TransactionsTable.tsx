import { forwardRef, useImperativeHandle, useState } from 'react'
import { TbChevronRight } from 'react-icons/tb'
import { IAccountState } from '@renderer/@types/store'
import { DoraHelper } from '@renderer/helpers/DoraHelper'
import { StringHelper } from '@renderer/helpers/StringHelper'
import { ToastHelper } from '@renderer/helpers/ToastHelper'
import { useInfiniteScroll } from '@renderer/hooks/useInfiniteScroll'
import { TUseTransactionsTransfer, useTransactions } from '@renderer/hooks/useTransactions'
import { getI18next } from '@renderer/libs/i18next'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { format } from 'date-fns'

import { Button } from '../Button'
import { Loader } from '../Loader'
import { Table } from '../Table'

type TTransactionListProps = {
  accounts: IAccountState[]
}

const { t } = getI18next()

const columnHelper = createColumnHelper<TUseTransactionsTransfer>()

const columns = [
  columnHelper.accessor('time', {
    cell: info => format(info.getValue() * 1000, 'MM/dd/yyyy HH:mm:ss'),
    header: t('components:transactionsTable.date'),
  }),
  columnHelper.accessor('token.name', {
    cell: info => info.getValue(),
    header: t('components:transactionsTable.asset'),
  }),
  columnHelper.accessor('amount', {
    cell: info => Number(info.getValue()).toFixed(info.row.original.token?.decimals ?? 8),
    header: t('components:transactionsTable.amount'),
  }),
  columnHelper.accessor(row => row.fromAccount?.name ?? row.from, {
    cell: info => StringHelper.truncateStringMiddle(info.getValue(), 15),
    id: 'from',
    header: t('components:transactionsTable.from'),
  }),
  columnHelper.accessor(row => row.toAccount?.name ?? row.to, {
    cell: info => StringHelper.truncateStringMiddle(info.getValue(), 15),
    id: 'to',
    header: t('components:transactionsTable.to'),
  }),
  columnHelper.display({
    id: 'actions',
    cell: () => (
      <Button
        variant="text"
        className="w-full"
        clickableProps={{
          className: 'h-min',
        }}
        flat
        label={t('components:transactionsTable.viewButtonLabel')}
        rightIcon={<TbChevronRight />}
      />
    ),
  }),
]

export const TransactionsTable = forwardRef<HTMLDivElement, TTransactionListProps>(({ accounts }, ref) => {
  const { transfers, fetchNextPage, isLoading } = useTransactions({ accounts })
  const { handleScroll, ref: scrollRef } = useInfiniteScroll<HTMLDivElement>(fetchNextPage)

  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: transfers,
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

  const handleClick = (row: TUseTransactionsTransfer) => {
    try {
      const url = DoraHelper.buildTransactionUrl(row.hash, row.account.blockchain)
      window.open(url)
    } catch (error) {
      ToastHelper.error({ message: t('components:transactionsTable.doraError') })
    }
  }

  useImperativeHandle(ref, () => scrollRef.current!, [scrollRef])

  return (
    <section
      className="overflow-auto min-h-0 w-full flex flex-col flex-grow mt-4 pr-1 text-xs min-w-0"
      ref={scrollRef}
      onScroll={handleScroll}
    >
      {isLoading ? (
        <Loader className="mt-4 flex-grow items-center" />
      ) : transfers.length <= 0 ? (
        <div className="flex justify-center mt-4">
          <p className="text-gray-300">{t('components:transactionsTable.empty')}</p>
        </div>
      ) : (
        <Table.Root className="table-fixed">
          <Table.Header className="sticky top-0 bg-gray-800">
            {table.getHeaderGroups().map(headerGroup => (
              <Table.HeaderRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <Table.Head
                    key={header.id}
                    sortable={header.column.getCanSort()}
                    sortedBy={header.column.getIsSorted()}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </Table.Head>
                ))}
              </Table.HeaderRow>
            ))}
          </Table.Header>

          <Table.Body>
            {table.getRowModel().rows.map(row => (
              <Table.BodyRow key={row.id} className="cursor-pointer" onClick={handleClick.bind(null, row.original)}>
                {row.getVisibleCells().map(cell => (
                  <Table.Cell className="truncate" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.BodyRow>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </section>
  )
})
