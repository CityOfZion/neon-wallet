import { useTranslation } from 'react-i18next'

import { TDappPermissionComponentProps } from '../index'

import { Neo3ContractInvocationDappPermission } from './ContractInvocationDappPermission'

export const Neo3SignTransactionDappPermission = (props: TDappPermissionComponentProps) => {
  const { t } = useTranslation('modals', { keyPrefix: 'dappPermission.requests.neo3.signTransaction' })

  return (
    <Neo3ContractInvocationDappPermission
      successHeading={t('successModal.heading')}
      successSubtitle={t('successModal.subtitle')}
      title={t('title')}
      {...props}
    />
  )
}
