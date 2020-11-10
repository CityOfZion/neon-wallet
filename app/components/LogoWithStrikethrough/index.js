import { compose } from 'recompose'

import LogoWithStrikethrough from './LogoWithStrikethrough'
import withThemeData from '../../hocs/withThemeData'

export default compose(withThemeData())(LogoWithStrikethrough)
