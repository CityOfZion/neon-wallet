// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { withData } from 'spunky'
import { injectIntl } from 'react-intl'

import Claim from './Claim'
import claimsActions from '../../actions/claimsActions'
import { doGasClaim, getDisableClaimButton } from '../../modules/claim'
import withAuthData from '../../hocs/withAuthData'
import withChainData from '../../hocs/withChainData'
import withBalancesData from '../../hocs/withBalancesData'

const mapStateToProps = (state: Object) => ({
  disableClaimButton: getDisableClaimButton(state),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ doGasClaim }, dispatch)

const mapClaimsDataToProps = claims => ({
  claimAmount: claims.total,
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withAuthData(),
  withBalancesData(),
  withChainData(),
  withData(claimsActions, mapClaimsDataToProps),
  injectIntl,
)(Claim)
