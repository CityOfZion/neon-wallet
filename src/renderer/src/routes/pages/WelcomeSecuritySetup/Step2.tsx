import { ChangeEvent, Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@renderer/components/Button'
import { Input } from '@renderer/components/Input'
import { useActions } from '@renderer/hooks/useActions'
import { useAppDispatch } from '@renderer/hooks/useRedux'
import { settingsReducerActions } from '@renderer/store/reducers/SettingsReducer'

type TFormData = {
  confirmPassword: string
}

export const WelcomeSecuritySetupStep2Page = () => {
  const { state } = useLocation()
  const { t } = useTranslation('pages', { keyPrefix: 'welcomeSecuritySetup.step2' })
  const { t: commonT } = useTranslation('common')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { actionData, actionState, handleAct, setData, setError } = useActions<TFormData>({
    confirmPassword: '',
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const confirmPassword = event.target.value
    setData({ confirmPassword })

    if (confirmPassword !== state.password) {
      setError('confirmPassword', t('confirmPasswordError'))
    }
  }

  const handleSubmit = async (data: TFormData) => {
    const encryptedPassword = await window.api.encryptBasedOS(data.confirmPassword)
    dispatch(settingsReducerActions.setEncryptedPassword(encryptedPassword))
    dispatch(settingsReducerActions.setSecurityType('password'))

    navigate('/welcome-security-setup/3', { state })
  }

  return (
    <Fragment>
      <p className="text-sm text-white mt-15">{t('formTitle')}</p>
      <form
        className="w-full flex-grow flex flex-col justify-between mt-6 items-center"
        onSubmit={handleAct(handleSubmit)}
      >
        <Input
          type="password"
          value={actionData.confirmPassword}
          onChange={handleChange}
          placeholder={t('confirmPasswordPlaceholder')}
          errorMessage={actionState.errors.confirmPassword}
          autoFocus
        />

        <Button
          label={commonT('general.continue')}
          className="w-64"
          type="submit"
          disabled={!actionState.isValid || actionState.isActing}
        />
      </form>
    </Fragment>
  )
}
