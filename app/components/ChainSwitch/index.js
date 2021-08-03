import { compose } from 'recompose'

import withThemeData from '../../hocs/withThemeData'
import ChainSwitch from './ChainSwitch'

export default compose(withThemeData())(ChainSwitch)
