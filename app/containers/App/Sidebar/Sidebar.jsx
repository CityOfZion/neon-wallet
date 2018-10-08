// @flow
import React from 'react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

import Logout from './Logout'
import styles from './Sidebar.scss'
import Tooltip from '../../../components/Tooltip'
import HomeIcon from '../../../assets/navigation/home.svg'
import HistoryIcon from '../../../assets/navigation/history.svg'
import SendIcon from '../../../assets/navigation/send.svg'
import ReceiveIcon from '../../../assets/navigation/receive.svg'
import ContactsIcon from '../../../assets/navigation/contacts.svg'
import VotingIcon from '../../../assets/navigation/bars.svg'
import TokenSaleIcon from '../../../assets/navigation/tokens.svg'
import SettingsIcon from '../../../assets/navigation/settings.svg'
import { ROUTES } from '../../../core/constants'

import LogoWithoutText from '../../../assets/images/logo-without-text-black.png'

type Props = {
  className: string
}

const Sidebar = ({ className }: Props) => (
  <div className={classNames(styles.container, className)}>
    <div className={styles.group}>
      <div className={styles.logo}>
        <img src={LogoWithoutText} alt="neon-logo" />
      </div>

      <NavLink
        id="dashboard"
        exact
        to={ROUTES.DASHBOARD}
        className={styles.navItem}
        activeClassName={styles.active}
      >
        <HomeIcon />
        <div> Wallet </div>
      </NavLink>

      <NavLink
        id="history"
        exact
        to={ROUTES.TRANSACTION_HISTORY}
        className={styles.navItem}
        activeClassName={styles.active}
      >
        <HistoryIcon />
        <div> Activity </div>
      </NavLink>

      <NavLink
        id="send"
        exact
        to={ROUTES.SEND}
        className={styles.navItem}
        activeClassName={styles.active}
      >
        <SendIcon />
        <div> Send </div>
      </NavLink>

      <NavLink
        id="receive"
        exact
        to={ROUTES.RECEIVE}
        className={styles.navItem}
        activeClassName={styles.active}
      >
        <ReceiveIcon />
        <div> Receive </div>
      </NavLink>

      <NavLink
        id="contacts"
        to={ROUTES.CONTACTS}
        className={styles.navItem}
        activeClassName={styles.active}
      >
        <ContactsIcon />
        <div> Contacts </div>
      </NavLink>

      <NavLink
        id="tokensale"
        to={ROUTES.TOKEN_SALE}
        className={styles.navItem}
        activeClassName={styles.active}
      >
        <TokenSaleIcon />
        <div> Token Sale </div>
      </NavLink>

      <Tooltip title="Coming Soon" position="right">
        <div id="voting" className={styles.disabledNavIem}>
          <VotingIcon />
          <div> Voting </div>
        </div>
      </Tooltip>

      <NavLink
        id="settings"
        to={ROUTES.SETTINGS}
        className={styles.navItem}
        activeClassName={styles.active}
      >
        <SettingsIcon />
        <div> Settings </div>
      </NavLink>
    </div>

    <Logout
      className={classNames(
        styles.group,
        styles.logoutToolTipGroup,
        styles.navItem
      )}
      id="logout"
    />
  </div>
)

export default Sidebar
