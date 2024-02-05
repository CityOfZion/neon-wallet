import { Fragment, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbMenu } from 'react-icons/tb'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { UseMultipleBalanceAndExchangeResult } from '@renderer/@types/query'
import { IAccountState, IWalletState } from '@renderer/@types/store'
import { AccountCard } from '@renderer/components/AccountCard'
import { Button } from '@renderer/components/Button'
import { Separator } from '@renderer/components/Separator'
import { StyleHelper } from '@renderer/helpers/StyleHelper'
import { UtilsHelper } from '@renderer/helpers/UtilsHelper'
import { useAccountsByWalletIdSelector } from '@renderer/hooks/useAccountSelector'

type TProps = {
  isReordering: boolean
  onReorderSave?: (orderList: string[]) => void
  onReorderCancel?: () => void
  onSelect: (account: IAccountState) => void
  selectedAccount?: IAccountState | undefined
  selectedWallet: IWalletState
  balanceExchange: UseMultipleBalanceAndExchangeResult
  showFirstSeparator?: boolean
  showCheckOnSelected?: boolean
}

type TAccountItemProps = {
  account: IAccountState
  balanceExchange: UseMultipleBalanceAndExchangeResult
  isReordering: boolean
  active?: boolean
  onClick?: () => void
  showSeparator: boolean
  showCheckOnSelected: boolean
}

const AccountItem = ({
  account,
  balanceExchange,
  isReordering,
  onClick,
  active,
  showSeparator,
  showCheckOnSelected,
}: TAccountItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: account.address })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <Fragment>
      {showSeparator && <Separator />}
      <li ref={setNodeRef} style={style}>
        <AccountCard
          account={account}
          balanceExchange={balanceExchange}
          noHover={isReordering}
          rightComponent={isReordering ? <TbMenu className="stroke-neon" /> : undefined}
          className={StyleHelper.mergeStyles({
            'cursor-grabbing': isDragging,
            'cursor-grab': isReordering && !isDragging,
          })}
          {...attributes}
          {...listeners}
          onClick={onClick}
          active={active}
          showCheckOnSelected={showCheckOnSelected}
        />
      </li>
    </Fragment>
  )
}

export const AccountList = ({
  selectedWallet,
  selectedAccount,
  balanceExchange,
  isReordering,
  onReorderCancel,
  onReorderSave,
  onSelect,
  showFirstSeparator = true,
  showCheckOnSelected = false,
}: TProps) => {
  const { t } = useTranslation('components', { keyPrefix: 'wallets' })
  const { accountsByWalletId } = useAccountsByWalletIdSelector(selectedWallet.id)
  const orderedAccountsAddresses = useMemo(() => {
    return UtilsHelper.orderBy(accountsByWalletId, 'order', 'asc').map(account => account.address)
  }, [accountsByWalletId])

  const [items, setItems] = useState<string[]>([])
  const itemsAccounts = useMemo(() => {
    return UtilsHelper.mapFiltered(items, item => accountsByWalletId.find(account => account.address === item))
  }, [accountsByWalletId, items])

  const handleDragEnd = (event: DragEndEvent) => {
    if (!event.over || event.active.id === event.over.id) return
    const activeId = event.active.id as string
    const overId = event.over.id as string
    setItems(lastArray => UtilsHelper.arrayMove(lastArray, items.indexOf(activeId), items.indexOf(overId)))
  }

  const handleReorderCancel = () => {
    setItems(orderedAccountsAddresses)
    onReorderCancel?.()
  }

  const handleReorderSave = () => {
    onReorderSave?.(items)
  }

  useEffect(() => {
    setItems(orderedAccountsAddresses)
  }, [orderedAccountsAddresses])

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy} disabled={!isReordering}>
        <ul>
          {itemsAccounts.map((account, index) => (
            <AccountItem
              key={account?.address}
              onClick={() => {
                if (!isReordering) {
                  onSelect(account)
                }
              }}
              account={account}
              balanceExchange={balanceExchange}
              isReordering={isReordering}
              active={account?.address === selectedAccount?.address}
              showSeparator={showFirstSeparator || index !== 0}
              showCheckOnSelected={showCheckOnSelected}
            />
          ))}
        </ul>

        {isReordering && (
          <div className="flex justify-between px-3 gap-x-3 mt-4">
            <Button
              label={t('cancelButtonLabel')}
              variant="outlined"
              flat
              className="w-full"
              colorSchema="gray"
              onClick={handleReorderCancel}
            />
            <Button
              label={t('saveButtonLabel')}
              variant="outlined"
              flat
              className="w-full"
              onClick={handleReorderSave}
            />
          </div>
        )}
      </SortableContext>
    </DndContext>
  )
}
