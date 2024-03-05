import { useTranslation } from 'react-i18next'

import { SuccessModalContent } from '../SuccessModalContent'
import { TDappPermissionComponentProps } from '..'

import { EthereumRawJsonDappPermission } from './RawJsonDappPermission'

export const EthereumSendTransactionDappPermission = (props: TDappPermissionComponentProps) => {
  const { t } = useTranslation('modals', { keyPrefix: 'dappPermission.requests.ethereum.sendTransaction' })
  return (
    <EthereumRawJsonDappPermission
      successHeading={t('successModal.heading')}
      successSubtitle={t('successModal.subtitle')}
      successContent={SuccessModalContent}
      title={t('title')}
      {...props}
    />
  )
}
