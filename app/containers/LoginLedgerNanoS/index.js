// @flow
import { compose } from 'recompose'
import {
  withCall,
  withProgress,
  withData,
  withError,
  withActions,
  recentlyCompletedStrategy,
} from 'spunky'

import LoginLedgerNanoS from './LoginneonLedger'
import ledgerActions from '../../actions/ledgerActions'
import { ledgerLoginActions } from '../../actions/authActions'

const mapLedgerActionsToProps = () => ({
  connect: () => ledgerActions.call(),
})

const mapAccountActionsToProps = () => ({
  login: ({ account, key }) =>
    ledgerLoginActions.call({ publicKey: key, account }),
})

const mapLedgerDataToProps = data => {
  const { deviceInfo, publicKey } = data || {}
  return { deviceInfo, publicKey }
}

const mapLedgerErrorToProps = error => ({ error })

export default compose(
  withCall(ledgerActions),
  withActions(ledgerActions, mapLedgerActionsToProps),
  withActions(ledgerLoginActions, mapAccountActionsToProps),
  withProgress(ledgerActions, {
    strategy: recentlyCompletedStrategy,
  }),
  withData(ledgerActions, mapLedgerDataToProps),
  withError(ledgerActions, mapLedgerErrorToProps),
)(LoginLedgerNanoS)
