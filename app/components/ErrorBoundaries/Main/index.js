// @flow
import { compose } from 'recompose'
import { withActions } from 'spunky'

import Main from './Main'
import { logoutActions } from '../../../actions/authActions'
import withSettingsContext from '../../../hocs/withSettingsContext'

type Props = {
  logout: Function,
}

const mapActionsToProps = (actions): Props => ({
  logout: () => actions.call(),
})

export default compose(withActions(logoutActions, mapActionsToProps))(
  withSettingsContext(Main),
)
