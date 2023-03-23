import { compose } from 'recompose'
import { withActions, withData, withProgress } from 'spunky'

import SendModal from './SendModal'
import {
  getRecipientData,
  clearRecipientData,
} from '../../../actions/sendModalActions'
import withFailureNotification from '../../../hocs/withFailureNotification'
import withNetworkData from '../../../hocs/withNetworkData'
import withSettingsContext from '../../../hocs/withSettingsContext'

const mapGetDataToProps = action => ({
  getRecipientData: (url, chain, net) => action.call({ url, chain, net }),
})

const mapClearDataToProps = action => ({
  clearRecipientData: () => action.call(),
})

const mapRecipientDataToProps = recipientData => ({ recipientData })

export default compose(
  withActions(getRecipientData, mapGetDataToProps),
  withData(getRecipientData, mapRecipientDataToProps),
  withFailureNotification(
    getRecipientData,
    message =>
      `An error occurred while scanning this QR code: ${message}. Please try again.`,
  ),
  withProgress(getRecipientData),
  withNetworkData(),
  withActions(clearRecipientData, mapClearDataToProps),
  withData(clearRecipientData, mapRecipientDataToProps),
)(withSettingsContext(SendModal))
