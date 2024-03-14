import { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'
import { TbStepInto, TbStepOut } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { IAccountState } from '@renderer/@types/store'
import { Button } from '@renderer/components/Button'
import { Separator } from '@renderer/components/Separator'

type TProps = {
  title: string
  showButtons: boolean
  account?: IAccountState
} & ComponentProps<'div'>

export const AccountDetailsLayout = ({ title, showButtons, account, children }: TProps): JSX.Element => {
  const navigate = useNavigate()
  const { t } = useTranslation('common', { keyPrefix: 'general' })

  return (
    <div className="w-full flex flex-col flex-grow px-4 py-3 min-h-0">
      <div className="flex justify-between items-center text-sm mb-3 max-h-[1.75rem] h-full">
        <h1 className="text-white text-sm">{title}</h1>

        {showButtons && account && account?.accountType !== 'watch' && (
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
        )}
      </div>

      <Separator />

      {children}
    </div>
  )
}
