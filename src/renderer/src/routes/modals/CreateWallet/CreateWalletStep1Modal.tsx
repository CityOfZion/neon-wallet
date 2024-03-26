import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { MdContentCopy, MdLooksOne } from 'react-icons/md'
import { PiPrinter } from 'react-icons/pi'
import ReactToPrint from 'react-to-print'
import { generateMnemonic } from '@cityofzion/bs-asteroid-sdk'
import { Banner } from '@renderer/components/Banner'
import { Button } from '@renderer/components/Button'
import { Separator } from '@renderer/components/Separator'
import { UtilsHelper } from '@renderer/helpers/UtilsHelper'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'
import { CreateWalletModalLayout } from '@renderer/layouts/CreateWalletModalLayout'

export const CreateWalletStep1Modal = () => {
  const { t } = useTranslation('modals', { keyPrefix: 'createWallet.step1' })
  const { modalNavigate } = useModalNavigate()

  const words = generateMnemonic()
  const ref = useRef<HTMLDivElement>(null)

  return (
    <CreateWalletModalLayout>
      <header className="flex justify-between items-center py-2.5 print:hidden">
        <div className="flex items-center gap-x-2.5">
          <MdLooksOne className="text-blue h-4.5 w-4.5" />
          <h2 className="text-sm">{t('title')}</h2>
        </div>
        <div className="text-blue text-sm">{t('step1of3')}</div>
      </header>
      <Separator className="min-h-[0.0625rem] mb-9" />
      <div className="flex flex-col items-center w-full h-[84%] justify-between">
        <div className="flex flex-col w-full gap-6" ref={ref}>
          <div className="text-gray-100 text-xs print:hidden">{t('description')}</div>
          <div className="min-h-[6rem] rounded bg-asphalt mx-5 gap-x-2.5 flex flex-wrap py-5 px-10 justify-center">
            {words.map(word => (
              <span className="text-lg text-white" key={word}>
                {word}
              </span>
            ))}
          </div>
          <div className="flex justify-center gap-3 print:hidden">
            <Button
              iconsOnEdge={false}
              variant="text"
              leftIcon={<MdContentCopy />}
              label={t('copyButtonLabel')}
              onClick={() => UtilsHelper.copyToClipboard(words.join(' '))}
              flat
            />
            <ReactToPrint
              bodyClass="print-agreement"
              content={() => ref.current}
              trigger={() => (
                <Button
                  iconsOnEdge={false}
                  variant="text"
                  leftIcon={<PiPrinter />}
                  label={t('printButtonLabel')}
                  flat
                />
              )}
            />
          </div>
          <Banner type="error" message={t('warning')} className="mx-10 print:hidden" />
        </div>

        <Button
          className="w-48 print:hidden"
          label={t('nextButtonLabel')}
          flat
          onClick={() => modalNavigate('create-wallet-step-2', { state: { words } })}
        />
      </div>
    </CreateWalletModalLayout>
  )
}
