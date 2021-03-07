import { compose } from 'recompose'

import withThemeData from '../../hocs/withThemeData'
import Mobile from './Mobile'

export default compose(withThemeData())(Mobile)
