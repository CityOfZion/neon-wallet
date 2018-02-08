// @flow
import { compose } from 'recompose'
import { withActions, type Actions } from 'spunky'

import NetworkSwitch from './NetworkSwitch'
import networkActions from '../../../../actions/networkActions'
import withNetworkData from '../../../../hocs/withNetworkData'

const mapActionsToProps = (actions: Actions, props: Object): Object => ({
  onChange: (networkId) => actions.call({ networkId })
})

export default compose(
  withNetworkData(),
  withActions(networkActions, mapActionsToProps)
)(NetworkSwitch)
