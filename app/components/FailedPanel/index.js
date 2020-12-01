// @flow
import { compose } from 'recompose'

import FailedPanel from './FailedPanel'
import balancesActions from '../../actions/balancesActions'
import withLoadingProp from '../../hocs/withLoadingProp'
import withFailureNotification from '../../hocs/withFailureNotification'

export default compose(
  withLoadingProp(balancesActions),
  withFailureNotification(
    balancesActions,
    'notifications.failure.blockchainInfoFailure',
    {},
    true,
  ),
)(FailedPanel)
