import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdDownload, MdOutlinePrint } from 'react-icons/md'
import { Location, useLocation } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import { generateMnemonic } from '@cityofzion/bs-asteroid-sdk'
import { TAccountsToImport, TWalletToCreate } from '@renderer/@types/blockchain'
import { Button } from '@renderer/components/Button'
import { Link } from '@renderer/components/Link'
import { UtilsHelper } from '@renderer/helpers/UtilsHelper'
import { useBlockchainActions } from '@renderer/hooks/useBlockchainActions'
import { useAppDispatch } from '@renderer/hooks/useRedux'
import { settingsReducerActions } from '@renderer/store/reducers/SettingsReducer'
import jsPDF from 'jspdf'

type TLocationState = {
  password: string
  accountsToImport: TAccountsToImport
  walletToImport: TWalletToCreate
}

export const WelcomeSecuritySetupStep3Page = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'welcomeSecuritySetup.step3' })
  const { t: commonT } = useTranslation('common')
  const dispatch = useAppDispatch()
  const { createAccount, createWallet, importAccounts } = useBlockchainActions()
  const { state } = useLocation() as Location<TLocationState>

  const [isLoading, setIsLoading] = useState(true)

  const alreadyPopulatedRef = useRef(false)
  const printElementRef = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({
    content: () => printElementRef.current,
    documentTitle: t('backupFileName'),
  })

  const handleDownload = useReactToPrint({
    content: () => printElementRef.current,
    documentTitle: t('backupFileTitle'),
    print: async target => {
      const document = target.contentDocument
      if (!document) return
      const html = document.getElementsByTagName('html')[0]
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
      })

      pdf.html(html, {
        callback: function (pdf) {
          pdf.save(`${t('backupFileName')}.pdf`)
        },
      })
    },
  })

  const populate = useCallback(async () => {
    if (alreadyPopulatedRef.current) return
    alreadyPopulatedRef.current = true

    const words = generateMnemonic()

    if (state.accountsToImport) {
      const wallet = await createWallet(state.walletToImport)

      await importAccounts({ wallet, accounts: state.accountsToImport })
    } else {
      const wallet = await createWallet({
        name: commonT('wallet.firstWalletName'),
        walletType: 'standard',
        mnemonic: words.join(' '),
      })

      await createAccount({
        wallet,
        blockchain: 'neo3',
        name: commonT('account.defaultName', { accountNumber: 1 }),
      })
    }

    await UtilsHelper.sleep(500)
    dispatch(settingsReducerActions.setIsFirstTime(false))
    setIsLoading(false)
  }, [createWallet, createAccount, commonT, dispatch, importAccounts, state])

  useEffect(() => {
    populate()
  }, [populate])

  return (
    <div className="flex-grow w-full flex flex-col justify-between items-center">
      {isLoading ? (
        <div className="flex w-full h-[10.125rem] bg-asphalt rounded animate-pulse" />
      ) : (
        <div className="px-7 py-5 bg-asphalt rounded flex flex-col gap-y-3.5">
          <p className="text-sm text-white text-center">{t('description')}</p>

          <div className="flex gap-x-2.5 justify-center">
            <Button
              label={t('buttonDownloadLabel')}
              variant="outlined"
              leftIcon={<MdDownload />}
              onClick={handleDownload}
            />
            <Button
              label={t('buttonPrintLabel')}
              variant="outlined"
              leftIcon={<MdOutlinePrint />}
              onClick={handlePrint}
            />
          </div>
        </div>
      )}

      <Link label={t('buttonContinueLabel')} to={'/'} className="w-64" disabled={isLoading} />

      <div className="hidden">
        <div ref={printElementRef}>
          <div>{t('backupFileTitle')}</div>
          <div>{state.password}</div>
        </div>
      </div>
    </div>
  )
}
