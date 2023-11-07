import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { ReactComponent as LoginIcon } from '@renderer/assets/images/loginIcon.svg'
import { Button } from '@renderer/components/Button'
import { Input } from '@renderer/components/Input'
import { useAppDispatch, useAppSelector } from '@renderer/hooks/useRedux'
import { WelcomeLayout } from '@renderer/layouts/Welcome'
import { settingsReducerActions } from '@renderer/store/reducers/SettingsReducer'

type TFormData = {
  password: string
}

export const LoginPage = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'login' })
  const form = useForm<TFormData>()
  const location = useLocation()
  const { ref: isFirstTimeRef } = useAppSelector(state => state.settings.isFirstTime)
  const dispatch = useAppDispatch()
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
      await dispatch(settingsReducerActions.login({ password: data.password })).unwrap()
      navigate(location.state.from ?? '/')
    } catch {
      form.setError('password', { message: t('invalidPassword') })
    }
  }

  return (
    <WelcomeLayout heading={t('title')}>
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
