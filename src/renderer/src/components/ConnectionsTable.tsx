import { forwardRef, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TbPlugX } from 'react-icons/tb'
import { TSession } from '@cityofzion/wallet-connect-sdk-wallet-react'
import dappFallbackIcon from '@renderer/assets/images/dapp-fallback-icon.png'
import { BlockchainIcon } from '@renderer/components/BlockchainIcon'
import { Button } from '@renderer/components/Button'
import { ImageWithFallback } from '@renderer/components/ImageWithFallback'
import { Table } from '@renderer/components/Table'
import { DateHelper } from '@renderer/helpers/DateHelper'
import { StyleHelper } from '@renderer/helpers/StyleHelper'
import { WalletConnectHelper } from '@renderer/helpers/WalletConnectHelper'
import { useAccountsSelector } from '@renderer/hooks/useAccountSelector'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

type TConnectionsTableProps = {
  sessions: TSession[]
  hasAddress?: boolean
  tableHeaderClassName?: string
}

const columnHelper = createColumnHelper<TSession>()

export const ConnectionsTable = forwardRef<HTMLDivElement, TConnectionsTableProps>(
  ({ sessions, tableHeaderClassName, hasAddress = false }, ref) => {
    const { t } = useTranslation('components', { keyPrefix: 'connectionsTable' })
    const { accounts } = useAccountsSelector()
    const { modalNavigate } = useModalNavigate()

    const columns = useMemo(
      () => [
        columnHelper.accessor(row => row.peer.metadata, {
          header: t('name'),
          cell: info => (
            <div className="flex gap-2 min-w-0 items-center">
              <ImageWithFallback
                src={info.getValue().icons[0]}
                alt={`${info.getValue().name} icon`}
                fallbackSrc={dappFallbackIcon}
                className="h-5 w-5 min-w-[1.25rem] object-contain rounded-full bg-gray-300/30"
              />
              <span className="truncate">{info.getValue().name}</span>
            </div>
          ),
        }),
        columnHelper.accessor('approvalUnix', {
          header: t('connected'),
          cell: info => DateHelper.unixToDateHour(info.getValue()),
        }),
        columnHelper.accessor(row => WalletConnectHelper.getAccountInformationFromSession(row).blockchain, {
          header: t('chain'),
          cell: info => (
            <div className="flex">
              <BlockchainIcon blockchain={info.getValue()} type="white" className="opacity-70" />
              <span className="ml-2">{info.getValue()}</span>
            </div>
          ),
        }),
        ...(hasAddress
          ? [
              columnHelper.accessor(row => WalletConnectHelper.getAccountInformationFromSession(row).address, {
                header: t('account'),
                cell: info => accounts.find(account => account.address === info.getValue())?.name ?? info.getValue(),
              }),
            ]
          : []),
        columnHelper.accessor(row => row, {
          id: 'actions',
          header: undefined,
          meta: { className: 'w-28' },
          cell: info => (
            <Button
              leftIcon={<TbPlugX />}
              flat
              variant="text-slim"
              colorSchema="error"
              onClick={() => modalNavigate('dapp-disconnection', { state: { sessions: [info.getValue()] } })}
              label={t('disconnect')}
            />
          ),
        }),
      ],
      [accounts, hasAddress, modalNavigate, t]
    )

    const table = useReactTable({
      data: sessions,
      columns,
      getCoreRowModel: getCoreRowModel(),
    })

    return (
      <section ref={ref} className="overflow-auto min-h-0 w-full flex flex-col flex-grow mt-4 pr-1 text-xs min-w-0">
        {sessions.length <= 0 ? (
          <div className="flex justify-center mt-4">
            <p className="text-gray-300">{t('emptyList')}</p>
          </div>
        ) : (
          <Table.Root className="table-fixed">
            <Table.Header className={StyleHelper.mergeStyles('sticky top-0 uppercase z-10', tableHeaderClassName)}>
              {table.getHeaderGroups().map(headerGroup => (
                <Table.HeaderRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <Table.Head key={header.id} className={header.column.columnDef?.meta?.['className']}>
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
                    <Table.Cell className={cell.column.columnDef?.meta?.['className']} key={cell.id}>
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
  }
)
