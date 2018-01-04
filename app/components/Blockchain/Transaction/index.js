// @flow
import { connect } from 'react-redux'

import Transaction from './Transaction'
import { getBlockExplorer, getNetwork } from '../../../modules/metadata'

const mapStateToProps = (state: Object) => ({
  net: getNetwork(state),
  explorer: getBlockExplorer(state)
})

export default connect(mapStateToProps, () => ({}))(Transaction)
