// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  setClaimRequest,
  doGasClaim,
  doClaimNotify,
  getClaimAmount,
  getClaimRequest,
  getClaimWasUpdated,
  getDisableClaimButton
} from '../../modules/claim'

import Claim from './Claim'

const mapStateToProps = (state: Object) => ({
  claimAmount: getClaimAmount(state),
  claimRequest: getClaimRequest(state),
  claimWasUpdated: getClaimWasUpdated(state),
  disableClaimButton: getDisableClaimButton(state)
})

const actionCreators = {
  setClaimRequest,
  doGasClaim,
  doClaimNotify
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Claim)
