import { Fragment, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ContractInvocationMulti } from '@cityofzion/wallet-connect-sdk-wallet-core'
import { Button } from '@renderer/components/Button'
import { DappPermissionHeader } from '@renderer/components/DappPermissionHeader'
import { Separator } from '@renderer/components/Separator'
import { ToastHelper } from '@renderer/helpers/ToastHelper'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'
import { WalletConnectNeonAdapter } from '@renderer/libs/WalletConnectNeonAdapter'
import { useQuery } from '@tanstack/react-query'

import { TDappPermissionComponentProps } from '../../index'

import { Fee } from './Fee'
import { Invocation } from './Invocation'
import { Signer } from './Signer'

type TProps = TDappPermissionComponentProps & {
  successHeading: string
  successSubtitle: string
  successContent?: (props: any) => JSX.Element
  title: string
}

export const Neo3ContractInvocationDappPermission = ({
  request,
  session,
  sessionInfo,
  onReject,
  onAccept,
  successHeading,
  successSubtitle,
  title,
  successContent,
}: TProps) => {
  const { t } = useTranslation('modals', { keyPrefix: 'dappPermission.requests.neo3.contractInvocation' })
  const params = useMemo(() => request.params.request.params as ContractInvocationMulti, [request])
  const { modalNavigate } = useModalNavigate()

  const {
    data: fee,
    isLoading: feeIsLoading,
    error: feeError,
  } = useQuery({
    queryKey: ['fee', request.id],
    queryFn: async () => {
      const adapter = new WalletConnectNeonAdapter()
      const { total } = await adapter.calculateFee({ request, session })
      return total
    },
    gcTime: 0,
    staleTime: 0,
  })

  const [isApproving, setIsApproving] = useState(false)

  const handleAccept = async () => {
    setIsApproving(true)
    await onAccept(successHeading, successSubtitle, successContent)
    setIsApproving(false)
  }

  useEffect(() => {
    if (!feeError) return

    ToastHelper.error({ message: t('feeError') })
    modalNavigate(-1)
  }, [feeError, modalNavigate, t])

  useEffect(() => {
    if (params.extraNetworkFee || params.extraSystemFee || params.systemFeeOverride || params.networkFeeOverride) {
      ToastHelper.info({ message: t('overrideFeeInfo'), id: 'dapp-permission-override-fee' })
    }
  }, [t, params])

  return (
    <div className="flex flex-col min-h-0 overflow-y-auto pr-2 pl-5">
      <DappPermissionHeader session={session} />

      <div className="flex flex-col items-center">
        <p className="text-white text-2xl mt-9 text-center">{title}</p>

        <p className="text-gray-100 text-sm my-5">{t('subtitle')}</p>

        <ul className="flex flex-col w-full gap-2.5">
          {params.invocations.map((invocation, index) => (
            <li key={`invocations-${index}`} className="w-full">
              <Invocation invocation={invocation} session={session} blockchain={sessionInfo.blockchain} />
            </li>
          ))}
        </ul>

        <div className="px-4 pt-3 pb-5 mt-2.5 bg-asphalt text-gray-100 rounded w-full text-sm">
          {params.signers && (
            <Fragment>
              <ul className="flex flex-col gap-2">
                {params.signers.map((signer, index) => (
                  <li key={`signers-${index}`}>
                    <Signer signer={signer} session={session} />
                  </li>
                ))}
              </ul>
              <Separator className="mt-3 mb-4" />
            </Fragment>
          )}

          <Fee loading={feeIsLoading} fee={fee} />
        </div>
      </div>

      <div className="flex gap-2.5 px-10 mt-8 pb-10 z-50 ">
        <Button label={t('cancelButtonLabel')} colorSchema="gray" onClick={onReject} />
        <Button
          label={t('acceptButtonLabel')}
          className="flex-grow"
          onClick={handleAccept}
          loading={isApproving}
          disabled={feeIsLoading || isApproving}
        />
      </div>
    </div>
  )
}
