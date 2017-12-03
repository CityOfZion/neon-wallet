// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import Power from 'react-icons/lib/md/power-settings-new'
import Tooltip from '../../components/Tooltip'
import { ROUTES } from '../../core/constants'
import styles from './Logout.scss'

type Props = {
  logout: Function
}

const Logout = ({ logout }: Props) =>
  <div id='logout' className={styles.logout} onClick={logout}>
    <Link to={ROUTES.HOME}><Tooltip title='Logout' position='right'><Power /></Tooltip></Link>
  </div>

export default Logout
