import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { TbRefresh } from 'react-icons/tb'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '@renderer/@types/store'
import { IconButton } from '@renderer/components/IconButton'
import { MainLayout } from '@renderer/layouts/Main'

export const PortfolioPage = () => {
  const isFirstTime = useSelector((state: RootState) => state.settings.isFirstTime)
  const { t } = useTranslation('pages', { keyPrefix: 'portfolio' })
  const navigate = useNavigate()

  useEffect(() => {
    if (isFirstTime) {
      navigate('/welcome')
    }
  }, [navigate, isFirstTime])

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
