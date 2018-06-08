// @flow
import { get } from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { withData } from 'spunky'

import Claim from './Claim'
import claimsActions from '../../actions/claimsActions'
import { doGasClaim, getDisableClaimButton } from '../../modules/claim'

const mapStateToProps = (state: Object) => ({
  disableClaimButton: getDisableClaimButton(state)
})

const mapDispatchToProps = (dispatch) => bindActionCreators({ doGasClaim }, dispatch)

const mapClaimsDataToProps = (claims: { total: ?string }): { claimAmount: ?string} => ({
  claimAmount: get(claims, 'total', null)
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withData(claimsActions, mapClaimsDataToProps)
)(Claim)
