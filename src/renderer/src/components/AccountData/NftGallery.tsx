import { Fragment, useMemo } from 'react'
import PhotoAlbum, { ClickHandlerProps, Photo } from 'react-photo-album'
import { NftResponse } from '@cityofzion/blockchain-service'
import { IAccountState } from '@renderer/@types/store'

import { BlockchainIcon } from '../BlockchainIcon'

import { TNftResponseWithAccount } from './NftViewer'

type TNftListProps = {
  onNftSelected: (nft: NftResponse) => void
  nftsWithAccount: TNftResponseWithAccount[]
}

type NftPhoto = Photo & {
  NFT: NftResponse
  Account: IAccountState
}

export const NftGallery = ({ onNftSelected, nftsWithAccount }: TNftListProps) => {
  const photosNfts = useMemo(() => {
    const photos: NftPhoto[] = []
    nftsWithAccount.forEach((nftWithAccount, index) => {
      nftWithAccount.nfts.forEach((nft, index2) => {
        const photoNft: NftPhoto = {
          key: ((index + 1) * (index2 + nftWithAccount.nfts.length)).toString(),
          title: nft.name,
          src: nft.image ?? '',
          width: 1,
          height: 1,
          NFT: nft,
          Account: nftWithAccount.account,
        }
        photos.push(photoNft)
      })
    })
    return photos
  }, [nftsWithAccount])

  return (
    <Fragment>
      <PhotoAlbum
        photos={photosNfts}
        layout={'masonry'}
        spacing={25}
        padding={12}
        onClick={(props: ClickHandlerProps<NftPhoto>) => {
          onNftSelected(props.photo.NFT)
        }}
        renderPhoto={({ photo, renderDefaultPhoto }) => (
          <Fragment>
            <div className="mb-5 px-3 pt-3 cursor-pointer bg-gray-300/15 flex flex-col rounded hover:bg-neon/50">
              {renderDefaultPhoto({ wrapped: true })}
              <div className="flex py-3 pl-1">
                <BlockchainIcon blockchain={photo.Account.blockchain} />
                <span className="pl-2">{photo.title}</span>
              </div>
            </div>
          </Fragment>
        )}
      />
    </Fragment>
  )
}
