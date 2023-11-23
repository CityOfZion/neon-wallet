import { useTranslation } from 'react-i18next'
import {
  TbDeviceMobile,
  TbDiamond,
  TbDoorExit,
  TbHome2,
  TbNews,
  TbSettings,
  TbStepInto,
  TbStepOut,
  TbUsers,
} from 'react-icons/tb'
import { useAppDispatch } from '@renderer/hooks/useRedux'
import { settingsReducerActions } from '@renderer/store/reducers/SettingsReducer'

import { ReactComponent as NeonLogoIcon } from '../../assets/images/neon-wallet-compact.svg'
import { ReactComponent as WalletIcon } from '../../assets/images/wallet-icon.svg'

import { SidebarButton } from './SidebarButton'
import { SidebarLink } from './SidebarLink'

export const Sidebar = (): JSX.Element => {
  const { t } = useTranslation('components', { keyPrefix: 'sidebar' })
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(settingsReducerActions.logout())
  }

  return (
    <aside className="bg-gray-800 h-screen w-[64px] min-w-[64px] flex flex-col">
      <div className="flex justify-center py-4">
        <NeonLogoIcon className="fill-neon" />
      </div>

      <nav className="flex-grow">
        <ul className="flex flex-col justify-between h-full">
          <div>
            <SidebarLink to="/" title={t('portfolio')} icon={<TbHome2 />} />
            <SidebarLink to="/wallets" title={t('wallets')} icon={<WalletIcon />} />
            <SidebarLink to="/send" title={t('send')} disabled icon={<TbStepOut />} />
            <SidebarLink to="/receive" title={t('receive')} disabled icon={<TbStepInto />} />
            <SidebarLink to="/nfts" title={t('nfts')} disabled icon={<TbDiamond />} />
            <SidebarLink to="/news" title={t('news')} disabled icon={<TbNews />} />
            <SidebarLink to="/contacts" title={t('contacts')} icon={<TbUsers />} />
            <SidebarLink to="/settings" title={t('settings')} disabled icon={<TbSettings />} />
            <SidebarLink to="/mobile" title={t('mobile')} disabled isNew icon={<TbDeviceMobile />} />
          </div>

          <SidebarButton onClick={handleLogout} title={t('logout')} icon={<TbDoorExit />} />
        </ul>
      </nav>
    </aside>
  )
}
