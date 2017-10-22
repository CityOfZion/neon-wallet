// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Claim from './Claim'
import { setClaimRequest, doGasClaim, doClaimNotify } from '../../modules/claim'

const mapStateToProps = (state: Object) => ({
  claimAmount: state.claim.claimAmount,
  claimRequest: state.claim.claimRequest,
  claimWasUpdated: state.claim.claimWasUpdated,
  disableClaimButton: state.claim.disableClaimButton,
  wif: state.account.wif,
  address: state.account.address,
  net: state.metadata.network,
  neo: state.wallet.Neo
})

const actionCreators = {
  setClaimRequest,
  doGasClaim,
  doClaimNotify
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Claim)
