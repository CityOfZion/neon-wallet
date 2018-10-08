// @flow
import React from 'react'
import classNames from 'classnames'

import LogoutIcon from '../../../../assets/navigation/logout.svg'
import styles from './Logout.scss'

type Props = {
  id?: string,
  className?: string,
  logout: Function
}

const Logout = ({ id, className, logout }: Props) => (
  <div
    id={id}
    className={classNames(styles.logout, className)}
    onClick={logout}
  >
    <LogoutIcon />
    <div className={styles.logoutText}> Logout </div>
  </div>
)

export default Logout
