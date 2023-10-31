import { useTranslation } from 'react-i18next'
import { TbRefresh } from 'react-icons/tb'
import { IconButton } from '@renderer/components/IconButton'
import { PortfolioLayout } from '@renderer/layouts/Portfolio'

export const PortfolioPage = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'portfolio' })

  return (
    <PortfolioLayout
      heading={t('title')}
      rightComponent={
        <IconButton icon={<TbRefresh />} filled={false} size="md" text={t('buttonRefreshLabel')} disabled />
      }
    />
  )
}
