// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'

import Claim from './Claim'
import claimsActions from '../../actions/claimsActions'
import withData from '../../hocs/api/withData'
import {
  setClaimRequest,
  doGasClaim,
  doClaimNotify,
  getClaimRequest,
  getDisableClaimButton,
  getFinalizeClaim,
  checkClaimStatus
} from '../../modules/claim'

const mapStateToProps = (state: Object) => ({
  finalizeClaim: getFinalizeClaim(state),
  claimRequest: getClaimRequest(state),
  disableClaimButton: getDisableClaimButton(state)
})

const actionCreators = {
  setClaimRequest,
  doGasClaim,
  doClaimNotify,
  checkClaimStatus
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

const mapClaimsDataToProps = (claims) => ({
  claimAmount: claims.total
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withData(claimsActions, mapClaimsDataToProps)
)(Claim)
