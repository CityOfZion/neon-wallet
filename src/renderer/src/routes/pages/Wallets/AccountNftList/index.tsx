import { Fragment, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdFormatListBulleted, MdGridView } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { IconButton } from '@renderer/components/IconButton'
import { Loader } from '@renderer/components/Loader'
import { NftGallery } from '@renderer/components/NftGallery'
import { NftList } from '@renderer/components/NftList'
import { useAccountsSelector } from '@renderer/hooks/useAccountSelector'
import { useNfts } from '@renderer/hooks/useNfts'
import { AccountDetailsLayout } from '@renderer/layouts/AccountDetailsLayout'

enum ENftViewOption {
  LIST,
  GALLERY,
}

export const AccountNftList = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'wallets.accountNftList' })
  const { address } = useParams()
  const { accounts } = useAccountsSelector()

  const account = useMemo(() => accounts.find(account => account.address === address)!, [accounts, address])

  const { aggregatedData, isLoading } = useNfts(account)

  const [selectedViewOption, setSelectedViewOption] = useState(ENftViewOption.LIST)

  return (
    <AccountDetailsLayout title={t('title')}>
      <div className="w-full flex flex-col flex-grow text-xs min-h-0 gap-2">
        {isLoading ? (
          <div className="flex flex-grow items-center">
            <Loader className="mt-5" />
          </div>
        ) : (
          <Fragment>
            <div className="flex items-center justify-start gap-1 my-5">
              <IconButton
                aria-selected={selectedViewOption === ENftViewOption.LIST}
                icon={<MdFormatListBulleted />}
                colorSchema={selectedViewOption === ENftViewOption.LIST ? 'neon' : 'gray'}
                onClick={() => setSelectedViewOption(ENftViewOption.LIST)}
                size="md"
              />

              <IconButton
                aria-selected={selectedViewOption === ENftViewOption.GALLERY}
                icon={<MdGridView />}
                colorSchema={selectedViewOption === ENftViewOption.GALLERY ? 'neon' : 'gray'}
                onClick={() => setSelectedViewOption(ENftViewOption.GALLERY)}
                size="md"
              />

              <p className="text-gray-300 text-sm ml-2">{t('total', { length: aggregatedData.length })}</p>
            </div>

            <div className="overflow-y-auto w-full flex flex-col flex-grow min-h-0">
              {aggregatedData.length === 0 ? (
                <div className="flex justify-center mt-4">
                  <p className="text-gray-300">{t('empty')}</p>
                </div>
              ) : selectedViewOption === ENftViewOption.LIST ? (
                <NftList nfts={aggregatedData} account={account} />
              ) : (
                <NftGallery nfts={aggregatedData} account={account} />
              )}
            </div>
          </Fragment>
        )}
      </div>
    </AccountDetailsLayout>
  )
}
