// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { injectIntl } from 'react-intl'

import Claim from './Claim'
// import claimsActions from '../../actions/claimsActions'
import { doGasClaim, getDisableClaimButton } from '../../modules/claim'
import withAuthData from '../../hocs/withAuthData'
import withBalancesData from '../../hocs/withBalancesData'
import withSettingsContext from '../../hocs/withSettingsContext'
import withNetworkData from '../../hocs/withNetworkData'

const mapStateToProps = (state: Object) => ({
  disableClaimButton: getDisableClaimButton(state),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ doGasClaim }, dispatch)

// const mapClaimsDataToProps = claims => ({
//   claimAmount: claims?.total ?? 0,
// })

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withAuthData,
  withBalancesData(),
  withNetworkData(),
  // withData(claimsActions, mapClaimsDataToProps),
  injectIntl,
  withSettingsContext,
)(Claim)
