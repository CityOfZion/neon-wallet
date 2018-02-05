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
import { ROUTES } from '../../../core/constants'

import Logo from '../../../assets/logo.svg'

type Props = {
  className: string,
  neoPrice: number,
  gasPrice: number,
  currencyCode: string,
  showSendModal: Function,
  showReceiveModal: Function
}

const Sidebar = ({
  className,
  neoPrice,
  gasPrice,
  currencyCode,
  showSendModal,
  showReceiveModal
}: Props) => (
  <div className={classNames(styles.container, className)}>
    <div className={styles.logo}>
      <Logo />
    </div>

    <Tooltip id='dashboard' title='Dashboard' position='right'>
      <NavLink exact to={ROUTES.DASHBOARD} className={styles.navItem} activeClassName={styles.active}>
        <HomeIcon />
      </NavLink>
    </Tooltip>

    <Tooltip id='history' title='Transaction History' position='right'>
      <NavLink exact to={ROUTES.TRANSACTION_HISTORY} className={styles.navItem} activeClassName={styles.active}>
        <HistoryIcon />
      </NavLink>
    </Tooltip>

    <Tooltip id='send' title='Send' position='right'>
      <a className={styles.navItem} onClick={showSendModal}>
        <SendIcon />
      </a>
    </Tooltip>

    <Tooltip id='receive' title='Receive' position='right'>
      <a className={styles.navItem} onClick={showReceiveModal}>
        <ReceiveIcon />
      </a>
    </Tooltip>

    <Tooltip id='logout' title='Logout' position='right'>
      <Logout className={styles.navItem} />
    </Tooltip>
  </div>
)

export default Sidebar
