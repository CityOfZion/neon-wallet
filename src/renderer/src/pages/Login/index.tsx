import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { ReactComponent as LoginIcon } from '@renderer/assets/images/loginIcon.svg'
import { Button } from '@renderer/components/Button'
import { Input } from '@renderer/components/Input'
import { UtilsHelper } from '@renderer/helpers/UtilsHelper'
import useSelectorRef from '@renderer/hooks/useSelectorRef'
import { WelcomeLayout } from '@renderer/layouts/Welcome'
import { selectAccounts } from '@renderer/store/account/SelectorAccount'
import { selectBsAggregator } from '@renderer/store/blockchain/SelectorBlockchain'
import { settingsReducerActions } from '@renderer/store/settings/SettingsReducer'
import { selectWallets } from '@renderer/store/wallet/SelectorWallet'

type TFormData = {
  password: string
}

export const LoginPage = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'login' })
  const form = useForm<TFormData>()
  const location = useLocation()
  const wallets = useSelectorRef(selectWallets)
  const accounts = useSelectorRef(selectAccounts)
  const bsAggregator = useSelectorRef(selectBsAggregator)
  const isFirstTimeRef = useSelectorRef(state => state.settings.isFirstTime)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const hasSomeError = Object.keys(form.formState.errors).length > 0

  useEffect(() => {
    if (isFirstTimeRef.current) {
      navigate('/welcome')
    }
  }, [navigate, isFirstTimeRef])

  const handleSubmit: SubmitHandler<TFormData> = async data => {
    if (!data.password.length) {
      form.setError('password', { message: t('invalidPassword') })
      return
    }

    try {
      const encryptedPassword = await window.api.encryptBasedOS(data.password)

      const walletPromises = wallets.current.map(async wallet => {
        if (!wallet.encryptedMnemonic) return
        const mnemonic = await window.api.decryptBasedEncryptedSecret(wallet.encryptedMnemonic, encryptedPassword)
        const isMnemonicValid = UtilsHelper.isMnemonic(mnemonic)
        if (!isMnemonicValid) throw new Error()
      })

      const accountPromises = accounts.current.map(async account => {
        if (!account.encryptedKey) return
        const key = await window.api.decryptBasedEncryptedSecret(account.encryptedKey, encryptedPassword)
        const service = bsAggregator.current.blockchainServicesByName[account.blockchain]
        const isKeyValid = service.validateKey(key)
        if (!isKeyValid) throw new Error()
      })

      await Promise.all([...walletPromises, ...accountPromises])
      dispatch(settingsReducerActions.setEncryptedPassword(encryptedPassword))
      navigate(location.state.from ?? '/')
    } catch {
      form.setError('password', { message: t('invalidPassword') })
    }
  }

  return (
    <WelcomeLayout title={t('title')}>
      <form
        className="w-full flex-grow flex flex-col justify-between mt-12 items-center"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex flex-col w-full gap-y-12">
          <div className="text-white border-white border-b py-2">{t('loginPassword')}</div>
          <Input
            type="password"
            {...form.register('password')}
            placeholder={t('passwordPlaceholder')}
            errorMessage={form.formState.errors.password?.message}
            autoFocus
          />
        </div>

        <Button
          label={t('buttonLoginLabel')}
          className="w-full"
          type="submit"
          disabled={hasSomeError}
          leftIcon={<LoginIcon />}
        />
      </form>
    </WelcomeLayout>
  )
}
