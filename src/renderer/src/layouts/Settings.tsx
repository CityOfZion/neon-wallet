import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, Outlet, useMatch } from 'react-router-dom'
import { StyleHelper } from '@renderer/helpers/StyleHelper'
import { MainLayout } from '@renderer/layouts/Main'

type TProps = {
  children: ReactNode
}

export const SettingsLayout = ({ children }: TProps) => {
  const { t } = useTranslation('pages', { keyPrefix: 'settings' })

  const matchRootPersonalisation = useMatch('/settings')

  return (
    <MainLayout heading={t('title')}>
      <section className="bg-gray-800 w-full h-full flex rounded">
        <div className="min-w-[17.5rem] px-5 border-r flex flex-col items-center">
          <div className="flex flex-row justify-between h-15 w-full mb-5 text-[10px]">
            <NavLink
              to={'/settings/personalisation'}
              className={({ isActive }) => {
                return StyleHelper.mergeStyles('w-[50%] border-b text-center flex justify-center flex-col', {
                  'border-b-2': isActive || matchRootPersonalisation,
                  'text-gray-300': !isActive && !matchRootPersonalisation,
                })
              }}
            >
              {t('sidebarOption.personalisation')}
            </NavLink>
            <NavLink
              to={'/settings/security'}
              className={({ isActive }) => {
                return StyleHelper.mergeStyles('w-[50%] border-b text-center flex justify-center flex-col', {
                  'border-b-2': isActive,
                  'text-gray-300': !isActive,
                })
              }}
            >
              {t('sidebarOption.security')}
            </NavLink>
          </div>
          <nav className="flex flex-row justify-between h-15 w-full mb-5 text-[14px]">
            <ul className="max-w-full w-full">{children}</ul>
          </nav>
        </div>
        <Outlet />
      </section>
    </MainLayout>
  )
}
