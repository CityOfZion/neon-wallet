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
  login: (publicKey, signingFunction) => ledgerLoginActions.request({ publicKey, signingFunction })
})

const mapLedgerDataToProps = ({ deviceInfo, publicKey }) => ({ deviceInfo, publicKey })
const mapLedgerErrorToProps = ({ deviceInfo, publicKey }) => ({ error: deviceInfo || publicKey })

export default compose(
  withFetch(ledgerActions),
  withActions(ledgerActions, mapLedgerActionsToProps),
  withActions(ledgerLoginActions, mapAccountActionsToProps),
  withData(ledgerActions, mapLedgerDataToProps),
  withError(ledgerActions, mapLedgerErrorToProps)
)(LoginLedgerNanoS)
