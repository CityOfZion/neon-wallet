// @flow
import { compose } from 'recompose'

import ShowQrForExportModal from './ShowQrForExportModal'
import withThemeData from '../../../hocs/withThemeData'
import withAuthData from '../../../hocs/withAuthData'

export default compose(
  withAuthData(),
  withThemeData(),
)(ShowQrForExportModal)
