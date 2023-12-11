import { FormEvent, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbPlus } from 'react-icons/tb'
import { TBlockchainServiceKey } from '@renderer/@types/blockchain'
import { TContactAddress } from '@renderer/@types/store'
import { BlockchainIcon } from '@renderer/components/BlockchainIcon'
import { Button } from '@renderer/components/Button'
import { Checkbox } from '@renderer/components/Checkbox'
import { SearchInput } from '@renderer/components/SearchInput'
import { Separator } from '@renderer/components/Separator'
import { useBsAggregatorSelector } from '@renderer/hooks/useBlockchainSelector'
import { useModalNavigate, useModalState } from '@renderer/hooks/useModalRouter'
import { EndModalLayout } from '@renderer/layouts/EndModal'

type TLocationState = {
  contactName: string
  handleAddAddress: (address: TContactAddress) => void
}

export const AddAddressModalStep1 = () => {
  const { t } = useTranslation('modals', { keyPrefix: 'addAddressStep1' })
  const { t: commonT } = useTranslation('common', { keyPrefix: 'general' })
  const { t: blockchainT } = useTranslation('common', { keyPrefix: 'blockchain' })
  const { contactName, handleAddAddress } = useModalState<TLocationState>()
  const { bsAggregatorRef } = useBsAggregatorSelector()
  const { modalNavigate } = useModalNavigate()

  const [selectedBlockchain, setSelectedBlockchain] = useState<TBlockchainServiceKey>()
  const [search, setSearch] = useState<string | null>(null)

  const filteredBlockchain = useMemo(() => {
    const blockchainServices = Object.keys(bsAggregatorRef.current.blockchainServicesByName) as TBlockchainServiceKey[]

    if (search) {
      return blockchainServices.filter(blockchain =>
        blockchain.toLocaleLowerCase().includes(search.toLocaleLowerCase() as string)
      )
    }

    return blockchainServices
  }, [search, bsAggregatorRef])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    modalNavigate('add-address-step2', {
      state: {
        contactName: contactName,
        contactBlockchain: selectedBlockchain,
        handleAddAddress,
      },
    })
  }

  const handleCheckboxChange = (service: TBlockchainServiceKey) => {
    setSelectedBlockchain(service)
  }

  const isChecked = (service: string) => {
    return selectedBlockchain === service
  }

  return (
    <EndModalLayout heading={t('title')} headingIcon={<TbPlus />} withBackButton>
      <form className="flex flex-col justify-between h-full" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-5">
          <div>
            <div className="text-gray-100 font-bold pb-2">{t('addToContact')}</div>
            <div>{contactName}</div>
          </div>

          <div>{t('selectBlockchain')}</div>

          <SearchInput placeholder={t('search')} onChange={event => setSearch(event.target.value)} />

          <Separator />

          {filteredBlockchain &&
            filteredBlockchain.map((service, index) => (
              <div className="flex flex-row items-center justify-between h-12 rounded bg-asphalt p-5" key={index}>
                <div className="flex flex-row gap-x-2">
                  <BlockchainIcon blockchain={service} type="white" />
                  {blockchainT(service)}
                </div>

                <Checkbox onClick={() => handleCheckboxChange(service)} checked={isChecked(service)} />
              </div>
            ))}
        </div>

        <Button label={commonT('next')} className="w-full" type="submit" disabled={!selectedBlockchain} />
      </form>
    </EndModalLayout>
  )
}
