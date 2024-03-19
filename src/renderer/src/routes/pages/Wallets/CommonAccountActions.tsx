import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { TbStepInto, TbStepOut } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { IAccountState } from '@renderer/@types/store'
import { Button } from '@renderer/components/Button'

type TProps = {
  account: IAccountState
}

export const CommonAccountActions = ({ account }: TProps) => {
  const navigate = useNavigate()
  const { t } = useTranslation('common', { keyPrefix: 'general' })

  return account?.accountType !== 'watch' ? (
    <div>
      <Button
        leftIcon={<TbStepInto className="text-neon w-5 h-5" />}
        label={t('receive')}
        className="w-fit h-9"
        variant="text"
        colorSchema="neon"
        clickableProps={{ className: 'text-xs' }}
        onClick={() => navigate('/receive', { state: { account: account } })}
      />
      <Button
        leftIcon={<TbStepOut className="text-neon w-5 h-5" />}
        label={t('send')}
        className="w-fit h-9"
        variant="text"
        colorSchema="neon"
        clickableProps={{ className: 'text-xs' }}
        onClick={() => navigate('/send', { state: { account: account } })}
      />
    </div>
  ) : (
    <Fragment />
  )
}
