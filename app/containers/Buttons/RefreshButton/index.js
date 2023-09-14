// @flow
import { compose } from 'recompose'
import { withActions } from 'spunky'
import RefreshButton from './RefreshButton'

// import accountActions from '../../../actions/accountActions'
import withAuthData from '../../../hocs/withAuthData'
import withNetworkData from '../../../hocs/withNetworkData'

// const mapAccountActionsToProps = (actions, props) => ({
//   loadWalletData: () =>
//     actions.call({
//       net: props.net,
//       address: props.address,
//       tokens: props.tokens,
//     }),
// })

export default compose(
  withAuthData,
  withNetworkData(),
  // withActions(accountActions, mapAccountActionsToProps),
)(RefreshButton)
