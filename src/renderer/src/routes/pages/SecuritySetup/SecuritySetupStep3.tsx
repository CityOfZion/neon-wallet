import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdDownload, MdOutlinePrint } from 'react-icons/md'
import { useReactToPrint } from 'react-to-print'
import { generateMnemonic } from '@cityofzion/bs-asteroid-sdk'
import { Button } from '@renderer/components/Button'
import { Link } from '@renderer/components/Link'
import { useBlockchainActions } from '@renderer/hooks/useBlockchainActions'
import { useAppDispatch } from '@renderer/hooks/useRedux'
import { settingsReducerActions } from '@renderer/store/settings/SettingsReducer'
import jsPDF from 'jspdf'

export const SecuritySetupStep3Page = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'securitySetupStep3' })
  const { t: commonT } = useTranslation('common')

  const { createAccount, createWallet } = useBlockchainActions()

  const [isLoading, setIsLoading] = useState(true)

  const wordsRef = useRef<string[]>()
  const alreadyPopulatedRef = useRef(false)
  const printElementRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  const handlePrint = useReactToPrint({
    content: () => printElementRef.current,
    documentTitle: commonT('wallet.firstWalletNameBackupFile'),
  })

  const handleDownload = useReactToPrint({
    content: () => printElementRef.current,
    documentTitle: commonT('wallet.firstWalletNameBackupFile'),
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
          pdf.save(`${commonT('wallet.firstWalletNameBackupFile')}.pdf`)
        },
      })
    },
  })

  const populate = useCallback(async () => {
    if (alreadyPopulatedRef.current) return
    alreadyPopulatedRef.current = true

    const words = generateMnemonic()

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
    dispatch(settingsReducerActions.setIsFirstTime(false))

    wordsRef.current = words

    setIsLoading(false)
  }, [createWallet, createAccount, commonT, dispatch])

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
          <div>{commonT('wallet.firstWalletNameBackupFileTitle')}</div>
          <div>{wordsRef.current?.join(' ')}</div>
        </div>
      </div>
    </div>
  )
}
