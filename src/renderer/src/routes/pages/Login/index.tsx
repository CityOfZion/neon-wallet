import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { ReactComponent as LoginIcon } from '@renderer/assets/images/loginIcon.svg'
import { Button } from '@renderer/components/Button'
import { Input } from '@renderer/components/Input'
import { useActions } from '@renderer/hooks/useActions'
import { useLogin } from '@renderer/hooks/useLogin'
import { useAppSelector } from '@renderer/hooks/useRedux'
import { WelcomeLayout } from '@renderer/layouts/Welcome'

type TFormData = {
  password: string
}

export const LoginPage = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'login' })

  const location = useLocation()
  const { ref: isFirstTimeRef } = useAppSelector(state => state.settings.isFirstTime)
  const navigate = useNavigate()
  const { login } = useLogin()

  const { actionData, actionState, setData, setError, handleAct } = useActions<TFormData>({
    password: '',
  })

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value
    setData({ password })

    if (!password.length) {
      setError('password', t('invalidPassword'))
      return
    }
  }

  const handleSubmit = async (data: TFormData) => {
    try {
      await login(data.password)
      navigate(location.state.from ?? '/')
    } catch (error: any) {
      setError('password', t('invalidPassword'))
    }
  }

  useEffect(() => {
    if (isFirstTimeRef.current) {
      navigate('/welcome')
    }
  }, [navigate, isFirstTimeRef])

  return (
    <WelcomeLayout heading={t('title')}>
      <form
        className="w-full flex-grow flex flex-col justify-between mt-12 items-center"
        onSubmit={handleAct(handleSubmit)}
      >
        <div className="flex flex-col w-full gap-y-12">
          <div className="text-white border-white border-b py-2">{t('loginPassword')}</div>
          <Input
            type="password"
            value={actionData.password}
            onChange={handleChangePassword}
            placeholder={t('passwordPlaceholder')}
            errorMessage={actionState.errors.password}
            autoFocus
          />
        </div>

        <Button
          label={t('buttonLoginLabel')}
          className="w-full"
          type="submit"
          disabled={!actionState.isValid || actionState.isActing}
          leftIcon={<LoginIcon />}
        />
      </form>
    </WelcomeLayout>
  )
}
