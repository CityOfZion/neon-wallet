import { useTranslation } from 'react-i18next'
import { TbStepInto } from 'react-icons/tb'
import { Tabs } from '@renderer/components/Tabs'
import { ContentLayout } from '@renderer/layouts/ContentLayout'

import { YourAddressTabContent } from './YourAddressTabContent'

enum ETabbarOption {
  YOUR_ADDRESS = 'YOUR_ADDRESS',
  REQUEST_TOKENS = 'REQUEST_TOKENS',
}

export const ReceiveYourAddress = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'receive' })

  return (
    <ContentLayout title={t('title')} titleIcon={<TbStepInto />}>
      <section className="bg-gray-800 h-full w-full flex flex-col rounded text-xs">
        <Tabs.Root defaultValue={ETabbarOption.YOUR_ADDRESS} className="flex flex-col w-full flex-grow  px-4 mt-4">
          <Tabs.List className="uppercase">
            <Tabs.Trigger value={ETabbarOption.YOUR_ADDRESS} className="border-transparent">
              {t('yourAddressTabTitle')}
            </Tabs.Trigger>
            <Tabs.Trigger value={ETabbarOption.REQUEST_TOKENS} className="border-transparent" disabled>
              {t('requestTokenTabTitle')}
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value={ETabbarOption.YOUR_ADDRESS} asChild>
            <YourAddressTabContent />
          </Tabs.Content>
        </Tabs.Root>
      </section>
    </ContentLayout>
  )
}
