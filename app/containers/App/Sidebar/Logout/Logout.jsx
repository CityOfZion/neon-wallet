// @flow
import React from 'react'
import classNames from 'classnames'

import LogoutIcon from '../../../../assets/navigation/logout.svg'
import styles from './Logout.scss'

type Props = {
  className: string,
  logout: Function
}

const Logout = ({ className, logout }: Props) => (
  <div id='logout' className={classNames(styles.logout, className)} onClick={logout}>
    <LogoutIcon />
  </div>
)

export default Logout
