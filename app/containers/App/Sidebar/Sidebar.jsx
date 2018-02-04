// @flow
import React from 'react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import HomeIcon from 'react-icons/lib/md/home'
import ArrowUpIcon from 'react-icons/lib/fa/arrow-circle-up'
import ArrowDownIcon from 'react-icons/lib/fa/arrow-circle-down'

import Logout from './Logout'
import styles from './Sidebar.scss'
import Tooltip from '../../../components/Tooltip'
import { ROUTES } from '../../../core/constants'

import logo from '../../../images/neon-logo2.png'

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
      <img src={logo} width='60px' />
    </div>

    <Tooltip title='Dashboard' position='right'>
      <NavLink exact to={ROUTES.DASHBOARD} className={styles.navItem} activeClassName={styles.active}>
        <HomeIcon />
      </NavLink>
    </Tooltip>

    <Tooltip title='Send' position='right'>
      <a className={styles.navItem} onClick={showSendModal}>
        <ArrowUpIcon />
      </a>
    </Tooltip>

    <Tooltip title='Receive' position='right'>
      <a className={styles.navItem} onClick={showReceiveModal}>
        <ArrowDownIcon />
      </a>
    </Tooltip>

    <Tooltip title='Logout' position='right'>
      <Logout className={styles.navItem} />
    </Tooltip>
  </div>
)

export default Sidebar
