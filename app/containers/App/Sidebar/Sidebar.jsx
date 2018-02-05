// @flow
import React from 'react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

import Logout from './Logout'
import styles from './Sidebar.scss'
import Tooltip from '../../../components/Tooltip'
import HomeIcon from '../../../assets/navigation/home.svg'
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

    <Tooltip title='Dashboard' position='right'>
      <NavLink exact to={ROUTES.DASHBOARD} className={styles.navItem} activeClassName={styles.active}>
        <HomeIcon />
      </NavLink>
    </Tooltip>

    <Tooltip title='Send' position='right'>
      <a className={styles.navItem} onClick={showSendModal}>
        <SendIcon />
      </a>
    </Tooltip>

    <Tooltip title='Receive' position='right'>
      <a className={styles.navItem} onClick={showReceiveModal}>
        <ReceiveIcon />
      </a>
    </Tooltip>

    <Tooltip title='Logout' position='right'>
      <Logout className={styles.navItem} />
    </Tooltip>
  </div>
)

export default Sidebar
