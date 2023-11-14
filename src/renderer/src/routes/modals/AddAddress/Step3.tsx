import { useTranslation } from 'react-i18next'
import { TbPlus } from 'react-icons/tb'
import { TContactAddress } from '@renderer/@types/store'
import { BlockchainIcon } from '@renderer/components/BlockchainIcon'
import { Button } from '@renderer/components/Button'
import { Input } from '@renderer/components/Input'
import { Separator } from '@renderer/components/Separator'
import { useModalLocation, useModalNavigate } from '@renderer/hooks/useModalRouter'
import { ModalLayout } from '@renderer/layouts/Modal'

type TLocationState = {
  contactName: string
  contactAddress: TContactAddress
  handleAddAddress: (address: TContactAddress) => void
}

export const AddAddressModalStep3 = () => {
  const { t } = useTranslation('modals', { keyPrefix: 'addAddressStep3' })
  const { t: blockchainT } = useTranslation('common', { keyPrefix: 'blockchain' })
  const location = useModalLocation<TLocationState>()
  const { modalNavigate } = useModalNavigate()
  const contactName = location.state.contactName
  const contactAddress = location.state.contactAddress

  const handle = () => {
    location.state.handleAddAddress(contactAddress)
    modalNavigate(-3)
  }

  return (
    <ModalLayout heading={t('title')} headingIcon={<TbPlus />} headingIconFilled={false} withBackButton>
      <div className="flex flex-col gap-y-5 justify-between h-full">
        <div className="flex flex-col gap-y-5">
          <div>
            <div className="text-gray-100 font-bold pb-2 uppercase">{t('addToContact')}</div>
            <div>{contactName}</div>
          </div>

          <div>{t('subtext')}</div>

          <div className="rounded bg-asphalt p-2 gap-y-4">
            <div className="flex p-2 gap-x-2 items-center">
              <BlockchainIcon blockchain={contactAddress.blockchain} type="white" />
              {blockchainT(contactAddress.blockchain)}
            </div>
            <Separator />
            <div className="flex p-2 gap-x-2 items-center justify-between w-full">
              <div className="truncate">{contactAddress.address}</div>
              <Input
                type="checkbox"
                className="accent-neon w-4 h-4"
                containerClassName="w-fit pointer-events-none"
                defaultChecked
              />
            </div>
          </div>
        </div>

        <Button leftIcon={<TbPlus />} label={t('addToContact')} className="w-full" onClick={handle} />
      </div>
    </ModalLayout>
  )
}
