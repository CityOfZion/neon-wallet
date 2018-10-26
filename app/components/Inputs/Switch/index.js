import { compose } from 'recompose'

import withThemeData from '../../../hocs/withThemeData'
import NeonSwitch from './Switch'

export default compose(withThemeData())(NeonSwitch)
