import { compose } from 'recompose'

import QrCodeScanner from './QrCodeScanner'
import withSettingsContext from '../../hocs/withSettingsContext'

export default compose(withSettingsContext(QrCodeScanner))
