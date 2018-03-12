// @flow
import React from 'react'
import Power from 'react-icons/lib/md/power-settings-new'

import Tooltip from '../../../../components/Tooltip'
import styles from './Logout.scss'

type Props = {
  logout: Function
}

const Logout = ({ logout }: Props) => (
  <div id='logout' className={styles.logout} onClick={logout}>
    <Tooltip title='Logout'>
      <Power />
    </Tooltip>
  </div>
)

export default Logout
