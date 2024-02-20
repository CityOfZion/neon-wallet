import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbCopy, TbQrcode, TbSend, TbStepInto } from 'react-icons/tb'
import { IAccountState } from '@renderer/@types/store'
import { Button } from '@renderer/components/Button'
import { Input } from '@renderer/components/Input'
import { Separator } from '@renderer/components/Separator'
import { StyleHelper } from '@renderer/helpers/StyleHelper'
import { UtilsHelper } from '@renderer/helpers/UtilsHelper'
import { QRCodeSVG } from 'qrcode.react'

type TProps = {
  account: IAccountState | undefined
}

export const SelectYourReceivingAddress = ({ account }: TProps) => {
  const { t } = useTranslation('pages', { keyPrefix: 'receive' })
  const [address, setAddress] = useState<string>()

  const handleChangeAddres = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value)
  }

  const handleDownload = () => {
    UtilsHelper.donwloadSVGToPng('QRCode', address || 'QRCode')
  }

  useEffect(() => {
    if (account) {
      setAddress(account.address)
    } else {
      setAddress(undefined)
    }
  }, [account])

  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-700 bg-opacity-60 flex flex-col w-[30rem] rounded mt-2">
        <div className="flex justify-between h-11 p-3">
          <div className="flex items-center">
            <TbStepInto className="text-blue w-5 h-5 mr-3 ml-1" />
            <span className="font-bold">{t('yourReceivingAddress')}</span>
          </div>
          {!address && (
            <div className="flex items-center">
              <span className="text-gray-300 mr-3">{t('selectAccountToGenerateCode')}</span>
            </div>
          )}
        </div>
        <div className="px-3">
          <Separator />
        </div>
        <div className="pt-4">
          <Input
            value={address}
            onChange={handleChangeAddres}
            compacted
            className="w-[24rem] mx-auto"
            placeholder={t('addressInputHint')}
            readOnly
            copyable={!!address}
          />
        </div>
        <div className="flex w-full justify-center py-6">
          <div
            className={StyleHelper.mergeStyles('border-4 rounded', {
              'border-white': address,
              'border-gray-700 bg-gray-800 p-4': !address,
            })}
          >
            {address ? (
              <QRCodeSVG id="QRCode" size={172} value={address} includeMargin />
            ) : (
              <TbQrcode className="text-green-700 w-[140px] h-[140px]" />
            )}
          </div>
        </div>
      </div>
      <Button
        className="mt-8 w-[16rem]"
        label={!address ? t('sendQRCode') : t('downloadQRCode')}
        leftIcon={!address ? <TbSend /> : <TbCopy />}
        disabled={!address}
        onClick={handleDownload}
      />
    </div>
  )
}
