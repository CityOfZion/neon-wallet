// @flow
import { compose } from 'recompose'
import { withData, withCall } from 'spunky'
import { injectIntl, IntlShape } from 'react-intl'

import contactsActions from '../../../actions/contactsActions'
import TransferNftModal from './TransferNftModal'
import withNetworkData from '../../../hocs/withNetworkData'
import withAuthData from '../../../hocs/withAuthData'

const mapContactsDataToProps = (contacts: Object) => ({ contacts })

export default compose(
  withCall(contactsActions),
  withData(contactsActions, mapContactsDataToProps),
  injectIntl,
  withNetworkData(),
  withAuthData(),
)(TransferNftModal)
