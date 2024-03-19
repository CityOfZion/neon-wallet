import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { TbFileImport } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { AccountWithDerivationPath } from '@cityofzion/blockchain-service'
import { TAccountsToImport, TBlockchainServiceKey } from '@renderer/@types/blockchain'
import { AccountSelection } from '@renderer/components/AccountSelection'
import { Button } from '@renderer/components/Button'
import { Loader } from '@renderer/components/Loader'
import { useActions } from '@renderer/hooks/useActions'
import { useBlockchainActions } from '@renderer/hooks/useBlockchainActions'
import { useBsAggregator } from '@renderer/hooks/useBsAggregator'
import { useModalNavigate, useModalState } from '@renderer/hooks/useModalRouter'
import { useMount } from '@renderer/hooks/useMount'
import { useAppSelector } from '@renderer/hooks/useRedux'
import { EndModalLayout } from '@renderer/layouts/EndModal'

type TLocation = {
  mnemonic: string
}

type TActionsData = {
  mnemonicAccounts: Map<TBlockchainServiceKey, AccountWithDerivationPath[]>
  selectedAccounts: TAccountWithBlockchain[]
}

type TAccountWithBlockchain = AccountWithDerivationPath & { blockchain: TBlockchainServiceKey }

export const ImportMnemonicAccountsSelectionModal = () => {
  const { mnemonic } = useModalState<TLocation>()
  const blockchainActions = useBlockchainActions()
  const { t: commonT } = useTranslation('common', { keyPrefix: 'wallet' })
  const { modalNavigate } = useModalNavigate()
  const navigate = useNavigate()
  const { t } = useTranslation('modals', { keyPrefix: 'importMnemonicAccountsSelection' })
  const { bsAggregator } = useBsAggregator()
  const { ref: allAccountsRef } = useAppSelector(state => state.account.data.map(it => it.address))

  const { actionData, setData, actionState, handleAct } = useActions<TActionsData>({
    mnemonicAccounts: new Map(),
    selectedAccounts: [],
  })

  const handleChecked = (checked: boolean, account: TAccountWithBlockchain) => {
    setData(({ selectedAccounts }) => ({
      selectedAccounts: checked
        ? [...selectedAccounts, account]
        : selectedAccounts.filter(it => it.address !== account.address),
    }))
  }

  const handleImport = async (data: TActionsData) => {
    const wallet = await blockchainActions.createWallet({
      name: commonT('mnemonicWalletName'),
      walletType: 'standard',
      mnemonic,
    })

    const accountsToImport: TAccountsToImport = data.selectedAccounts.map(({ address, blockchain, key }) => ({
      address,
      blockchain,
      key,
      type: 'standard',
    }))

    await blockchainActions.importAccounts({
      accounts: accountsToImport,
      wallet,
    })

    modalNavigate(-2)
    navigate('/wallets', { state: { wallet } })
  }

  const { isMounting } = useMount(async () => {
    const mnemonicAccounts = await bsAggregator.generateAccountFromMnemonicAllBlockchains(
      mnemonic,
      allAccountsRef.current
    )
    const selectedAccounts = Array.from(mnemonicAccounts.entries())
      .map(([blockchain, accounts]) => {
        return accounts.map(account => ({ ...account, blockchain }))
      })
      .flat()

    setData({
      mnemonicAccounts,
      selectedAccounts,
    })
  }, [bsAggregator, mnemonic])

  return (
    <EndModalLayout
      heading={t('title')}
      withBackButton
      headingIcon={<TbFileImport />}
      contentClassName="flex flex-col min-h-0"
    >
      <p className="text-sm mr-">{t('description')}</p>

      <div className="flex flex-col gap-y-2.5 mt-6 flex-grow min-h-0 overflow-y-auto mb-3">
        {isMounting ? (
          <Loader />
        ) : actionData.selectedAccounts.length > 0 ? (
          Array.from(actionData.mnemonicAccounts.entries()).map(([blockchain, accounts]) => (
            <Fragment key={blockchain}>
              {accounts.length > 0 && (
                <AccountSelection.Root blockchain={blockchain}>
                  {accounts.map(it => (
                    <AccountSelection.Item
                      key={it.address}
                      address={it.address}
                      label={it.derivationPath}
                      onCheckedChange={checked => handleChecked(checked, { ...it, blockchain })}
                    />
                  ))}
                </AccountSelection.Root>
              )}
            </Fragment>
          ))
        ) : (
          <p className="w-full text-center text-xs text-gray-100">{t('noAccountsToImport')}</p>
        )}
      </div>

      <Button
        className="w-full"
        type="button"
        onClick={handleAct(handleImport)}
        label={t('importButtonLabel')}
        leftIcon={<TbFileImport />}
        loading={actionState.isActing}
        disabled={actionData.selectedAccounts.length === 0}
        flat
      />
    </EndModalLayout>
  )
}
