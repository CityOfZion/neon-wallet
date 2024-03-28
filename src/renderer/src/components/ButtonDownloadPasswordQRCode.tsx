import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdDownload } from 'react-icons/md'
import { UtilsHelper } from '@renderer/helpers/UtilsHelper'
import { useEncryptedPasswordSelector } from '@renderer/hooks/useSettingsSelector'
import { QRCodeSVG } from 'qrcode.react'

import { Button } from './Button'

type TProps = {
  label?: string
  leftIcon?: JSX.Element
  variant?: 'outlined' | 'contained' | 'text' | 'text-slim'
  onDownload?: () => void
} & React.ComponentProps<'button'>

export const ButtonDownloadPasswordQRCode = ({ label, variant, leftIcon, onDownload, ...props }: TProps) => {
  const { encryptedPassword } = useEncryptedPasswordSelector()
  const { t } = useTranslation('common', { keyPrefix: 'general' })
  const [decryptedPassword, setDecryptedPassword] = useState<string>('')

  const handleDownload = () => {
    UtilsHelper.donwloadSVGToPng('QRCode', t('passwordNEONQRCode'))
    if (onDownload) onDownload()
  }

  const decryptPassword = useCallback(async () => {
    const result = await window.api.decryptBasedOS(encryptedPassword ?? '')
    setDecryptedPassword(result)
  }, [encryptedPassword])

  useEffect(() => {
    decryptPassword()
  }, [decryptPassword])

  return (
    <>
      {decryptedPassword && (
        <QRCodeSVG id="QRCode" size={172} value={decryptedPassword} includeMargin className="hidden" />
      )}
      <Button
        label={label ? label : t('downloadQRCodePassword')}
        leftIcon={leftIcon ? leftIcon : <MdDownload />}
        variant={variant ? variant : 'outlined'}
        className={props.className}
        iconsOnEdge={false}
        onClick={handleDownload}
      />
    </>
  )
}
