// @flow
import { compose } from 'recompose'

import { withCall, withData, withActions } from 'spunky'

import withLoadingProp from '../../hocs/withLoadingProp'

import NftGallery from './NftGallery'

import withAuthData from '../../hocs/withAuthData'
import nftGalleryActions from '../../actions/nftGalleryActions'
import withNetworkData from '../../hocs/withNetworkData'
import withThemeData from '../../hocs/withThemeData'

const mapNFTGalleryActionsToProps = actions => ({
  fetchAddtionalNFTData: (address, page, results) =>
    actions.call({ address, page, previousResults: results }),
})

export default compose(
  withCall(nftGalleryActions),
  withData(nftGalleryActions),
  withLoadingProp(nftGalleryActions),
  withActions(nftGalleryActions, mapNFTGalleryActionsToProps),
  withAuthData(),
  withNetworkData(),
  withThemeData(),
)(NftGallery)
