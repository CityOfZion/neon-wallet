import { useTranslation } from 'react-i18next'
import { TbRefresh } from 'react-icons/tb'
import { IconButton } from '@renderer/components/IconButton'
import { MainLayout } from '@renderer/layouts/Main'

export const PortfolioPage = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'portfolio' })

  return (
    <MainLayout
      title={t('title')}
      contentClassName="gap-y-5"
      rightComponent={
        <IconButton icon={<TbRefresh />} filled={false} size="md" text={t('buttonRefreshLabel')} disabled />
      }
    >
      <div className="w-full flex bg-gray-darker flex-grow drop-shadow-lg animate-pulse"></div>
      <div className="w-full flex bg-gray-darker flex-grow drop-shadow-lg animate-pulse"></div>
    </MainLayout>
  )
}
