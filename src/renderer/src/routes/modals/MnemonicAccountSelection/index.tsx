import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { TbFileImport, TbLoader2 } from 'react-icons/tb'
import { AccountWithDerivationPath } from '@cityofzion/blockchain-service'
import { TAccountsToImport, TBlockchainServiceKey } from '@renderer/@types/blockchain'
import { AccountSelection } from '@renderer/components/AccountSelection'
import { Button } from '@renderer/components/Button'
import { useActions } from '@renderer/hooks/useActions'
import { useBlockchainActions } from '@renderer/hooks/useBlockchainActions'
import { useBsAggregatorSelector } from '@renderer/hooks/useBlockchainSelector'
import { useModalLocation, useModalNavigate } from '@renderer/hooks/useModalRouter'
import { useMount } from '@renderer/hooks/useMount'
import { useAppSelector } from '@renderer/hooks/useRedux'
import { ModalLayout } from '@renderer/layouts/Modal'

type TLocation = {
  mnemonic: string
}

type TActionsData = {
  mnemonicAccounts: Map<TBlockchainServiceKey, AccountWithDerivationPath[]>
  selectedAccounts: TAccountWithBlockchain[]
}

type TAccountWithBlockchain = AccountWithDerivationPath & { blockchain: TBlockchainServiceKey }

export const MnemonicAccountSelectionModal = () => {
  const {
    state: { mnemonic },
  } = useModalLocation<TLocation>()
  const blockchainActions = useBlockchainActions()
  const { t: blockchainT } = useTranslation('common', { keyPrefix: 'wallet' })
  const { modalNavigate } = useModalNavigate()
  const { t } = useTranslation('modals', { keyPrefix: 'mnemonicAccountSelection' })
  const { bsAggregatorRef } = useBsAggregatorSelector()
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
      name: blockchainT('mnemonicWalletName'),
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
  }

  const { isMounting } = useMount(async () => {
    const mnemonicAccounts = await bsAggregatorRef.current.generateAccountFromMnemonicAllBlockchains(
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
  }, [bsAggregatorRef, mnemonic])

  return (
    <ModalLayout
      heading={t('title')}
      withBackButton
      headingIcon={<TbFileImport />}
      headingIconFilled={false}
      contentClassName="flex flex-col"
    >
      <p className="text-sm mr-">{t('description')}</p>

      <div className="flex flex-col gap-y-2.5 mt-6 flex-grow">
        {isMounting ? (
          <div className="flex w-full justify-center">
            <TbLoader2 className="w-6 h-6 animate-spin" />
          </div>
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
        leftIconFilled={false}
        loading={actionState.isActing}
        disabled={actionData.selectedAccounts.length === 0}
        flat
      />
    </ModalLayout>
  )
}
