import { compose } from 'recompose'

import withThemeData from '../../hocs/withThemeData'
import QrCodeScanner from './QrCodeScanner'

export default compose(withThemeData())(QrCodeScanner)
