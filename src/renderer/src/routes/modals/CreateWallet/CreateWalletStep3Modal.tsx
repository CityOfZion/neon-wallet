import { useTranslation } from 'react-i18next'
import { MdLooks3 } from 'react-icons/md'
import { Button } from '@renderer/components/Button'
import { Input } from '@renderer/components/Input'
import { Separator } from '@renderer/components/Separator'
import { useActions } from '@renderer/hooks/useActions'
import { useBlockchainActions } from '@renderer/hooks/useBlockchainActions'
import { useModalNavigate, useModalState } from '@renderer/hooks/useModalRouter'
import { CreateWalletModalLayout } from '@renderer/layouts/CreateWalletModalLayout'

type TLocationState = {
  words: string[]
}

type TFormData = {
  name: string
}

export const CreateWalletStep3Modal = () => {
  const { t } = useTranslation('modals', { keyPrefix: 'createWallet.step3' })
  const { t: commonT } = useTranslation('common')
  const { words } = useModalState<TLocationState>()
  const { modalNavigate } = useModalNavigate()
  const { createWallet, createAccount } = useBlockchainActions()

  const form = useActions<TFormData>({
    name: '',
  })

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    form.setData({ name: event.target.value })
  }

  const handleSubmit = async ({ name }: TFormData) => {
    if (name.length <= 0) {
      form.setError('name', t('nameLengthError'))
      return
    }

    const wallet = await createWallet({
      name: name,
      walletType: 'standard',
      mnemonic: words.join(' '),
    })

    await createAccount({
      wallet,
      blockchain: 'neo3',
      name: commonT('account.defaultName', { accountNumber: 1 }),
    })

    modalNavigate('create-wallet-step-4', { state: { wallet } })
  }

  return (
    <CreateWalletModalLayout>
      <header className="flex justify-between items-center py-2.5">
        <div className="flex items-center gap-x-2.5">
          <MdLooks3 className="text-blue h-4.5 w-4.5" />
          <h2 className="text-sm">{t('title')}</h2>
        </div>
        <div className="text-blue text-sm">{t('step3of3')}</div>
      </header>
      <Separator className="min-h-[0.0625rem] mb-9" />
      <form
        onSubmit={form.handleAct(handleSubmit)}
        className="flex flex-col items-center w-full flex-grow justify-between"
      >
        <div className="flex flex-col w-full gap-8">
          <div className="text-gray-100 text-xs">{t('description')}</div>
          <Separator />
          <div className="flex flex-col gap-2.5 px-28">
            <div className="text-gray-300 uppercase text-xs font-bold">{t('inputLabel')}</div>
            <Input
              placeholder={t('inputPlaceholder')}
              errorMessage={form.actionState.errors.name}
              value={form.actionData.name}
              onChange={handleChangeName}
              clearable
              compacted
            />
          </div>
        </div>

        <Button className="w-48" type="submit" label={t('createWalletButtonLabel')} flat />
      </form>
    </CreateWalletModalLayout>
  )
}
