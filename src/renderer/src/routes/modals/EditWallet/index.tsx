import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { MdDeleteForever } from 'react-icons/md'
import { TbPencil } from 'react-icons/tb'
import { IWalletState } from '@renderer/@types/store'
import { Button } from '@renderer/components/Button'
import { Input } from '@renderer/components/Input'
import { Separator } from '@renderer/components/Separator'
import { useModalLocation, useModalNavigate } from '@renderer/hooks/useModalRouter'
import { useAppDispatch } from '@renderer/hooks/useRedux'
import { ModalLayout } from '@renderer/layouts/Modal'
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
  const location = useModalLocation<TLocationState>()
  const wallet = location.state.wallet

  const dispatch = useAppDispatch()

  const form = useForm<TFormData>({
    defaultValues: {
      name: location.state?.wallet.name,
    },
  })

  const handleSubmit: SubmitHandler<TFormData> = ({ name }) => {
    dispatch(walletReducerActions.saveWallet({ ...wallet, name }))
    modalNavigate(-1)
  }

  const handleDelete = () => {
    dispatch(walletReducerActions.deleteWallet(wallet.id))
    modalNavigate(-1)
  }

  return (
    <ModalLayout
      heading={t('title')}
      headingIcon={<TbPencil />}
      headingIconFilled={false}
      contentClassName="flex flex-col justify-between"
    >
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Input
          placeholder={t('inputPlaceholder')}
          {...form.register('name')}
          errorMessage={form.formState.errors.name?.message}
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
        />
      </div>
    </ModalLayout>
  )
}
