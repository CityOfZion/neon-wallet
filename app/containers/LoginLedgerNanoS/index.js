// @flow
import { compose } from 'recompose'

import LoginLedgerNanoS from './LoginLedgerNanoS'
import withData from '../../hocs/api/withData'
import withError from '../../hocs/api/withError'
import withFetch from '../../hocs/api/withFetch'
import withActions from '../../hocs/api/withActions'
import ledgerActions from '../../actions/ledgerActions'
import { ledgerLoginActions } from '../../actions/authActions'

const mapLedgerActionsToProps = (actions) => ({
  connect: () => ledgerActions.request()
})

const mapAccountActionsToProps = (actions) => ({
  login: (publicKey) => ledgerLoginActions.request({ publicKey })
})

const mapLedgerDataToProps = (data) => {
  const { deviceInfo, publicKey } = data || {}
  return { deviceInfo, publicKey }
}

const mapLedgerErrorToProps = (error) => ({ error })

export default compose(
  withFetch(ledgerActions),
  withActions(ledgerActions, mapLedgerActionsToProps),
  withActions(ledgerLoginActions, mapAccountActionsToProps),
  withData(ledgerActions, mapLedgerDataToProps),
  withError(ledgerActions, mapLedgerErrorToProps)
)(LoginLedgerNanoS)
