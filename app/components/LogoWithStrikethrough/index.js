import { compose } from 'recompose'

import LogoWithStrikethrough from './LogoWithStrikethrough'
import withSettingsContext from '../../hocs/withSettingsContext'

export default compose(withSettingsContext(LogoWithStrikethrough))
