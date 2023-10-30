// @flow
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withData, withActions } from 'spunky'

import withLoadingProp from '../../hocs/withLoadingProp'

import NftGallery from './NftGallery'

import withAuthData from '../../hocs/withAuthData'
import nftGalleryActions from '../../actions/nftGalleryActions'
import withNetworkData from '../../hocs/withNetworkData'
import { showModal } from '../../modules/modal'
import { showSuccessNotification } from '../../modules/notifications'
import withSuccessNotification from '../../hocs/withSuccessNotification'

const mapNFTGalleryActionsToProps = actions => ({
  fetchAddtionalNFTData: (address, results, cursor) =>
    actions.call({ address, cursor, previousResults: results }),
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
    nftGalleryActions,
    'notifications.success.receivedBlockchainInfo',
    {},
    true,
  ),
)(NftGallery)
