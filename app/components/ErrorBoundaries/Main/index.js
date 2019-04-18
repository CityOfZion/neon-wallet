// @flow
import { compose } from 'recompose'
import { withActions } from 'spunky'

import Main from './Main'
import withThemeData from '../../../hocs/withThemeData'
import { logoutActions } from '../../../actions/authActions'

type Props = {
  logout: Function,
}

const mapActionsToProps = (actions): Props => ({
  logout: () => actions.call(),
})

export default compose(
  withActions(logoutActions, mapActionsToProps),
  withThemeData(),
)(Main)
