// @flow
import React from 'react'
import { NavLink } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import { ROUTES } from '../../../../core/constants'

type Props = {
  error: boolean,
}

export const ActivityLink = ({ error }: Props) => (
  <div>
    {error &&
      'Although an error occurred its possible your transaction was processed.'}{' '}
    <NavLink id="wallet-manager" exact to={ROUTES.TRANSACTION_HISTORY}>
      <FormattedMessage id="sendActivityLink" />
    </NavLink>{' '}
  </div>
)
