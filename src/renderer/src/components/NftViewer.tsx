import { forwardRef, Fragment, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdFormatListBulleted, MdGridView } from 'react-icons/md'
import { hasNft, NftResponse } from '@cityofzion/blockchain-service'
import { IAccountState } from '@renderer/@types/store'
import { DoraHelper } from '@renderer/helpers/DoraHelper'
import { StyleHelper } from '@renderer/helpers/StyleHelper'
import { useBsAggregator } from '@renderer/hooks/useBsAggregator'
import { useNetworkTypeSelector } from '@renderer/hooks/useSettingsSelector'

import { IconButton } from './IconButton'
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

export const NftViewer = forwardRef<HTMLDivElement, TNftViewerProps>(({ accounts }, ref) => {
  const { bsAggregator } = useBsAggregator()
  const { t } = useTranslation('components', { keyPrefix: 'nftViewer' })
  const { networkType } = useNetworkTypeSelector()

  const [nftsWithAccount, setNftsWithAccount] = useState<TNftResponseWithAccount[]>([])
  const [selectedViewOption, setSelectedViewOption] = useState(ENftViewOption.LIST)

  const showNFT = (hash: string, id: string) => {
    window.open(DoraHelper.buildNftUrl(hash, id, networkType), '_blank')
  }

  const handleLoadNFTS = useCallback(async () => {
    setNftsWithAccount([])

    accounts.forEach(async (account: IAccountState) => {
      const blockchainService = bsAggregator.blockchainServicesByName[account.blockchain]

      if (hasNft(blockchainService)) {
        const response = await blockchainService.nftDataService.getNftsByAddress({
          address: account.address,
        })
        if (!response.items.length) return

        setNftsWithAccount(prevState => [...prevState, { account, nfts: response.items }])
      }
    })
  }, [accounts, bsAggregator])

  const totalNFTS = (nftsWithAccount: TNftResponseWithAccount[]) => {
    let count = 0
    nftsWithAccount.forEach(item => {
      count = count + item.nfts.length
    })
    return count
  }

  useEffect(() => {
    handleLoadNFTS()
  }, [handleLoadNFTS])

  return (
    <section className="w-full flex flex-col flex-grow text-xs min-h-0 gap-2" ref={ref}>
      <div className="flex items-center justify-start gap-1 my-5">
        <IconButton
          icon={<MdFormatListBulleted />}
          className={StyleHelper.mergeStyles({
            'text-neon': selectedViewOption !== ENftViewOption.LIST,
            'text-gray-100': selectedViewOption === ENftViewOption.LIST,
          })}
          onClick={() => setSelectedViewOption(ENftViewOption.LIST)}
          size="md"
          activated={selectedViewOption === ENftViewOption.LIST}
        />
        <IconButton
          icon={<MdGridView />}
          className={StyleHelper.mergeStyles({
            'text-neon': selectedViewOption !== ENftViewOption.GALLERY,
            'text-gray-100': selectedViewOption === ENftViewOption.GALLERY,
          })}
          onClick={() => setSelectedViewOption(ENftViewOption.GALLERY)}
          size="md"
          activated={selectedViewOption === ENftViewOption.GALLERY}
        />
        <h1 className="text-gray-300 text-sm font-normal">{`${totalNFTS(nftsWithAccount)} items`}</h1>
      </div>

      <div className="overflow-y-auto w-full flex flex-col min-h-0 pr-1">
        {nftsWithAccount.length === 0 ? (
          <div className="flex justify-center mt-4">
            <p className="text-gray-300">{t('empty')}</p>
          </div>
        ) : (
          <Fragment>
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
          </Fragment>
        )}
      </div>
    </section>
  )
})
