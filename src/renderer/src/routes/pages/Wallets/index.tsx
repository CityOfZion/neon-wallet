import { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdAdd, MdMoreVert } from 'react-icons/md'
import { MdContentCopy } from 'react-icons/md'
import {
  TbChevronRight,
  TbEyePlus,
  TbFileImport,
  TbMenuDeep,
  TbPencil,
  TbPlug,
  TbRefresh,
  TbRepeat,
} from 'react-icons/tb'
import InfiniteScroll from 'react-infinite-scroll-component'
import { TransactionResponse } from '@cityofzion/blockchain-service'
import { EStatus } from '@cityofzion/wallet-connect-sdk-wallet-core'
import { useWalletConnectWallet } from '@cityofzion/wallet-connect-sdk-wallet-react'
import { IAccountState, IWalletState } from '@renderer/@types/store'
import { ActionPopover } from '@renderer/components/ActionPopover'
import { Button } from '@renderer/components/Button'
import { IconButton } from '@renderer/components/IconButton'
import { PopOver } from '@renderer/components/PopOver'
import { Separator } from '@renderer/components/Separator'
import { WalletCard } from '@renderer/components/WalletCard'
import { WalletSelect } from '@renderer/components/WalletSelect'
import { DateHelper } from '@renderer/helpers/DateHelper'
import { StyleHelper } from '@renderer/helpers/StyleHelper'
import { useAccountsSelector } from '@renderer/hooks/useAccountSelector'
import { useBalancesAndExchange } from '@renderer/hooks/useBalancesAndExchange'
import { useBsAggregatorSelector } from '@renderer/hooks/useBlockchainSelector'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'
import { useAppDispatch } from '@renderer/hooks/useRedux'
import { useWalletsSelector } from '@renderer/hooks/useWalletSelector'
import { MainLayout } from '@renderer/layouts/Main'
import { accountReducerActions } from '@renderer/store/reducers/AccountReducer'

import { AccountList } from './AccountList'

