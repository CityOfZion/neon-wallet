// @flow
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'

import Sidebar from './Sidebar'

export default compose(
  withRouter // allow `NavLink` components to re-render when the window location changes
)(Sidebar)
