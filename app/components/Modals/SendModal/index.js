import { compose } from 'recompose'
import { withActions, withData, withProgress } from 'spunky'

import SendModal from './SendModal'
import {
  getRecipientData,
  clearRecipientData,
} from '../../../actions/sendModalActions'
import withFailureNotification from '../../../hocs/withFailureNotification'
import withChainData from '../../../hocs/withChainData'

const mapGetDataToProps = action => ({
  getRecipientData: (url, chain) => action.call({ url, chain }),
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

  withActions(clearRecipientData, mapClearDataToProps),
  withData(clearRecipientData, mapRecipientDataToProps),
  withChainData(),
)(SendModal)
