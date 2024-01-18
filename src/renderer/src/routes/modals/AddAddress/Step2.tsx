import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { PiSealCheckFill } from 'react-icons/pi'
import { TbPlus } from 'react-icons/tb'
import { TBlockchainServiceKey } from '@renderer/@types/blockchain'
import { TContactAddress } from '@renderer/@types/store'
import { Button } from '@renderer/components/Button'
import { Input } from '@renderer/components/Input'
import { useActions } from '@renderer/hooks/useActions'
import { useBsAggregatorSelector } from '@renderer/hooks/useBlockchainSelector'
import { useModalNavigate, useModalState } from '@renderer/hooks/useModalRouter'
import { EndModalLayout } from '@renderer/layouts/EndModal'

type TActionData = {
  address: string
  isAddressValid: boolean
}

type TLocationState = {
  contactName: string
  contactBlockchain: TBlockchainServiceKey
  handleAddAddress: (address: TContactAddress) => void
}

export const AddAddressModalStep2 = () => {
  const { t } = useTranslation('modals', { keyPrefix: 'addAddressStep2' })
  const { t: commonT } = useTranslation('common', { keyPrefix: 'general' })
  const { contactBlockchain, contactName, handleAddAddress } = useModalState<TLocationState>()
  const { modalNavigate } = useModalNavigate()
  const { bsAggregatorRef } = useBsAggregatorSelector()

  const { actionState, actionData, setData, setError, handleAct } = useActions<TActionData>({
    address: '',
    isAddressValid: false,
  })

  const hasSomeError = Object.keys(actionState.errors).length > 0 || !actionData.isAddressValid

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData({
      isAddressValid: bsAggregatorRef.current.validateAddressAllBlockchains(event.target.value),
      address: event.target.value,
    })
  }

  const handleSubmit = async (data: TActionData) => {
    if (!data.address || !bsAggregatorRef.current.validateAddressAllBlockchains(data.address)) {
      setError('address', t('invalidAddress'))
      return
    }

    modalNavigate('add-address-step3', {
      state: {
        contactName: contactName,
        contactAddress: { blockchain: contactBlockchain, address: data.address },
        handleAddAddress,
      },
    })
  }

  return (
    <EndModalLayout heading={t('title')} headingIcon={<TbPlus />} withBackButton>
      <form className="flex flex-col gap-y-5 justify-between h-full" onSubmit={handleAct(handleSubmit)}>
        <div className="flex flex-col gap-y-5">
          <div>
            <div className="text-gray-100 font-bold pb-2">{t('addToContact')}</div>
            <Input value={contactName} compacted readOnly />
          </div>

          <div>{t('enterNNSorPublicKey')}</div>

          <Input value={actionData.address} onChange={handleChange} clearable />

          {!hasSomeError && (
            <div className="flex flex-row w-full items-center h-12 rounded">
              <div className="bg-gray-300 w-[20%] h-full flex justify-center items-center rounded-l">
                <PiSealCheckFill className="w-5 h-5 fill-neon" />
              </div>
              <div className="w-[80%] h-full bg-gray-600 flex justify-center items-center rounded-r">
                {t('publicKeyComplete')}
              </div>
            </div>
          )}
        </div>

        <Button label={commonT('next')} className="w-full" type="submit" disabled={hasSomeError} />
      </form>
    </EndModalLayout>
  )
}
