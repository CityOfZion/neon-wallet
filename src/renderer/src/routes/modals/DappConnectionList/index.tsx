import { ChangeEventHandler, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbLink, TbPlug } from 'react-icons/tb'
import { TSession } from '@cityofzion/wallet-connect-sdk-wallet-core'
import { useWalletConnectWallet } from '@cityofzion/wallet-connect-sdk-wallet-react'
import { Button } from '@renderer/components/Button'
import { SearchInput } from '@renderer/components/SearchInput'
import { Separator } from '@renderer/components/Separator'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'
import { EndModalLayout } from '@renderer/layouts/EndModal'

import { DappConnectionListItem } from './DappConnectionListItem'

export const DappConnectionListModal = () => {
  const { sessions, disconnect } = useWalletConnectWallet()
  const { modalNavigateWrapper } = useModalNavigate()
  const { t } = useTranslation('modals', { keyPrefix: 'dappConnectionListModal' })
  const [search, setSearch] = useState('')

  const filteredSessions = sessions.filter(session =>
    session.peer.metadata.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = event => {
    setSearch(event.target.value)
  }

  const handleDisconnect = async (session: TSession) => {
    await disconnect(session)
  }

  return (
    <EndModalLayout headingIcon={<TbPlug />} heading={t('title')} contentClassName="flex flex-col">
      <SearchInput placeholder={t('inputPlaceholder')} compacted onChange={handleSearchChange} />

      <div className="mt-7 flex-grow">
        <p className="text-gray-100 text-sm">{t('listTitle')}</p>
        {filteredSessions.length > 0 ? (
          <ul className="mt-2">
            {filteredSessions.map((session, index) => (
              <>
                <DappConnectionListItem
                  key={session.topic}
                  name={session.peer.metadata.name}
                  icon={session.peer.metadata.icons[0]}
                  onDisconnect={() => handleDisconnect(session)}
                />

                {index !== filteredSessions.length - 1 && <Separator />}
              </>
            ))}
          </ul>
        ) : (
          <span className="text-gray-300 block text-center mt-4">{t('emptyList')}</span>
        )}
      </div>

      <Button
        className="w-full px-6"
        variant="outlined"
        label={t('buttonLabel')}
        leftIcon={<TbLink />}
        flat
        onClick={modalNavigateWrapper('dapp-connection')}
      />
    </EndModalLayout>
  )
}
