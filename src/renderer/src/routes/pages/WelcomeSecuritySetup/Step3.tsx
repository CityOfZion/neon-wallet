import { useTranslation } from 'react-i18next'
import { MdOutlineAutoAwesome } from 'react-icons/md'
import { TbDiscountCheck } from 'react-icons/tb'
import { Link } from '@renderer/components/Link'

export const WelcomeSecuritySetupStep3Page = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'welcomeSecuritySetup.step3' })

  return (
    <div className="flex-grow w-full flex flex-col justify-between items-center">
      <div className="flex flex-col items-center mt-15">
        <h3 className="text-sm text-white text-center">{t('title')}</h3>

        <TbDiscountCheck className="w-[6.25rem] h-[6.25rem] text-blue stroke-1 mt-3" />
      </div>

      <Link
        label={t('buttonContinueLabel')}
        to="/portfolio"
        className="w-64"
        rightIcon={<MdOutlineAutoAwesome />}
        iconsOnEdge={false}
      />
    </div>
  )
}
