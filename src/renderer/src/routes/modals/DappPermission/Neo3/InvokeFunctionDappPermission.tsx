import { useTranslation } from 'react-i18next'

import { TDappPermissionComponentProps } from '../index'
import { SuccessModalContent } from '../SuccessModalContent'

import { Neo3ContractInvocationDappPermission } from './ContractInvocationDappPermission'

export const Neo3InvokeFunctionDappPermission = (props: TDappPermissionComponentProps) => {
  const { t } = useTranslation('modals', { keyPrefix: 'dappPermission.requests.neo3.invokeFunction' })

  return (
    <Neo3ContractInvocationDappPermission
      successHeading={t('successModal.heading')}
      successSubtitle={t('successModal.subtitle')}
      successContent={SuccessModalContent}
      title={t('title')}
      {...props}
    />
  )
}