export const WalletsPage = () => {
  const { status } = useWalletConnectWallet()
  const { t } = useTranslation('pages', { keyPrefix: 'wallets' })
  const { t: commonActivity } = useTranslation('pages', { keyPrefix: 'activity' })
  const { wallets } = useWalletsSelector()
  const { accounts } = useAccountsSelector()
  const dispatch = useAppDispatch()
  const balanceExchange = useBalancesAndExchange(accounts)
  const { modalNavigateWrapper } = useModalNavigate()
  const { bsAggregator } = useBsAggregatorSelector()

  const [selectedWallet, setSelectedWallet] = useState<IWalletState | undefined>(wallets[0])
  const [isReordering, setIsReordering] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState<IAccountState | undefined>(undefined)
  const [transactions, setTransactions] = useState<TransactionResponse[]>([])

  const handleReorderSave = (accountsOrder: string[]) => {
    dispatch(accountReducerActions.reorderAccounts(accountsOrder))
    setIsReordering(false)
  }

  const handleReorderCancel = () => {
    setIsReordering(false)
  }

  const handleCopyHash = async (hash: string) => {
    await navigator.clipboard.writeText(hash)
  }

  const hashToContractName = (address: string, contractHash: string): string => {
    // const contract = await bsAggregator.getBlockchainByAddress(address)?.blockchainDataService.getContract(contractHash)
    // return contract?.name ?? ''
    return address === contractHash ? 'BurgerNEO' : 'GasToken'
  }

  useEffect(() => {
    const fetchData = async () => {
      const allAccounts = accounts.filter(account => account.idWallet === selectedWallet?.id)

      if (allAccounts.length > 0) {
        const response = await bsAggregator.blockchainServicesByName[
          allAccounts[0].blockchain
        ].blockchainDataService.getTransactionsByAddress({
          address: allAccounts[0].address,
          page: 1,
        })

        setTransactions(response.transactions)
      }
    }

    fetchData()
  }, [accounts, bsAggregator.blockchainServicesByName, selectedWallet]) // Add other dependencies as needed

  useEffect(() => {
    setSelectedWallet(prev => {
      if (prev) {
        const updatedWallet = wallets.find(wallet => wallet.id === prev.id)
        if (updatedWallet) {
          return updatedWallet
        }
      }

      return wallets[0]
    })
  }, [wallets])

  useEffect(() => {
    setSelectedAccount(undefined)
  }, [selectedWallet, accounts])

  return (
    <MainLayout
      heading={
        <WalletSelect
          balanceExchange={balanceExchange}
          wallets={wallets}
          selected={selectedWallet}
          onSelect={setSelectedWallet}
          disabled={isReordering}
        />
      }
      rightComponent={
        <div className="flex gap-x-2">
          <PopOver trigger={<IconButton icon={<TbMenuDeep />} size="md" text={t('manageButtonLabel')} />}>
            {wallets.map((wallet, index) => (
              <Fragment key={index}>
                {index !== 0 && <Separator />}

                <WalletCard
                  wallet={wallet}
                  noHover
                  balanceExchange={balanceExchange}
                  rightComponent={
                    <IconButton
                      icon={<TbPencil className={'stroke-neon w-5 h-5'} />}
                      className={'ml-2 self-center '}
                      onClick={modalNavigateWrapper('edit-wallet', { state: { wallet: wallet } })}
                    />
                  }
                  className="pr-1"
                />
              </Fragment>
            ))}
          </PopOver>
          <IconButton icon={<MdAdd />} size="md" text={t('newWalletButtonLabel')} disabled />
          <IconButton
            icon={<TbFileImport />}
            size="md"
            text={t('importButtonLabel')}
            onClick={modalNavigateWrapper('import')}
          />
          <IconButton
            icon={<TbEyePlus />}
            size="md"
            text={t('addWatchAccountButtonLabel')}
            onClick={modalNavigateWrapper('add-watch')}
          />
          <IconButton
            icon={<TbPlug />}
            size="md"
            text={t('dappConnectionButtonLabel')}
            onClick={modalNavigateWrapper('dapp-connection-list')}
            disabled={status !== EStatus.STARTED}
          />
          <IconButton icon={<TbRefresh />} size="md" text={t('buttonRefreshLabel')} disabled />
        </div>
      }
      headerClassName="pb-2"
      contentClassName="flex-row gap-x-2.5"
    >
      {selectedWallet && (
        <section className="bg-gray-800 flex-grow rounded drop-shadow-lg max-w-[11.625rem] flex flex-col">
          <header className="flex justify-between pl-4 pr-2 py-3 items-center h-fit gap-x-1">
            <h2 className="text-sm truncate">{selectedWallet.name}</h2>

            <ActionPopover
              actions={[
                {
                  icon: <TbPencil />,
                  label: t('editWalletButtonLabel'),
                  onClick: modalNavigateWrapper('edit-wallet', { state: { wallet: selectedWallet } }),
                },
                {
                  icon: <TbRepeat />,
                  label: t('reorderAccountsButtonLabel'),
                  onClick: () => setIsReordering(true),
                },
              ]}
            >
              <IconButton compacted icon={<MdMoreVert />} size="md" disabled={isReordering} />
            </ActionPopover>
          </header>

          <main className="flex-grow">
            <Separator />
            <WalletCard
              onClick={() => setSelectedAccount(undefined)}
              wallet={selectedWallet}
              iconWithAccounts
              balanceExchange={balanceExchange}
              active={selectedAccount === undefined}
            />
            <AccountList
              selectedWallet={selectedWallet}
              balanceExchange={balanceExchange}
              isReordering={isReordering}
              onReorderCancel={handleReorderCancel}
              onReorderSave={handleReorderSave}
              onSelect={setSelectedAccount}
              selectedAccount={selectedAccount}
            />
          </main>

          <footer className="px-4 pb-6">
            {selectedAccount && (
              <Button
                label={t('editAccountButton')}
                variant="outlined"
                className="w-full pb-2"
                flat
                onClick={modalNavigateWrapper('edit-account', { state: { account: selectedAccount } })}
                leftIcon={<TbPencil />}
              />
            )}
            <Button
              label={t('addAccountButtonLabel')}
              variant="outlined"
              className="w-full"
              flat
              disabled
              leftIcon={<MdAdd />}
            />
          </footer>
        </section>
      )}
      <div className="flex-grow flex flex-col gap-y-5">
        <div className="w-full flex bg-gray-800 rounded flex-grow drop-shadow-lg animate-pulse"></div>
        <div className="w-full bg-gray-800 rounded flex-grow drop-shadow-lg overflow-scroll max-h-[20rem]">
          <h1 className="text-white m-4">{commonActivity('title')}</h1>
          <Separator className="mx-4" />
          <InfiniteScroll
            dataLength={transactions.length}
            next={() => {}}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            refreshFunction={() => {}}
          >
            <table className="min-w-full text-xs text-left m-4 justify-evenly">
              <thead>
                <tr className="text-gray-100 opacity-75">
                  <th className="pl-4 w-[5.5rem]">{commonActivity('date')}</th>
                  <th className="w-[4.5rem]">{commonActivity('time')}</th>
                  <th className="w-[5rem]">{commonActivity('name')}</th>
                  <th className="w-[30.5rem]">{commonActivity('hash')}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tr, index) => (
                  <tr
                    key={index}
                    className={StyleHelper.mergeStyles({
                      'bg-gray-300 bg-opacity-15': index % 2 !== 0,
                    })}
                  >
                    <td className="pl-4">{DateHelper.timeToDate(tr.time)}</td>
                    <td>{DateHelper.timeToHour(tr.time)}</td>
                    <td>{hashToContractName(tr.transfers[0].from, tr.transfers[0].contractHash)}</td>
                    <td>
                      <div className="flex items-center justify-between">
                        {tr.hash}
                        <IconButton
                          icon={<MdContentCopy className="fill-neon w-6 h-6" />}
                          onClick={() => handleCopyHash(tr.hash)}
                          type="button"
                        />
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center">
                        <span className="text-neon leading-[0.1rem]">{commonActivity('view')}</span>
                        <TbChevronRight className="w-6 h-6 text-gray-300" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </InfiniteScroll>
        </div>
      </div>
    </MainLayout>
  )
}
