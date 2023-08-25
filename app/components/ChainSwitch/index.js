import { compose } from 'recompose'

import ChainSwitch from './ChainSwitch'
import withSettingsContext from '../../hocs/withSettingsContext'

export default compose(withSettingsContext(ChainSwitch))
