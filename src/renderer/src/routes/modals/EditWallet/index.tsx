import { useTranslation } from 'react-i18next'
import { MdDeleteForever } from 'react-icons/md'
import { TbPencil } from 'react-icons/tb'
import { IWalletState } from '@renderer/@types/store'
import { Button } from '@renderer/components/Button'
import { Input } from '@renderer/components/Input'
import { Separator } from '@renderer/components/Separator'
import { useAccountsSelector } from '@renderer/hooks/useAccountSelector'
import { useActions } from '@renderer/hooks/useActions'
import { useModalNavigate, useModalState } from '@renderer/hooks/useModalRouter'
import { useAppDispatch } from '@renderer/hooks/useRedux'
import { EndModalLayout } from '@renderer/layouts/EndModal'
import { accountReducerActions } from '@renderer/store/reducers/AccountReducer'
import { walletReducerActions } from '@renderer/store/reducers/WalletReducer'

type TFormData = {
  name: string
}

type TLocationState = {
  wallet: IWalletState
}

export const EditWalletModal = () => {
  const { t } = useTranslation('modals', { keyPrefix: 'editWallet' })
  const { modalNavigate, modalNavigateWrapper } = useModalNavigate()
  const { wallet } = useModalState<TLocationState>()

  const dispatch = useAppDispatch()
  const { accounts } = useAccountsSelector()

  const form = useActions<TFormData>({
    name: wallet.name,
  })

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    form.setData({ name: event.target.value })
  }

  const handleSubmit = ({ name }: TFormData) => {
    if (name.length <= 0) {
      form.setError('name', t('nameLengthError'))
      return
    }
    dispatch(walletReducerActions.saveWallet({ ...wallet, name }))
    modalNavigate(-1)
  }

  const handleDelete = () => {
    dispatch(walletReducerActions.deleteWallet(wallet.id))
    const accountsToRemove = accounts.filter(it => it.idWallet === wallet.id).map(it => it.address)
    dispatch(accountReducerActions.deleteAccounts(accountsToRemove))
    modalNavigate(-1)
  }

  return (
    <EndModalLayout heading={t('title')} headingIcon={<TbPencil />} contentClassName="flex flex-col justify-between">
      <form onSubmit={form.handleAct(handleSubmit)}>
        <Input
          placeholder={t('inputPlaceholder')}
          errorMessage={form.actionState.errors.name}
          value={form.actionData.name}
          onChange={handleChangeName}
          clearable
          compacted
        />

        <div className="flex gap-x-3 mt-8">
          <Button
            className="w-full"
            type="button"
            onClick={modalNavigateWrapper(-1)}
            label={t('cancelButtonLabel')}
            flat
            colorSchema="gray"
          />

          <Button className="w-full" type="submit" label={t('saveButtonLabel')} flat />
        </div>
      </form>

      <div className="flex flex-col">
        <Separator />

        <p className="text-gray-300 uppercase text-xs font-bold mt-4">Delete Wallet</p>
        <span className="text-xs text-white mt-2">This will remove your wallet and all transaction history</span>

        <Button
          label="Delete Wallet"
          type="button"
          leftIcon={<MdDeleteForever />}
          className="mt-7"
          variant="outlined"
          onClick={handleDelete}
          colorSchema="error"
          flat
          iconsOnEdge={false}
        />
      </div>
    </EndModalLayout>
  )
}
