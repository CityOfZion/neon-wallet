import { Fragment } from 'react'
import { TbChevronRight } from 'react-icons/tb'
import { NftResponse } from '@cityofzion/blockchain-service'
import { BlockchainIcon } from '@renderer/components/BlockchainIcon'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

import { TNftResponseWithAccount } from './NftViewer'

type TNftListProps = {
  onNftSelected: (nft: NftResponse) => void
  nftsWithAccount: TNftResponseWithAccount[]
}

export const NftList = ({ onNftSelected, nftsWithAccount }: TNftListProps) => {
  return (
    <Fragment>
      {nftsWithAccount.map((nftWithAccount, index) =>
        nftWithAccount.nfts.map((nft, index2) => {
          return (
            <button
              key={(index + 1) * (index2 + nftWithAccount.nfts.length)}
              className={StyleHelper.mergeStyles(
                'h-[4.7rem] flex bg-gray-700/60 rounded-md mb-1 items-center hover:bg-gray-300/30'
              )}
              onClick={() => {
                onNftSelected(nft)
              }}
            >
              <div className="w-24 flex items-center">
                <img className="w-20 h-14 object-cover pl-2" src={nft.image} />
              </div>
              <div className="flex-1">
                <div className="flex flex-col">
                  <span className="mb-1 text-left">{nft.name}</span>
                  <div className="flex mt-1">
                    <div className="w-4 h-4 bg-gray-300/30 rounded-full" />
                    <span className="text-gray-300 ml-1.5">{nft.contractHash}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-24 items-end item">
                <span className="text-blue mb-1">{nft.id}</span>
                <div className="flex text-gray-300 mt-1 items-center">
                  <BlockchainIcon blockchain={nftWithAccount.account.blockchain} />
                  <span className="text-gray-300 mb-1 ml-2">{nftWithAccount.account.blockchain}</span>
                </div>
              </div>
              <TbChevronRight className="w-6 h-6 mx-5 text-gray-300" />
            </button>
          )
        })
      )}
    </Fragment>
  )
}
