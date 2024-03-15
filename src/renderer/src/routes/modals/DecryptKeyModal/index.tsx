import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { TbFileImport } from 'react-icons/tb'
import { TBlockchainServiceKey } from '@renderer/@types/blockchain'
import { Button } from '@renderer/components/Button'
import { Input } from '@renderer/components/Input'
import { ToastHelper } from '@renderer/helpers/ToastHelper'
import { useActions } from '@renderer/hooks/useActions'
import { useBsAggregator } from '@renderer/hooks/useBsAggregator'
import { useModalState } from '@renderer/hooks/useModalRouter'
import { EndModalLayout } from '@renderer/layouts/EndModal'

type TLocation = {
  encryptedKey: string
  blockchain: TBlockchainServiceKey
  onDecrypt?: (key: string, address: string) => Promise<void> | void
}

type TFormData = {
  password: string
}

export const DecryptKeyModal = () => {
  const { t } = useTranslation('modals', { keyPrefix: 'decryptKeyModal' })
  const { blockchain, encryptedKey, onDecrypt } = useModalState<TLocation>()
  const { bsAggregator } = useBsAggregator()

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

      await onDecrypt?.(key, address)
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
          type="password"
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
