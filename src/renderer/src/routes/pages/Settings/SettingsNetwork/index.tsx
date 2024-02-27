import { useTranslation } from 'react-i18next'
import { MdRestartAlt } from 'react-icons/md'
import { MdOutlineLanguage } from 'react-icons/md'
import { TbChevronRight } from 'react-icons/tb'
import { TNetworkType } from '@renderer/@types/blockchain'
import { Button } from '@renderer/components/Button'
import { Separator } from '@renderer/components/Separator'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'
import { useAppDispatch } from '@renderer/hooks/useRedux'
import { useNetworkTypeSelector } from '@renderer/hooks/useSettingsSelector'
import { settingsReducerActions } from '@renderer/store/reducers/SettingsReducer'
import { useQueryClient } from '@tanstack/react-query'

export const SettingsNetwork = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'settings.settingsNetwork' })
  const { t: commonT } = useTranslation('common', { keyPrefix: 'networkTypeLabel' })
  const { t: commonGeneral } = useTranslation('common', { keyPrefix: 'general' })
  const { modalNavigateWrapper } = useModalNavigate()
  const { networkType } = useNetworkTypeSelector()
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

  const handleChangeNetwork = async (networkType: TNetworkType) => {
    const promises = [
      queryClient.removeQueries({ queryKey: ['balance'] }),
      queryClient.removeQueries({ queryKey: ['exchange'] }),
    ]
    await Promise.allSettled(promises)

    dispatch(settingsReducerActions.setNetworkType(networkType))
  }

  return (
    <div className=" flex flex-col px-5 w-full">
      <header className="w-full  h-14 border-b border-gray-300/30 items-center flex justify-between">
        <h1 className="text-white text-sm">{t('title')}</h1>

        <Button
          leftIcon={<MdRestartAlt className="text-neon" />}
          label={commonGeneral('reset')}
          className="w-fit"
          variant="text"
          colorSchema="gray"
          onClick={handleChangeNetwork.bind(null, 'mainnet')}
        />
      </header>

      <div className="mt-8 mb-5 text-sm">{t('youAreConnectedNeoAndEth')}</div>

      <div className="flex flex-col gap-y-0.5">
        <div className="pb-2 text-neon flex gap-x-2 items-center">
          <MdOutlineLanguage className="w-4 h-4" />
          <p className="text-white text-sm">{t('globalConfiguration')}</p>
        </div>
        <Separator className="mb-2" />

        <div className="text-xs flex items-center justify-between px-1">
          <ul className="list-disc list-inside">
            <li className="text-gray-100">{t('currentNetwork')}</li>
          </ul>

          <Button
            rightIcon={<TbChevronRight />}
            label={commonT(networkType)}
            className="w-40"
            clickableProps={{ className: 'aria-[disabled=false]:text-gray-300 h-fit text-xs' }}
            variant="text"
            colorSchema="neon"
            onClick={modalNavigateWrapper('network-selection', {
              state: { networkType, onNetworkChange: handleChangeNetwork },
            })}
          />
        </div>
      </div>
    </div>
  )
}
