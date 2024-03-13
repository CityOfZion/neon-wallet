import { Fragment, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Location, useLocation, useNavigate } from 'react-router-dom'
import { TAccountsToImport, TWalletToCreate } from '@renderer/@types/blockchain'
import { TUseImportActionInputType } from '@renderer/@types/hooks'
import { ReactComponent as NeonWalletLogo } from '@renderer/assets/images/neon-wallet-compact.svg'
import { Progress } from '@renderer/components/Progress'
import { ToastHelper } from '@renderer/helpers/ToastHelper'
import { UtilsHelper } from '@renderer/helpers/UtilsHelper'
import { useBsAggregator } from '@renderer/hooks/useBsAggregator'

type TLocationState = {
  input: string
  inputType: TUseImportActionInputType
}

type TGetAccountToImportByInputType = {
  accountsToImport: TAccountsToImport
  walletToImport: TWalletToCreate
}

export const WelcomeImportWalletStep2Page = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'welcomeImportWallet.step2' })
  const { t: commonT } = useTranslation('common', { keyPrefix: 'wallet' })
  const { state } = useLocation() as Location<TLocationState>
  const navigate = useNavigate()
  const { bsAggregator } = useBsAggregator()

  const isImporting = useRef(false)

  const [progress, setProgress] = useState(0)

  const importAddress = async (address: string): Promise<TGetAccountToImportByInputType> => {
    const blockchainService = bsAggregator.getBlockchainByAddress(address)
    if (!blockchainService) throw new Error(t('canNotFindBlockchainError'))

    return {
      accountsToImport: [
        {
          address: address,
          blockchain: blockchainService.blockchainName,
          type: 'watch',
        },
      ],
      walletToImport: {
        name: commonT('watchAccount'),
        walletType: 'watch',
      },
    }
  }

  const importKey = async (key: string): Promise<TGetAccountToImportByInputType> => {
    const accountsToImport: TAccountsToImport = []

    await UtilsHelper.promiseAll(bsAggregator.blockchainServices, async service => {
      const account = service.generateAccountFromKey(key)
      accountsToImport.push({ address: account.address, blockchain: service.blockchainName, key, type: 'legacy' })
    })

    return {
      accountsToImport,
      walletToImport: {
        name: commonT('encryptedName'),
        walletType: 'legacy',
      },
    }
  }

  const importMnemonic = async (mnemonic: string): Promise<TGetAccountToImportByInputType> => {
    const mnemonicAccounts = await bsAggregator.generateAccountFromMnemonicAllBlockchains(mnemonic)

    const accountsToImport = Array.from(mnemonicAccounts.entries())
      .map<TAccountsToImport>(([blockchain, accounts]) => {
        return accounts.map(account => ({
          address: account.address,
          blockchain,
          key: account.key,
          type: 'standard',
        }))
      })
      .flat()

    return {
      accountsToImport,
      walletToImport: {
        name: commonT('mnemonicWalletName'),
        walletType: 'standard',
        mnemonic,
      },
    }
  }

  const importEncryptedKey = async (): Promise<TGetAccountToImportByInputType> => {
    throw new Error(t('encryptedKeyIsNotSupported'))
  }

  const handleImport = async () => {
    try {
      await UtilsHelper.sleep(1000)
      setProgress(33)

      const importByInputType: Record<
        TUseImportActionInputType,
        (input: string) => Promise<TGetAccountToImportByInputType>
      > = {
        address: importAddress,
        key: importKey,
        mnemonic: importMnemonic,
        encrypted: importEncryptedKey,
      }

      await UtilsHelper.sleep(1000)
      setProgress(66)

      const importInfo = await importByInputType[state.inputType](state.input)

      setProgress(100)
      await UtilsHelper.sleep(1000)

      navigate('/welcome-import-wallet/3', { replace: true, state: importInfo })
    } catch (error: any) {
      ToastHelper.error({ message: error.message, id: 'welcome-import-wallet-error' })
      navigate(-1)
    }
  }

  useEffect(() => {
    if (isImporting.current) return
    isImporting.current = true

    handleImport()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Fragment>
      <p className="text-sm text-white mt-15">{t('title')}</p>

      <Progress value={progress} className="mt-7" />

      <NeonWalletLogo className="w-[13.75rem] h-[12.5rem] fill-gray-700/30 absolute -bottom-11 -left-11" />
    </Fragment>
  )
}
