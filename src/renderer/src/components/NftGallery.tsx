import { useMemo } from 'react'
import PhotoAlbum, { ClickHandlerProps, Photo } from 'react-photo-album'
import { NftResponse } from '@cityofzion/blockchain-service'
import { IAccountState } from '@renderer/@types/store'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

import { BlockchainIcon } from './BlockchainIcon'
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
    <PhotoAlbum
      photos={photosNfts}
      layout="masonry"
      spacing={10}
      renderColumnContainer={({ columnContainerProps, children }) => (
        <div {...columnContainerProps} className={StyleHelper.mergeStyles('gap-2', columnContainerProps.className)}>
          {children}
        </div>
      )}
      onClick={(props: ClickHandlerProps<NftPhoto>) => {
        onNftSelected(props.photo.NFT)
      }}
      renderPhoto={({ photo, renderDefaultPhoto }) => (
        <div className="p-2.5 cursor-pointer bg-gray-300/15 flex flex-col rounded-md hover:bg-gray-300/30 transition-colors gap-2.5">
          <div className="rounded overflow-hidden">{renderDefaultPhoto({ wrapped: true })}</div>

          <div className="flex gap-2 items-center">
            <BlockchainIcon blockchain={photo.Account.blockchain} type="white" className="opacity-20" />

            <span className="-mt-1">{photo.title}</span>
          </div>
        </div>
      )}
    />
  )
}
