// @flow
import React from 'react'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'

import LogoutIcon from '../../../../assets/navigation/logout.svg'
import styles from './Logout.scss'

type Props = {
  id?: string,
  className?: string,
  logout: Function,
  promptHasBeenDisplayed: boolean => void,
}

const Logout = ({ id, className, logout, promptHasBeenDisplayed }: Props) => {
  const handleClick = () => {
    promptHasBeenDisplayed(false)
    logout()
  }

  return (
    <div
      id={id}
      className={classNames(styles.logout, className)}
      onClick={handleClick}
    >
      <LogoutIcon />
      <div className={styles.logoutText}>
        <FormattedMessage id="sidebarLogout" />
      </div>
    </div>
  )
}

export default Logout
