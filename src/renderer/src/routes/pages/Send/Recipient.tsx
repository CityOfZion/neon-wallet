import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { TbStepInto, TbUsers } from 'react-icons/tb'
import { TokenBalance } from '@renderer/@types/query'
import { TContactAddress } from '@renderer/@types/store'
import { Button } from '@renderer/components/Button'
import { Input } from '@renderer/components/Input'
import { Separator } from '@renderer/components/Separator'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'

type TRecipientParams = {
  selectedToken?: TokenBalance | null
  selectedAddress: string
  onSelectRecipient: (recipientAddress: string) => void
  active: boolean
}

export const Recipient = ({ selectedToken, onSelectRecipient, selectedAddress, active }: TRecipientParams) => {
  const { t } = useTranslation('pages', { keyPrefix: 'send' })
  const { modalNavigateWrapper } = useModalNavigate()

  const handleSelectContact = (address: TContactAddress) => {
    onSelectRecipient(address.address)
  }

  const handleChangeAddres = (event: ChangeEvent<HTMLInputElement>) => {
    onSelectRecipient(event.target.value)
  }

  return (
    <div className="bg-gray-300 bg-opacity-30 flex flex-col w-[30rem] rounded mt-2">
      <div className="flex justify-between h-11 p-3">
        <div className="flex items-center">
          <TbStepInto className="text-blue w-5 h-5 mr-3 ml-1" />
          <span>{t('recipientAddress')}</span>
        </div>
        <Button
          className="flex items-center"
          onClick={modalNavigateWrapper('select-contact', {
            state: {
              handleSelectContact: handleSelectContact,
              selectedToken: selectedToken,
            },
          })}
          clickableProps={{
            className: selectedToken && active ? 'text-gray-100 hover:bg-gray-300/15 hover:rounded' : 'text-gray-100',
          }}
          disabled={selectedToken && active ? false : true}
          variant="text"
          label={t('contacts')}
          leftIcon={<TbUsers />}
          flat
        />
      </div>
      <div className="px-3">
        <Separator />
      </div>
      <div className="py-4">
        <Input
          value={selectedAddress}
          onChange={handleChangeAddres}
          compacted
          disabled={selectedToken && active ? false : true}
          className="w-[24rem] mx-auto"
          placeholder={t('addressInputHint')}
          clearable={true}
        />
      </div>
    </div>
  )
}