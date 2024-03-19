import { forwardRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbCopy, TbQrcode, TbSend, TbStepInto } from 'react-icons/tb'
import { useLocation } from 'react-router-dom'
import { IAccountState } from '@renderer/@types/store'
import { Button } from '@renderer/components/Button'
import { Input } from '@renderer/components/Input'
import { Separator } from '@renderer/components/Separator'
import { StyleHelper } from '@renderer/helpers/StyleHelper'
import { UtilsHelper } from '@renderer/helpers/UtilsHelper'
import { QRCodeSVG } from 'qrcode.react'

import { SelectAccount } from '../Send/SelectAccount'

export const YourAddressTabContent = forwardRef<HTMLDivElement>((_, ref) => {
  const { t } = useTranslation('pages', { keyPrefix: 'receive' })
  const { state } = useLocation()

  const [selectedAccount, setSelectedAccount] = useState<IAccountState>(state?.account)

  const handleDownload = () => {
    UtilsHelper.donwloadSVGToPng('QRCode', selectedAccount.address || 'QRCode')
  }

  return (
    <section className="flex flex-col flex-grow items-center text-sm" ref={ref}>
      <div className="max-w-[32rem] w-full flex flex-col items-center flex-grow pt-10">
        <div className="bg-gray-700/60 flex flex-col rounded px-3 w-full">
          <SelectAccount
            selectedAccount={selectedAccount}
            onSelectAccount={setSelectedAccount}
            active
            title={t('receivingAccountTitle')}
            modalTitle={t('selectAccountModal.title')}
            buttonLabel={t('selectAccountModal.selectReceivingAccount')}
            leftIcon={<TbStepInto />}
          />
        </div>

        <div className="bg-gray-700/60 flex flex-col rounded px-3 mt-2 w-full items-center">
          <div className="flex justify-between my-2.5 w-full">
            <div className="flex items-center gap-3">
              <TbStepInto className="text-blue w-5 h-5" />
              <span className="font-bold">{t('yourReceivingAddress')}</span>
            </div>

            {!selectedAccount && (
              <div className="flex items-center">
                <span className="text-gray-300 mr-3">{t('selectAccountToGenerateCode')}</span>
              </div>
            )}
          </div>

          <Separator />

          <Input
            value={selectedAccount?.address ?? ''}
            compacted
            containerClassName="px-10 mt-4"
            placeholder={t('addressInputHint')}
            readOnly
            copyable={!!selectedAccount?.address}
          />

          <div
            className={StyleHelper.mergeStyles('border-4 rounded my-6', {
              'border-white': selectedAccount?.address,
              'border-gray-700 bg-gray-800 p-4': !selectedAccount?.address,
            })}
          >
            {selectedAccount?.address ? (
              <QRCodeSVG id="QRCode" size={172} value={selectedAccount?.address} includeMargin />
            ) : (
              <TbQrcode className="text-green-700 w-[140px] h-[140px]" />
            )}
          </div>
        </div>

        <Button
          className="w-[16rem] mt-20"
          label={!selectedAccount?.address ? t('sendQRCode') : t('downloadQRCode')}
          leftIcon={!selectedAccount?.address ? <TbSend /> : <TbCopy />}
          disabled={!selectedAccount?.address}
          onClick={handleDownload}
          iconsOnEdge={false}
        />
      </div>
    </section>
  )
})
