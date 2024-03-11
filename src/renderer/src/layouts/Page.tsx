import { Fragment, useEffect } from 'react'
import { useWalletConnectWallet } from '@cityofzion/wallet-connect-sdk-wallet-react'
import { TestnetBanner } from '@renderer/components/TestnetBanner'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'

type TProps = {
  children: React.ReactNode
}

export const PageLayout = ({ children }: TProps) => {
  const { sessions, requests } = useWalletConnectWallet()
  const { modalNavigate } = useModalNavigate()

  useEffect(() => {
    if (requests.length <= 0) return
    const request = requests[0]

    const session = sessions.find(session => session.topic === request.topic)
    if (!session) return

    window.api.restoreWindow()
    modalNavigate('dapp-permission', { state: { session, request } })
  }, [requests, sessions, modalNavigate])

  return (
    <Fragment>
      <TestnetBanner />
      {children}
    </Fragment>
  )
}
