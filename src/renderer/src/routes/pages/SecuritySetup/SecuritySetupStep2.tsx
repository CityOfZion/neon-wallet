import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@renderer/components/Button'
import { Input } from '@renderer/components/Input'
import { useAppDispatch } from '@renderer/hooks/useRedux'
import { settingsReducerActions } from '@renderer/store/reducers/SettingsReducer'

type TFormData = {
  confirmPassword: string
}

export const SecuritySetupStep2Page = () => {
  const { state } = useLocation()
  const form = useForm<TFormData>()
  const { t } = useTranslation('pages', { keyPrefix: 'securitySetupStep2' })
  const { t: commonT } = useTranslation('common')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const hasSomeError = Object.keys(form.formState.errors).length > 0

  const handleSubmit: SubmitHandler<TFormData> = async data => {
    if (data.confirmPassword !== state.password) {
      form.setError('confirmPassword', { message: t('confirmPasswordError') })
      return
    }

    const encryptedPassword = await window.api.encryptBasedOS(data.confirmPassword)
    dispatch(settingsReducerActions.setEncryptedPassword(encryptedPassword))
    dispatch(settingsReducerActions.setSecurityType('password'))

    navigate('/security-setup/3', { state: { encryptedPassword } })
  }

  return (
    <>
      <p className="text-sm text-white">{t('formTitle')}</p>
      <form
        className="w-full flex-grow flex flex-col justify-between mt-6 items-center"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <Input
          type="password"
          {...form.register('confirmPassword')}
          placeholder={t('confirmPasswordPlaceholder')}
          errorMessage={form.formState.errors.confirmPassword?.message}
          autoFocus
        />

        <Button label={commonT('general.continue')} className="w-64" type="submit" disabled={hasSomeError} />
      </form>
    </>
  )
}
