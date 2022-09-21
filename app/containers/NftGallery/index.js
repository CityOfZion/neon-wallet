// @flow
import { compose } from 'recompose'

import { withCall, withData, withActions } from 'spunky'

import withLoadingProp from '../../hocs/withLoadingProp'

import NftGallery from './NftGallery'

import withAuthData from '../../hocs/withAuthData'
import nftGalleryActions from '../../actions/nftGalleryActions'
import withNetworkData from '../../hocs/withNetworkData'
import withThemeData from '../../hocs/withThemeData'
import { showModal } from '../../modules/modal'

const mapNFTGalleryActionsToProps = actions => ({
  fetchAddtionalNFTData: (address, page, results) =>
    actions.call({ address, page, previousResults: results }),
  showModal,
})

export default compose(
  withData(nftGalleryActions),
  withLoadingProp(nftGalleryActions),
  withActions(nftGalleryActions, mapNFTGalleryActionsToProps),
  withAuthData(),
  withNetworkData(),
  withCall(nftGalleryActions),
)(NftGallery)
