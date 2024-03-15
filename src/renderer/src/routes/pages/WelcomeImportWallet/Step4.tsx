import { Fragment, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Location, useLocation, useNavigate } from 'react-router-dom'
import { TAccountsToImport } from '@renderer/@types/blockchain'
import { TUseImportActionInputType } from '@renderer/@types/hooks'
import { ReactComponent as NeonWalletLogo } from '@renderer/assets/images/neon-wallet-compact.svg'
import { Progress } from '@renderer/components/Progress'
import { ToastHelper } from '@renderer/helpers/ToastHelper'
import { UtilsHelper } from '@renderer/helpers/UtilsHelper'
import { useBlockchainActions } from '@renderer/hooks/useBlockchainActions'
import { useBsAggregator } from '@renderer/hooks/useBsAggregator'
import { useAppDispatch } from '@renderer/hooks/useRedux'
import { settingsReducerActions } from '@renderer/store/reducers/SettingsReducer'

type TLocationState = {
  input: string
  inputType: TUseImportActionInputType
  password: string
}

export const WelcomeImportWalletStep4Page = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'welcomeImportWallet.step4' })
  const { t: commonT } = useTranslation('common', { keyPrefix: 'wallet' })
  const { state } = useLocation() as Location<TLocationState>
  const navigate = useNavigate()
  const { bsAggregator } = useBsAggregator()
  const dispatch = useAppDispatch()
  const { createWallet, importAccount, importAccounts } = useBlockchainActions()

  const isImporting = useRef(false)

  const [progress, setProgress] = useState(0)

  const importAddress = async (address: string) => {
    const blockchainService = bsAggregator.getBlockchainByAddress(address)
    if (!blockchainService) throw new Error(t('canNotFindBlockchainError'))

    setProgress(33)

    const wallet = await createWallet({
      name: commonT('watchAccount'),
      walletType: 'watch',
    })

    setProgress(66)

    await importAccount({ wallet, address: address, blockchain: blockchainService.blockchainName, type: 'watch' })

    setProgress(100)
  }

  const importKey = async (key: string) => {
    const accountsToImport: TAccountsToImport = []

    await UtilsHelper.promiseAll(bsAggregator.blockchainServices, async service => {
      const account = service.generateAccountFromKey(key)
      accountsToImport.push({ address: account.address, blockchain: service.blockchainName, key, type: 'legacy' })
    })

    setProgress(33)

    const wallet = await createWallet({
      name: commonT('encryptedName'),
      walletType: 'legacy',
    })

    setProgress(66)

    await importAccounts({ wallet, accounts: accountsToImport })

    setProgress(100)
  }

  const importMnemonic = async (mnemonic: string) => {
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

    setProgress(33)

    const wallet = await createWallet({
      name: commonT('mnemonicWalletName'),
      walletType: 'standard',
      mnemonic,
    })

    setProgress(66)

    await importAccounts({ wallet, accounts: accountsToImport })

    setProgress(100)
  }

  const importEncryptedKey = async () => {
    const blockchainService = bsAggregator.getBlockchainByKey(state.input)
    if (!blockchainService) throw new Error(t('canNotFindBlockchainError'))
    const { address, key } = blockchainService.generateAccountFromKey(state.input)

    setProgress(33)

    const wallet = await createWallet({
      name: commonT('encryptedName'),
      walletType: 'legacy',
    })

    setProgress(66)

    await importAccount({ address, blockchain: blockchainService.blockchainName, wallet, key, type: 'legacy' })

    setProgress(100)
  }

  const handleImport = async () => {
    try {
      const encryptedPassword = await window.api.encryptBasedOS(state.password)
      dispatch(settingsReducerActions.setEncryptedPassword(encryptedPassword))
      dispatch(settingsReducerActions.setSecurityType('password'))

      setProgress(20)

      const importByInputType: Record<TUseImportActionInputType, (input: string) => Promise<void>> = {
        address: importAddress,
        key: importKey,
        mnemonic: importMnemonic,
        encrypted: importEncryptedKey,
      }

      await importByInputType[state.inputType](state.input)

      await UtilsHelper.sleep(1000)

      dispatch(settingsReducerActions.setIsFirstTime(false))
      navigate('/welcome-import-wallet/5')
    } catch (error: any) {
      ToastHelper.error({ message: error.message })
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
