// @flow
import { compose } from 'recompose'

import ReleaseNotesModal from './ReleaseNotesModal'
import withThemeData from '../../../hocs/withThemeData'

export default compose(withThemeData())(ReleaseNotesModal)
