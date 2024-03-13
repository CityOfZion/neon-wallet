import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdDeleteForever } from 'react-icons/md'
import { TbPencil } from 'react-icons/tb'
import { IAccountState } from '@renderer/@types/store'
import { Button } from '@renderer/components/Button'
import { ColorSelector } from '@renderer/components/ColorSelector'
import { Input } from '@renderer/components/Input'
import { Separator } from '@renderer/components/Separator'
import { useActions } from '@renderer/hooks/useActions'
import { useModalNavigate, useModalState } from '@renderer/hooks/useModalRouter'
import { useAppDispatch } from '@renderer/hooks/useRedux'
import { EndModalLayout } from '@renderer/layouts/EndModal'
import { accountReducerActions } from '@renderer/store/reducers/AccountReducer'

type TFormData = {
  name: string
}

type TLocationState = {
  account: IAccountState
}

export const EditAccountModal = () => {
  const { t } = useTranslation('modals', { keyPrefix: 'editAccount' })
  const { modalNavigate, modalNavigateWrapper } = useModalNavigate()
  const { account } = useModalState<TLocationState>()
  const [accountColor, setAccountColor] = useState<string>(account.backgroundColor)

  const dispatch = useAppDispatch()

  const { actionData, actionState, handleAct, setDataFromEventWrapper } = useActions<TFormData>({
    name: account.name,
  })

  const handleSubmit = ({ name }: TFormData) => {
    dispatch(accountReducerActions.saveAccount({ ...account, name, backgroundColor: accountColor }))
    modalNavigate(-1)
  }

  const handleDelete = () => {
    dispatch(accountReducerActions.deleteAccount(account.address))
    modalNavigate(-1)
  }

  return (
    <EndModalLayout heading={t('title')} headingIcon={<TbPencil />} contentClassName="flex flex-col justify-between">
      <form onSubmit={handleAct(handleSubmit)} className="flex flex-col h-full justify-between">
        <div>
          <Input
            placeholder={t('inputPlaceholder')}
            value={actionData.name}
            onChange={setDataFromEventWrapper('name')}
            errorMessage={actionState.errors.name}
          />

          <ColorSelector label={t('colorSelectorLabel')} setNewColor={setAccountColor} accountColor={accountColor} />
        </div>
        <div className="flex gap-x-3 mb-8">
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

        <p className="text-gray-300 uppercase text-xs font-bold mt-4">{t('deleteAccountTitle')}</p>
        <span className="text-xs text-white mt-2">{t('deleteAccountSubtext')}</span>

        <Button
          label={t('deleteAccountTitle')}
          type="button"
          leftIcon={<MdDeleteForever />}
          className="mt-7"
          variant="outlined"
          onClick={handleDelete}
          colorSchema="error"
          flat
        />
      </div>
    </EndModalLayout>
  )
}
