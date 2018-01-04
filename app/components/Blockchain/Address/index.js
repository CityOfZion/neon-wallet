// @flow
import { connect } from 'react-redux'

import Address from './Address'
import { getBlockExplorer, getNetwork } from '../../../modules/metadata'

const mapStateToProps = (state: Object) => ({
  net: getNetwork(state),
  explorer: getBlockExplorer(state)
})

export default connect(mapStateToProps, () => ({}))(Address)
