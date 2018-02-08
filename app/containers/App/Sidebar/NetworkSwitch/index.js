// @flow
import { compose } from 'recompose'

import NetworkSwitch from './NetworkSwitch'
import networkActions from '../../../../actions/networkActions'
import withActions from '../../../../hocs/api/withActions'
import withNetworkData from '../../../../hocs/withNetworkData'
import { type Actions } from '../../../../values/api'

const mapActionsToProps = (actions: Actions, props: Object): Object => ({
  onChange: (networkId) => actions.request({ networkId })
})

export default compose(
  withNetworkData(),
  withActions(networkActions, mapActionsToProps)
)(NetworkSwitch)
