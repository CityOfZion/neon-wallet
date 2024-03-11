import { useTranslation } from 'react-i18next'

import { TDappPermissionComponentProps } from '..'

import { EthereumRawJsonDappPermission } from './RawJsonDappPermission'

export const EthereumSignTypedDataDappPermission = (props: TDappPermissionComponentProps) => {
  const { t } = useTranslation('modals', { keyPrefix: 'dappPermission.requests.ethereum.signTypedData' })

  return (
    <EthereumRawJsonDappPermission
      successHeading={t('successModal.heading')}
      successSubtitle={t('successModal.subtitle')}
      title={t('title')}
      {...props}
    />
  )
}
