import { useMemo } from 'react'
import PhotoAlbum from 'react-photo-album'
import { NftResponse } from '@cityofzion/blockchain-service'
import { IAccountState } from '@renderer/@types/store'
import { DoraHelper } from '@renderer/helpers/DoraHelper'
import { StyleHelper } from '@renderer/helpers/StyleHelper'
import { useNetworkTypeSelector } from '@renderer/hooks/useSettingsSelector'

import { BlockchainIcon } from './BlockchainIcon'

type TProps = {
  nfts: NftResponse[]
  account: IAccountState
}

export const NftGallery = ({ account, nfts }: TProps) => {
  const { networkType } = useNetworkTypeSelector()
  const photos = useMemo(
    () =>
      nfts.map(nft => ({
        key: `${nft.contractHash}-${nft.id}`,
        title: nft.name,
        src: nft.image ?? '',
        width: 1,
        height: 1,
        nft,
      })),
    [nfts]
  )

  const handleClick = (nft: NftResponse) => {
    window.open(DoraHelper.buildNftUrl(nft.contractHash, nft.id, networkType), '_blank')
  }

  return (
    <PhotoAlbum
      photos={photos}
      layout="masonry"
      spacing={6}
      columns={5}
      renderColumnContainer={({ columnContainerProps, children }) => (
        <div {...columnContainerProps} className={StyleHelper.mergeStyles('gap-1.5', columnContainerProps.className)}>
          {children}
        </div>
      )}
      renderPhoto={({ photo, renderDefaultPhoto }) => (
        <div
          className="p-2.5 cursor-pointer bg-gray-300/15 flex flex-col rounded-md hover:bg-gray-300/30 transition-colors gap-2"
          onClick={handleClick.bind(null, photo.nft)}
        >
          <div className="rounded overflow-hidden bg-gray-300/30">{renderDefaultPhoto({ wrapped: true })}</div>

          <div className="flex gap-2.5 items-center">
            <BlockchainIcon blockchain={account.blockchain} type="gray" className="opacity-60 w-3 h-3 ml-0.5" />

            <span className="text-xs capitalize truncate w-20 2xl:w-36">{photo.title}</span>
          </div>

          <div className="flex gap-2 items-center">
            <div className="min-w-[1rem] w-[1rem] min-h-[1rem] h-[1rem] bg-gray-300/30 rounded-full overflow-hidden">
              <img className="w-full h-full object-cover" src={photo.nft.collectionImage} />
            </div>

            <span className="text-xs capitalize text-blue truncate w-20 2xl:w-32">{photo.nft.id}</span>
          </div>
        </div>
      )}
    />
  )
}
