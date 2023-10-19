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

import { ReactComponent as NeonLogoIcon } from '../../assets/images/neon-wallet-compact.svg'
import { ReactComponent as WalletIcon } from '../../assets/images/wallet-icon.svg'

import { Link } from './Link'

export const Sidebar = (): JSX.Element => {
  const { t } = useTranslation('components', { keyPrefix: 'sidebar' })

  return (
    <aside className="bg-gray-800 h-screen w-[64px] min-w-[64px] flex flex-col">
      <div className="flex justify-center py-4">
        <NeonLogoIcon className="fill-neon" />
      </div>

      <nav className="flex-grow">
        <ul className="flex flex-col justify-between h-full">
          <div>
            <Link to="/" title={t('portfolio')} icon={<TbHome2 />} />
            <Link to="/wallets" title={t('wallets')} disabled icon={<WalletIcon />} />
            <Link to="/send" title={t('send')} disabled icon={<TbStepOut />} />
            <Link to="/receive" title={t('receive')} disabled icon={<TbStepInto />} />
            <Link to="/nfts" title={t('nfts')} disabled icon={<TbDiamond />} />
            <Link to="/news" title={t('news')} disabled icon={<TbNews />} />
            <Link to="/contacts" title={t('contacts')} disabled icon={<TbUsers />} />
            <Link to="/settings" title={t('settings')} disabled icon={<TbSettings />} />
            <Link to="/mobile" title={t('mobile')} disabled isNew icon={<TbDeviceMobile />} />
          </div>

          <Link to="/login" title={t('logout')} disabled icon={<TbDoorExit />} />
        </ul>
      </nav>
    </aside>
  )
}
