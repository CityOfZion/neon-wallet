import { useCallback, useEffect, useState } from 'react'
import { MdFormatListBulleted, MdGridView } from 'react-icons/md'
import { hasNft, NftResponse } from '@cityofzion/blockchain-service'
import { IAccountState } from '@renderer/@types/store'
import { DoraHelper } from '@renderer/helpers/DoraHelper'
import { StyleHelper } from '@renderer/helpers/StyleHelper'
import { useBsAggregatorSelector } from '@renderer/hooks/useBlockchainSelector'

import { IconButton } from '../IconButton'

import { NftGallery } from './NftGallery'
import { NftList } from './NftList'

type TNftViewerProps = {
  accounts: IAccountState[]
}

export type TNftResponseWithAccount = {
  account: IAccountState
  nfts: NftResponse[]
}

enum ENftViewOption {
  LIST,
  GALLERY,
}

export const NftViewer = ({ accounts }: TNftViewerProps) => {
  const { bsAggregator } = useBsAggregatorSelector()
  const [nftsWithAccount, setNftsWithAccount] = useState<TNftResponseWithAccount[]>([])
  const [selectedViewOption, setSelectedViewOption] = useState(ENftViewOption.LIST)

  const showNFT = (hash: string, id: string) => {
    window.open(DoraHelper.buildNftUrl(hash, id), '_blank')
  }

  const handleLoadNFTS = useCallback(async () => {
    setNftsWithAccount([])
    accounts.forEach(async (account: IAccountState) => {
      const blockchainService = bsAggregator.blockchainServicesByName[account.blockchain]

      if (hasNft(blockchainService)) {
        const response = await blockchainService.nftDataService.getNftsByAddress({
          address: account.address,
        })

        setNftsWithAccount(prevState => [...prevState, { account, nfts: response.items }])
      }
    })
  }, [accounts, bsAggregator.blockchainServicesByName])

  useEffect(() => {
    handleLoadNFTS()
  }, [handleLoadNFTS])

  return (
    <section className="w-full overflow-y-auto flex flex-col basis-0 flex-grow text-xs">
      <div className="flex justify-end">
        <div className="flex flex-row items-end pb-2">
          <IconButton
            icon={
              <MdFormatListBulleted
                className={StyleHelper.mergeStyles({
                  'text-neon': selectedViewOption !== ENftViewOption.LIST,
                })}
              />
            }
            onClick={() => setSelectedViewOption(ENftViewOption.LIST)}
            size="md"
            activated={selectedViewOption === ENftViewOption.LIST}
          />
          <IconButton
            icon={
              <MdGridView
                className={StyleHelper.mergeStyles({
                  'text-neon': selectedViewOption !== ENftViewOption.GALLERY,
                })}
              />
            }
            onClick={() => setSelectedViewOption(ENftViewOption.GALLERY)}
            size="md"
            activated={selectedViewOption === ENftViewOption.GALLERY}
          />
        </div>
      </div>
      {selectedViewOption === ENftViewOption.LIST && (
        <NftList
          nftsWithAccount={nftsWithAccount}
          onNftSelected={nft => {
            showNFT(nft.contractHash, nft.id)
          }}
        />
      )}
      {selectedViewOption === ENftViewOption.GALLERY && (
        <NftGallery
          nftsWithAccount={nftsWithAccount}
          onNftSelected={nft => {
            showNFT(nft.contractHash, nft.id)
          }}
        />
      )}
    </section>
  )
}
