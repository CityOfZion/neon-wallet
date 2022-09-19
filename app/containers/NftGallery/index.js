// @flow
import { compose } from 'recompose'

import { withCall, withData, withActions } from 'spunky'

import withLoadingProp from '../../hocs/withLoadingProp'

import News from './NftGallery'

import withAuthData from '../../hocs/withAuthData'
import newsActions from '../../actions/nftGalleryActions'
import withNetworkData from '../../hocs/withNetworkData'

const mapNFTGalleryActionsToProps = actions => ({
  fetchAddtionalNFTData: (address, page, results) =>
    actions.call({ address, page, previousResults: results }),
})

export default compose(
  withCall(newsActions),
  withData(newsActions),
  withLoadingProp(newsActions),
  withActions(newsActions, mapNFTGalleryActionsToProps),
  withAuthData(),
  withNetworkData(),
)(News)

// const mapDispatchToProps = (dispatch: Function) =>
//   bindActionCreators(
//     {
//       sendTransaction,
//       showReceiveModal: props =>
//         dispatch(showModal(MODAL_TYPES.RECEIVE, props)),
//     },
//     dispatch,
//   )

// bindActionCreators(actionCreators, dispatch)

// const mapContactActionsToProps = actions => ({
//   deleteContact: (name, chain) => actions.call({ name, chain }),
// })

// export default compose(
//   connect(
//     null,
//     mapDispatchToProps,
//   ),
//   withRouter,
//   withChainData(),
//   withActions(deleteContactActions, mapContactActionsToProps),
//   withFailureNotification(deleteContactActions),
//   injectIntl,
// )(ContactsPanel)
