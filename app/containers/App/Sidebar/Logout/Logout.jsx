// @flow
import React from 'react'
import classNames from 'classnames'
import Power from 'react-icons/lib/md/power-settings-new'

import styles from './Logout.scss'

type Props = {
  className: string,
  logout: Function
}

const Logout = ({ className, logout }: Props) => (
  <div id='logout' className={classNames(styles.logout, className)} onClick={logout}>
    <Power />
  </div>
)

export default Logout
