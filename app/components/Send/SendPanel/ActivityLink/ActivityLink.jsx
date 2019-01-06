// @flow
import React from 'react'
import { NavLink } from 'react-router-dom'

import { ROUTES } from '../../../../core/constants'
import styles from './ActivityLink.scss'

type Props = {
  error: boolean,
}

export const ActivityLink = ({ error }: Props) => (
  <div>
    {error &&
      'Although an error occurred its possible your transaction was processed.'}{' '}
    Check the
    <NavLink id="wallet-manager" exact to={ROUTES.TRANSACTION_HISTORY}>
      <span> activity </span>
    </NavLink>{' '}
    tab to see the status of your transaction.
  </div>
)
