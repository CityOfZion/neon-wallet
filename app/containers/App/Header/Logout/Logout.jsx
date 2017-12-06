// @flow
import React from 'react'
import { Link } from 'react-router-dom'

import Power from 'react-icons/lib/md/power-settings-new'
import Tooltip from '../../../../components/Tooltip'
import { ROUTES } from '../../../../core/constants'

import styles from './Logout.scss'

type Props = {
  onClick: Function
}

const Logout = ({ onClick }: Props) =>
  <div id='logout' className={styles.logout} onClick={onClick}>
    <Link to={ROUTES.HOME}>
      <Tooltip title='Logout'>
        <Power />
      </Tooltip>
    </Link>
  </div>

export default Logout
