import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@renderer/components/Button'
import { Input } from '@renderer/components/Input'

type TFormData = {
  password: string
}

const MIN_PASSWORD_LENGTH = 4

export const SecuritySetupStep1Page = () => {
  const form = useForm<TFormData>()
  const { t } = useTranslation('pages', { keyPrefix: 'securitySetupStep1' })
  const { t: commonT } = useTranslation('common')
  const navigate = useNavigate()

  const hasSomeError = Object.keys(form.formState.errors).length > 0

  const handleSubmit: SubmitHandler<TFormData> = data => {
    if (data.password.length < MIN_PASSWORD_LENGTH) {
      form.setError('password', { message: t('passwordError', { length: MIN_PASSWORD_LENGTH }) })
      return
    }

    navigate('/security-setup/2', { state: data })
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
          {...form.register('password')}
          placeholder={t('passwordPlaceholder')}
          errorMessage={form.formState.errors.password?.message}
          autoFocus
        />

        <Button label={commonT('general.continue')} className="w-64" type="submit" disabled={hasSomeError} />
      </form>
    </>
  )
}
