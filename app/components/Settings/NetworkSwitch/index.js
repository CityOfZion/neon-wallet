// @flow
import { compose } from 'recompose'
import { withActions, type Actions } from 'spunky'

import NetworkSwitch from './NetworkSwitch'
import networkActions from '../../../actions/networkActions'
import withNetworkData from '../../../hocs/withNetworkData'

const mapActionsToProps = (actions: Actions): Object => ({
  onChange: networkId => actions.call({ networkId })
})

export default compose(
  withNetworkData(),
  withActions(networkActions, mapActionsToProps)
)(NetworkSwitch)
