// @flow
import { connect, type MapStateToProps } from 'react-redux'
import { compose } from 'recompose'

import Transaction from './Transaction'
import withNetworkData from '../../../hocs/withNetworkData'
import { getBlockExplorer } from '../../../modules/metadata'

const mapStateToProps: MapStateToProps<*, *, *> = (state: Object) => ({
  explorer: getBlockExplorer(state)
})

export default compose(
  connect(mapStateToProps),
  withNetworkData()
)(Transaction)
