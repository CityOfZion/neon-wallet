import { useTranslation } from 'react-i18next'
import { MdAdd } from 'react-icons/md'
import { TbFileExport, TbFileImport } from 'react-icons/tb'
import { Outlet } from 'react-router-dom'
import { IconButton } from '@renderer/components/IconButton'
import { Separator } from '@renderer/components/Separator'
import { SidebarMenuButton } from '@renderer/components/SidebarMenuButton'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'
import { MainLayout } from '@renderer/layouts/Main'

export const PortfolioPage = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'portfolio' })
  const { modalNavigateWrapper } = useModalNavigate()

  return (
    <MainLayout
      heading={t('title')}
      rightComponent={
        <div className="flex gap-x-2">
          <IconButton
            icon={<MdAdd />}
            size="md"
            text={t('newWalletButtonLabel')}
            onClick={modalNavigateWrapper('create-wallet-step-1')}
          />
          <IconButton
            icon={<TbFileImport />}
            size="md"
            text={t('importButtonLabel')}
            onClick={modalNavigateWrapper('import')}
          />
          <IconButton icon={<TbFileExport />} size="md" text={t('exportButtonLabel')} disabled />
        </div>
      }
      contentClassName="flex-row gap-x-3"
    >
      <section className="bg-gray-800 rounded drop-shadow-lg max-w-[11.625rem] min-w-[11.625rem] w-full flex flex-col">
        <div className="text-sm px-4">
          <p className="py-3">{t('allAccounts')}</p>
          <Separator />
        </div>
        <ul className="max-w-full w-full">
          <SidebarMenuButton title={t('overview')} to="/portfolio/overview" />
          <SidebarMenuButton title={t('allActivity')} to="/portfolio/activity" />
          <SidebarMenuButton title={t('allConnections')} to="/portfolio/connections" />
        </ul>
      </section>
      <Outlet />
    </MainLayout>
  )
}
