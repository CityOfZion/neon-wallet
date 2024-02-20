import { useTranslation } from 'react-i18next'
import { TbChevronRight } from 'react-icons/tb'
import { NftResponse } from '@cityofzion/blockchain-service'
import { BlockchainIcon } from '@renderer/components/BlockchainIcon'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

import { TNftResponseWithAccount } from '../BlockchainDataPanel/NftViewer'

type TNftListProps = {
  onNftSelected: (nft: NftResponse) => void
  nftsWithAccount: TNftResponseWithAccount[]
}

export const NftList = ({ onNftSelected, nftsWithAccount }: TNftListProps) => {
  const { t: tCommon } = useTranslation('common', { keyPrefix: 'blockchain' })

  return (
    <ul className="flex flex-col gap-1 min-w-0">
      {nftsWithAccount.map((nftWithAccount, index) =>
        nftWithAccount.nfts.map((nft, index2) => {
          return (
            <li
              key={(index + 1) * (index2 + nftWithAccount.nfts.length)}
              className={StyleHelper.mergeStyles(
                'flex p-2.5 gap-5 bg-gray-700/60 rounded-md items-center cursor-pointer hover:bg-gray-300/30 w-full transition-colors min-w-0'
              )}
              onClick={() => {
                onNftSelected(nft)
              }}
            >
              <div className="min-w-[6rem] h-14 flex items-center rounded-md bg-neon overflow-hidden">
                <img className="w-full h-full object-cover" src={nft.image} />
              </div>

              <div className="flex flex-col gap-2 flex-grow  flex-shrink min-w-0">
                <span className="text-left truncate">{nft.name}</span>

                <div className="flex gap-1.5">
                  <div className="min-w-[1rem] min-h-[1rem] bg-gray-300/30 rounded-full" />
                  <span className="text-gray-300 truncate">{nft.contractHash}</span>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="flex flex-col items-end gap-1">
                  <span className="text-blue">{nft.id}</span>

                  <div className="flex text-gray-300 mt-1 items-center gap-2">
                    <BlockchainIcon
                      blockchain={nftWithAccount.account.blockchain}
                      type="white"
                      className="opacity-20"
                    />
                    <span className="text-gray-300 -mt-1">{tCommon(nftWithAccount.account.blockchain)}</span>
                  </div>
                </div>

                <TbChevronRight className="w-6 h-6 text-gray-300" />
              </div>
            </li>
          )
        })
      )}
    </ul>
  )
}
