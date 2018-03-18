// @flow
import { compose } from 'recompose'
import { withCall, withData, withError, withActions } from 'spunky'

import LoginLedgerNanoS from './LoginLedgerNanoS'
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
  withCall(ledgerActions),
  withActions(ledgerActions, mapLedgerActionsToProps),
  withActions(ledgerLoginActions, mapAccountActionsToProps),
  withData(ledgerActions, mapLedgerDataToProps),
  withError(ledgerActions, mapLedgerErrorToProps)
)(LoginLedgerNanoS)
