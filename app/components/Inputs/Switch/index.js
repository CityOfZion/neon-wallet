import { compose } from 'recompose'

import NeonSwitch from './Switch'
import withSettingsContext from '../../../hocs/withSettingsContext'

export default compose(withSettingsContext(NeonSwitch))
