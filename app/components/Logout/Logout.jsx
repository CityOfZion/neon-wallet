// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import Power from 'react-icons/lib/md/power-settings-new'
import ReactTooltip from 'react-tooltip'
import { ROUTES } from '../../core/constants'
import styles from './Logout.scss'

type Props = {
  logout: Function
}

const Logout = ({ logout }: Props) =>
  <div id='logout' className={styles.logout} data-tip data-for='logoutTip' onClick={logout}>
    <Link to={ROUTES.HOME}><Power /></Link>
    <ReactTooltip class='solidTip' id='logoutTip' place='bottom' type='dark' effect='solid'>
      <span>Logout</span>
    </ReactTooltip>
  </div>

export default Logout
