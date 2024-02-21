import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Tb3DCubeSphere } from 'react-icons/tb'
import { TNetworkType } from '@renderer/@types/blockchain'
import { Button } from '@renderer/components/Button'
import { RadioGroup } from '@renderer/components/RadioGroup'
import { Separator } from '@renderer/components/Separator'
import { useModalNavigate, useModalState } from '@renderer/hooks/useModalRouter'
import { EndModalLayout } from '@renderer/layouts/EndModal'

type TState = {
  onNetworkChange: (networkType: TNetworkType) => void | Promise<void>
  networkType: TNetworkType
}

const AVAILABLE_NETWORKS: TNetworkType[] = ['mainnet', 'testnet']
const COLOR_BY_NETWORK: Record<TNetworkType, string> = {
  mainnet: 'bg-neon',
  testnet: 'bg-magenta',
}

export const NetworkSelection = () => {
  const { t } = useTranslation('modals', { keyPrefix: 'networkSelection' })
  const { t: commonT } = useTranslation('common', { keyPrefix: 'networkTypeLabel' })
  const { t: commonGeneral } = useTranslation('common', { keyPrefix: 'general' })
  const { modalNavigate, modalNavigateWrapper } = useModalNavigate()
  const { networkType, onNetworkChange } = useModalState<TState>()

  const [selectedNetwork, setSelectedNetwork] = useState<TNetworkType>(networkType)

  const onSelectRadioItem = (selectedValue: TNetworkType) => {
    setSelectedNetwork(selectedValue)
  }

  const handleSave = async () => {
    onNetworkChange(selectedNetwork)
    modalNavigate(-1)
  }

  return (
    <EndModalLayout heading={t('title')} headingIcon={<Tb3DCubeSphere />}>
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="mb-5">{t('selectNetwork')}</div>
          <RadioGroup.Root value={selectedNetwork} onValueChange={onSelectRadioItem}>
            {AVAILABLE_NETWORKS.map(network => (
              <RadioGroup.Item
                label={commonT(network)}
                value={network}
                key={network}
                leftIcon={<div className={`w-[0.4rem] h-[0.4rem] rounded mx-4 ${COLOR_BY_NETWORK[network]}`} />}
              />
            ))}
          </RadioGroup.Root>
        </div>

        <div className="flex flex-col gap-y-8">
          <Separator />

          <div className="flex gap-x-3">
            <Button
              className="w-full"
              type="button"
              onClick={modalNavigateWrapper(-1)}
              label={commonGeneral('cancel')}
              flat
              colorSchema="gray"
            />

            <Button className="w-full" label={commonGeneral('save')} flat onClick={handleSave} />
          </div>
        </div>
      </div>
    </EndModalLayout>
  )
}
