import { compose } from 'recompose'

import withThemeData from '../../../hocs/withThemeData'
import BaseModal from './BaseModal'

export default compose(withThemeData())(BaseModal)
