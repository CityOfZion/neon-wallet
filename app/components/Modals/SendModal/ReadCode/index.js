import { compose } from 'recompose'

import ReadCode from './ReadCode'
import withCameraAvailability from '../../../../hocs/withCameraAvailability'

export default compose(withCameraAvailability)(ReadCode)
