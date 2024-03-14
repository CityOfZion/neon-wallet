import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { MdOutlineAutoAwesome } from 'react-icons/md'
import { TbDiscountCheck } from 'react-icons/tb'
import { Link } from '@renderer/components/Link'

export const WelcomeImportWalletStep5Page = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'welcomeImportWallet.step5' })

  return (
    <Fragment>
      <div className="flex flex-col items-center flex-grow">
        <p className="text-sm text-white mt-15">{t('title')}</p>

        <TbDiscountCheck className="w-[6.25rem] h-[6.25rem] text-blue stroke-1 mt-3" />
      </div>

      <Link
        to="/"
        label={t('openWalletButtonLabel')}
        rightIcon={<MdOutlineAutoAwesome />}
        variant="contained"
        className="w-64"
        iconsOnEdge={false}
      />
    </Fragment>
  )
}
