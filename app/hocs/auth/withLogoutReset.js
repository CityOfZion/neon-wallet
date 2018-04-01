// @flow
import { compose } from 'recompose'
import { withData, withReset, type Actions } from 'spunky'

import withoutProps from '../withoutProps'
import didLogout from '../helpers/didLogout'
import authActions from '../../actions/authActions'

type Options = {
  propName?: string
}

export default function withLogoutReset (actions: Actions, { propName = '__address__' }: Options = {}) {
  const mapAuthDataToProps = (account) => ({
    [propName]: account && account.address
  })

  const shouldReset = (oldProps, newProps) => didLogout(oldProps[propName], newProps[propName])

  return compose(
    withData(authActions, mapAuthDataToProps),
    withReset(actions, shouldReset),
    withoutProps(propName)
  )
}
