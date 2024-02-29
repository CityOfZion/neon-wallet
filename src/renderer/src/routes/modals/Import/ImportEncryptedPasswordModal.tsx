import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { TbFileImport } from 'react-icons/tb'
import { TBlockchainServiceKey } from '@renderer/@types/blockchain'
import { Button } from '@renderer/components/Button'
import { Input } from '@renderer/components/Input'
import { ToastHelper } from '@renderer/helpers/ToastHelper'
import { useAccountsSelector } from '@renderer/hooks/useAccountSelector'
import { useActions } from '@renderer/hooks/useActions'
import { useBlockchainActions } from '@renderer/hooks/useBlockchainActions'
import { useBsAggregator } from '@renderer/hooks/useBsAggregator'
import { useModalNavigate, useModalState } from '@renderer/hooks/useModalRouter'
import { EndModalLayout } from '@renderer/layouts/EndModal'

type TLocation = {
  encryptedKey: string
  blockchain: TBlockchainServiceKey
}

type TFormData = {
  password: string
}

export const ImportEncryptedPasswordModal = () => {
  const { t } = useTranslation('modals', { keyPrefix: 'importEncryptedPasswordModal' })
  const { t: tCommon } = useTranslation('common', { keyPrefix: 'wallet' })
  const { blockchain, encryptedKey } = useModalState<TLocation>()
  const { modalNavigate } = useModalNavigate()
  const blockchainActions = useBlockchainActions()
  const { bsAggregator } = useBsAggregator()
  const { accounts } = useAccountsSelector()

  const { actionData, setData, actionState, handleAct, reset } = useActions<TFormData>({
    password: '',
  })

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData({ password: event.target.value })
  }

  const handleSubmit = async () => {
    try {
      const service = bsAggregator.getBlockchainByName(blockchain)
      const { address, key } = await service.decrypt(encryptedKey, actionData.password)

      const addressAlreadyExist = accounts.some(acc => acc.address === address)

      if (addressAlreadyExist) {
        throw new Error(t('addressAlreadyExist'))
      }

      const wallet = await blockchainActions.createWallet({
        name: tCommon('encryptedName'),
        walletType: 'legacy',
      })
      await blockchainActions.importAccount({ address, blockchain, wallet, key, type: 'legacy' })

      ToastHelper.success({ message: t('success') })

      modalNavigate(-3)
    } catch (error: any) {
      ToastHelper.error({ message: error.message })
    } finally {
      reset()
    }
  }

  return (
    <EndModalLayout heading={t('title')} withBackButton headingIcon={<TbFileImport />} contentClassName="flex flex-col">
      <p>{t('description')}</p>

      <form className="flex flex-col justify-between mt-6 flex-grow" onSubmit={handleAct(handleSubmit)}>
        <Input
          compacted
          clearable
          placeholder={t('inputPlaceholder')}
          value={actionData.password}
          onChange={handlePasswordChange}
        />

        <Button
          className="mt-8"
          type="submit"
          label={t('buttonContinueLabel')}
          flat
          disabled={!actionState.isValid}
          loading={actionState.isActing}
        />
      </form>
    </EndModalLayout>
  )
}
