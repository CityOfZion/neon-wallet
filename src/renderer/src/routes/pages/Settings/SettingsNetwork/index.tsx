import { useTranslation } from 'react-i18next'
import { MdRestartAlt } from 'react-icons/md'
import { MdOutlineLanguage } from 'react-icons/md'
import { TbChevronRight } from 'react-icons/tb'
import { useWalletConnectWallet } from '@cityofzion/wallet-connect-sdk-wallet-react'
import { TNetworkType } from '@renderer/@types/blockchain'
import { Button } from '@renderer/components/Button'
import { Separator } from '@renderer/components/Separator'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'
import { useAppDispatch } from '@renderer/hooks/useRedux'
import { useNetworkTypeSelector } from '@renderer/hooks/useSettingsSelector'
import { settingsReducerActions } from '@renderer/store/reducers/SettingsReducer'

export const SettingsNetwork = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'settings.settingsNetwork' })
  const { t: commonT } = useTranslation('common', { keyPrefix: 'networkTypeLabel' })
  const { t: commonGeneral } = useTranslation('common', { keyPrefix: 'general' })
  const { modalNavigateWrapper } = useModalNavigate()
  const { networkType } = useNetworkTypeSelector()
  const dispatch = useAppDispatch()
  const { sessions, disconnect } = useWalletConnectWallet()

  const handleChangeNetwork = async (networkType: TNetworkType) => {
    await Promise.allSettled(sessions.map(session => disconnect(session)))
    dispatch(settingsReducerActions.setNetworkType(networkType))
  }

  return (
    <div className=" flex flex-col px-5 w-full">
      <header className="w-full h-[3.25rem] border-b border-gray-300/30 items-center flex justify-between">
        <h1 className="text-white text-sm">{t('title')}</h1>

        <Button
          leftIcon={<MdRestartAlt className="text-neon w-6 h-6" />}
          label={commonGeneral('reset')}
          clickableProps={{ className: 'w-fit' }}
          variant="text"
          colorSchema="gray"
          onClick={handleChangeNetwork.bind(null, 'mainnet')}
        />
      </header>

      <div className="my-7 text-xs">{t('youAreConnectedNeoAndEth')}</div>

      <div className="flex flex-col gap-y-0.5">
        <div className="pb-2.5 text-neon flex gap-x-2 items-center">
          <MdOutlineLanguage className="w-6 h-6" />
          <p className="text-white text-sm">{t('globalConfiguration')}</p>
        </div>
        <Separator className="mb-2.5" />

        <button
          className="text-xs flex items-center justify-between px-1 aria-[disabled=false]:text-gray-300 h-fit hover:opacity-75 rounded"
          onClick={modalNavigateWrapper('network-selection', {
            state: { networkType, onNetworkChange: handleChangeNetwork },
          })}
        >
          <ul className="list-disc list-inside">
            <li className="text-gray-100">{t('currentNetwork')}</li>
          </ul>
          <div className="flex items-center">
            <span className="text-xs text-gray-300 mr-[1.94rem]">{commonT(networkType)}</span>
            <TbChevronRight className="h-6 w-6 text-neon" />
          </div>
        </button>
      </div>
    </div>
  )
}
