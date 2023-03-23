import { compose } from 'recompose'
import withSettingsContext from '../../../hocs/withSettingsContext'

import withThemeData from '../../../hocs/withThemeData'
import BaseModal from './BaseModal'

export default compose(withSettingsContext(BaseModal))
