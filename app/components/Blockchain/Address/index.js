// @flow
import { connect } from 'react-redux'

import Address from './Address'
import { getBlockExplorer, getNetworkId } from '../../../modules/metadata'

const mapStateToProps = (state: Object) => ({
  networkId: getNetworkId(state),
  explorer: getBlockExplorer(state)
})

export default connect(mapStateToProps, () => ({}))(Address)
