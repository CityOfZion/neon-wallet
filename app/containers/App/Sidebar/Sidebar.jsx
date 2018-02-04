// @flow
import React from 'react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import HomeIcon from 'react-icons/lib/md/home'

import Logout from './Logout'
import styles from './Sidebar.scss'
import Tooltip from '../../../components/Tooltip'
import { ROUTES } from '../../../core/constants'

import logo from '../../../images/neon-logo2.png'

type Props = {
  className: string,
  neoPrice: number,
  gasPrice: number,
  currencyCode: string
}

const Sidebar = ({
  className,
  neoPrice,
  gasPrice,
  currencyCode
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

    <Tooltip title='Logout' position='right'>
      <Logout className={styles.navItem} />
    </Tooltip>
  </div>
)

export default Sidebar
