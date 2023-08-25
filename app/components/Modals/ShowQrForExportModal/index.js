// @flow
import { compose } from 'recompose'

import ShowQrForExportModal from './ShowQrForExportModal'
import withAuthData from '../../../hocs/withAuthData'
import withSettingsContext from '../../../hocs/withSettingsContext'

export default compose(withAuthData())(
  withSettingsContext(ShowQrForExportModal),
)
