// @flow
import { compose } from 'recompose'

import ReleaseNotesModal from './ReleaseNotesModal'
import withSettingsContext from '../../../hocs/withSettingsContext'

export default compose(withSettingsContext(ReleaseNotesModal))
