// @flow
import React from 'react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import Logout from './Logout'
import { ROUTES } from '../../../core/constants'

import HomeIcon from '../../../assets/navigation/home.svg'
import HistoryIcon from '../../../assets/navigation/history.svg'
import SendIcon from '../../../assets/navigation/send.svg'
import ReceiveIcon from '../../../assets/navigation/receive.svg'
import ContactsIcon from '../../../assets/navigation/contacts.svg'
import TokenSaleIcon from '../../../assets/navigation/tokens.svg'
import SettingsIcon from '../../../assets/navigation/settings.svg'
import NewsIcon from '../../../assets/navigation/news.svg'
import LogoWithTooltipAndBlockHeight from '../../../components/LogoWithTooltipAndBlockHeight/LogoWithTooltipAndBlockHeight'

import styles from './Sidebar.scss'

type Props = {
  className: string,
  theme: ThemeType,
  pendingTransactionsCount: number,
  count: number,
  isWatchOnly?: boolean,
  store: any,
}

const Sidebar = ({
  className,
  theme,
  pendingTransactionsCount,
  isWatchOnly,
  count,
  store,
}: Props) => (
  <div className={classNames(styles.container, className)}>
    <div className={styles.group}>
      <LogoWithTooltipAndBlockHeight
        store={store}
        theme={theme}
        count={count}
      />
      <NavLink
        id="dashboard"
        exact
        to={ROUTES.DASHBOARD}
        className={styles.navItem}
        activeClassName={styles.active}
      >
        <HomeIcon />
        <div>
          <FormattedMessage id="sidebarWallet" />
        </div>
      </NavLink>

      <NavLink
        id="history"
        exact
        to={ROUTES.TRANSACTION_HISTORY}
        className={styles.navItem}
        activeClassName={styles.active}
      >
        {pendingTransactionsCount > 0 && (
          <div className={styles.pendingTransactionsCount}>
            {pendingTransactionsCount}
          </div>
        )}
        <HistoryIcon />
        <div>
          {' '}
          <FormattedMessage id="sidebarActivity" />{' '}
        </div>
      </NavLink>

      <NavLink
        id="send"
        exact
        to={ROUTES.SEND}
        className={styles.navItem}
        activeClassName={styles.active}
      >
        <SendIcon />
        <div>
          {' '}
          <FormattedMessage id="sidebarSend" />{' '}
        </div>
      </NavLink>

      <NavLink
        id="receive"
        exact
        to={ROUTES.RECEIVE}
        className={styles.navItem}
        activeClassName={styles.active}
      >
        <ReceiveIcon />
        <div>
          {' '}
          <FormattedMessage id="sidebarReceive" />{' '}
        </div>
      </NavLink>

      <NavLink
        id="contacts"
        to={ROUTES.CONTACTS}
        className={styles.navItem}
        activeClassName={styles.active}
      >
        <ContactsIcon />
        <div>
          {' '}
          <FormattedMessage id="sidebarContacts" />{' '}
        </div>
      </NavLink>

      {!isWatchOnly && (
        <NavLink
          id="tokensale"
          to={ROUTES.TOKEN_SALE}
          className={styles.navItem}
          activeClassName={styles.active}
        >
          <TokenSaleIcon />
          <div id="token-sale-label">
            {' '}
            <FormattedMessage id="sidebarTokenSale" />{' '}
          </div>
        </NavLink>
      )}
      <NavLink
        id="News"
        to={ROUTES.NEWS}
        className={styles.navItem}
        activeClassName={styles.active}
      >
        <NewsIcon />
        <div>
          {' '}
          <FormattedMessage id="sidebarNews" />{' '}
        </div>
      </NavLink>

      <NavLink
        id="settings"
        to={ROUTES.SETTINGS}
        className={styles.navItem}
        activeClassName={styles.active}
      >
        <SettingsIcon />
        <div>
          {' '}
          <FormattedMessage id="sidebarSettings" />{' '}
        </div>
      </NavLink>
    </div>

    <Logout
      className={classNames(
        styles.group,
        styles.logoutToolTipGroup,
        styles.navItem,
      )}
      id="logout"
    />
  </div>
)

export default Sidebar
