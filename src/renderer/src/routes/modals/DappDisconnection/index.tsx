import { useTranslation } from 'react-i18next'
import { TbPlug, TbPlugX } from 'react-icons/tb'
import { TSession, useWalletConnectWallet } from '@cityofzion/wallet-connect-sdk-wallet-react'
import { Button } from '@renderer/components/Button'
import { Separator } from '@renderer/components/Separator'
import { useModalNavigate, useModalState } from '@renderer/hooks/useModalRouter'
import { EndModalLayout } from '@renderer/layouts/EndModal'

type TLocationState = {
  sessions: TSession[]
}

export const DappDisconnectionModal = () => {
  const { disconnect } = useWalletConnectWallet()
  const { sessions } = useModalState<TLocationState>()
  const { t } = useTranslation('modals', { keyPrefix: 'dappDisconnection' })
  const { modalNavigate } = useModalNavigate()

  const handleDisconnect = async (session: TSession) => {
    await disconnect(session)
    modalNavigate(-1)
  }

  const handleDisconnectAll = () => {
    Promise.allSettled(sessions.map(async session => await disconnect(session)))
    modalNavigate(-1)
  }

  return (
    <EndModalLayout heading={t('title')} headingIcon={<TbPlug className="text-neon" />}>
      <div className="bg-gray-800 h-full w-full flex flex-col px-4 rounded text-xs items-center justify-between">
        <div className="flex flex-col items-center">
          <div className="w-36 h-36 rounded-full bg-asphalt flex items-center justify-center">
            <TbPlugX className="text-pink w-[5rem] h-[5rem]" />
          </div>
          <p className="text-white text-lg pt-7">{sessions.length > 1 ? t('disconnectAllApps') : t('disconnectApp')}</p>
          {sessions.length === 1 ? (
            <>
              <div className="flex w-full px-3 bg-gray-300/15 rounded min-h-[2rem] items-center justify-center mt-3">
                <p className="text-center text-xs p-2">{sessions[0].peer.metadata.name}</p>
              </div>

              <span className="text-center px-2 text-xs text-gray-100 pt-4">
                {sessions[0].peer.metadata.description}
              </span>
            </>
          ) : (
            <div className="flex flex-col text-center px-2 text-sm text-gray-100 pt-4">
              <span>{t('totalDapps', { totalDapps: sessions.length })}</span>
              <span>{t('willRemove')}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col w-full items-center">
          <Separator />
          <span className="text-xs py-6">{t('warning')}</span>
          <div className="flex">
            <Button
              className="w-fit"
              variant="contained"
              label={t('cancel')}
              onClick={() => modalNavigate(-1)}
              colorSchema="gray"
              flat
            />
            {sessions.length === 1 ? (
              <Button
                className="w-full px-6"
                variant="outlined"
                label={t('disconnect')}
                leftIcon={<TbPlugX />}
                colorSchema="error"
                flat
                onClick={() => handleDisconnect(sessions[0])}
              />
            ) : (
              <Button
                className="w-full px-6"
                variant="outlined"
                label={t('disconnect')}
                leftIcon={<TbPlugX />}
                colorSchema="error"
                flat
                onClick={() => handleDisconnectAll()}
              />
            )}
          </div>
        </div>
      </div>
    </EndModalLayout>
  )
}
