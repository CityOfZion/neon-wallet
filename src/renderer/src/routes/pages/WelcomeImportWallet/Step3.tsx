import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { MdOutlineShield } from 'react-icons/md'
import { TbDiscountCheck } from 'react-icons/tb'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@renderer/components/Button'

export const WelcomeImportWalletStep3Page = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'welcomeImportWallet.step3' })
  const navigate = useNavigate()
  const { state } = useLocation()

  const handleClick = () => {
    navigate('/welcome-security-setup', { state })
  }

  return (
    <Fragment>
      <p className="text-sm text-white mt-15">{t('title')}</p>

      <TbDiscountCheck className="w-[6.25rem] h-[6.25rem] text-blue stroke-1 mt-3" />

      <div className="flex-grow flex items-end">
        <Button
          label={t('setupSecurityButtonLabel')}
          leftIcon={<MdOutlineShield />}
          variant="contained"
          onClick={handleClick}
        />
      </div>
    </Fragment>
  )
}
