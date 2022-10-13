// @flow
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withCall, withData, withActions } from 'spunky'

import withLoadingProp from '../../hocs/withLoadingProp'

import NftGallery from './NftGallery'

import withAuthData from '../../hocs/withAuthData'
import nftGalleryActions from '../../actions/nftGalleryActions'
import withNetworkData from '../../hocs/withNetworkData'
import { showModal } from '../../modules/modal'
import { showSuccessNotification } from '../../modules/notifications'
import withSuccessNotification from '../../hocs/withSuccessNotification'
import dashboardActions from '../../actions/dashboardActions'

const mapNFTGalleryActionsToProps = actions => ({
  fetchAddtionalNFTData: (address, page, results) =>
    actions.call({ address, page, previousResults: results }),
  showModal,
  showSuccessNotification,
})

export default compose(
  connect(
    null,
    null,
  ),
  withData(nftGalleryActions),
  withLoadingProp(nftGalleryActions),
  withActions(nftGalleryActions, mapNFTGalleryActionsToProps),
  withAuthData(),
  withNetworkData(),
  withSuccessNotification(
    dashboardActions,
    'notifications.success.receivedBlockchainInfo',
    {},
    true,
  ),
)(NftGallery)
