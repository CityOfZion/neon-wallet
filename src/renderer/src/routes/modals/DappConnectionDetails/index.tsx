import { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbPlug } from 'react-icons/tb'
import { TSessionProposal } from '@cityofzion/wallet-connect-sdk-wallet-core'
import { useWalletConnectWallet } from '@cityofzion/wallet-connect-sdk-wallet-react'
import { TWalletConnectHelperProposalInformation } from '@renderer/@types/helpers'
import { IAccountState } from '@renderer/@types/store'
import dappFallbackIcon from '@renderer/assets/images/dapp-fallback-icon.png'
import { ReactComponent as NeonWalletLogo } from '@renderer/assets/images/neon-wallet-full.svg'
import { ReactComponent as WalletConnectLogo } from '@renderer/assets/images/wallet-connect.svg'
import { Button } from '@renderer/components/Button'
import { ImageWithFallback } from '@renderer/components/ImageWithFallback'
import { Loader } from '@renderer/components/Loader'
import { Separator } from '@renderer/components/Separator'
import { ToastHelper } from '@renderer/helpers/ToastHelper'
import { WalletConnectHelper } from '@renderer/helpers/WalletConnectHelper'
import { useModalNavigate, useModalState } from '@renderer/hooks/useModalRouter'
import { useAppDispatch } from '@renderer/hooks/useRedux'
import { useNetworkTypeSelector } from '@renderer/hooks/useSettingsSelector'
import { CenterModalLayout } from '@renderer/layouts/CenterModal'
import { settingsReducerActions } from '@renderer/store/reducers/SettingsReducer'

import { DappConnectionErrorContent } from './DappConnectionErrorContent'
import { DappConnectionSuccessContent } from './DappConnectionSuccessContent'

type TModalState = {
  proposal: TSessionProposal
}

export const DappConnectionDetailsModal = () => {
  const { proposal } = useModalState<TModalState>()
  const { rejectProposal, approveProposal } = useWalletConnectWallet()
  const { modalNavigate } = useModalNavigate()
  const { networkTypeRef } = useNetworkTypeSelector()
  const { t } = useTranslation('modals', { keyPrefix: 'dappConnectionDetails' })
  const dispatch = useAppDispatch()

  const [proposalInformation, setProposalInformation] = useState<TWalletConnectHelperProposalInformation>()

  const handleClose = async () => {
    await rejectProposal(proposal)
  }

  const handleDecline = async () => {
    await rejectProposal(proposal)
    modalNavigate(-1)
  }

  const handleAccountSelection = async (account: IAccountState) => {
    if (!proposalInformation) return

    try {
      await approveProposal(proposal, {
        address: account.address,
        chain: proposalInformation.proposalNetwork,
        blockchain: proposalInformation.proposalBlockchain,
      })
      modalNavigate(-1)
      modalNavigate('success', {
        state: {
          heading: t('successModal.title'),
          headingIcon: <TbPlug />,
          subtitle: t('successModal.subtitle'),
          content: <DappConnectionSuccessContent />,
        },
      })
    } catch {
      modalNavigate(-1)
      modalNavigate('error', {
        state: {
          heading: t('errorModal.title'),
          headingIcon: <TbPlug />,
          subtitle: t('errorModal.subtitle'),
          content: <DappConnectionErrorContent />,
        },
      })
    }
  }

  const handleAccept = async () => {
    if (!proposalInformation) return

    if (proposalInformation.network !== networkTypeRef.current) {
      dispatch(settingsReducerActions.setNetworkType(proposalInformation.network))
    }

    modalNavigate('dapp-connection-account-selection', {
      state: {
        onSelectionFinish: handleAccountSelection,
        proposal,
      },
    })
  }

  useEffect(() => {
    try {
      const proposalInformation = WalletConnectHelper.getInformationFromProposal(proposal)
      setProposalInformation(proposalInformation)
    } catch (error: any) {
      ToastHelper.error(error.message)
      modalNavigate(-1)
    }
  }, [proposal, modalNavigate])

  return (
    <CenterModalLayout onClose={handleClose} contentClassName="items-center justify-center flex flex-col">
      {proposalInformation ? (
        <Fragment>
          <div className="flex w-full gap-x-12 items-center">
            <NeonWalletLogo className="w-full h-min" />

            <WalletConnectLogo className="w-full h-min opacity-60" />
          </div>

          <ImageWithFallback
            src={proposal.params.proposer.metadata.icons[0]}
            alt={`${proposal.params.proposer.metadata.name} icon`}
            fallbackSrc={dappFallbackIcon}
            className="max-h-[2.25rem] max-w-[4rem] object-contain mt-5 rounded-sm "
          />

          <p className="text-white text-2xl mt-9">{t('title')}</p>

          <p className="text-gray-100 text-sm mt-6">
            {t('description', { name: proposal.params.proposer.metadata.name })}
          </p>

          <div className="w-full flex flex-col bg-gray-900 rounded text-white px-4 py-2.5 mt-5">
            <div className="flex justify-between text-sm items-center">
              <div className="flex items-center gap-x-2.5">
                <TbPlug className="stroke-blue w-6 h-6" />

                <span>{t('connectionDetailsTitle')}</span>
              </div>

              <span className="text-gray-300">{proposalInformation.chain}</span>
            </div>

            <Separator className="my-2.5" />

            <ul className="text-xs grid max-h-[10rem] overflow-y-scroll grid-cols-2">
              {proposalInformation.methods.map(method => (
                <li key={method} className="list-disc w-1/2 mx-4">
                  {method}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-x-2.5 w-full flex-grow items-end">
            <Button label="Decline" colorSchema="gray" className="min-w-[7.5rem]" onClick={handleDecline} />

            <Button label="Accept" className="flex-grow" onClick={handleAccept} />
          </div>
        </Fragment>
      ) : (
        <Loader className="w-10 h-10" />
      )}
    </CenterModalLayout>
  )
}
