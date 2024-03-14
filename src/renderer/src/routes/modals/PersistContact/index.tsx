import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { MdDeleteForever } from 'react-icons/md'
import { TbPencil, TbPlus } from 'react-icons/tb'
import { IContactState, TContactAddress } from '@renderer/@types/store'
import { Banner } from '@renderer/components/Banner'
import { BlockchainIcon } from '@renderer/components/BlockchainIcon'
import { Button } from '@renderer/components/Button'
import { IconButton } from '@renderer/components/IconButton'
import { Input } from '@renderer/components/Input'
import { Separator } from '@renderer/components/Separator'
import { UtilsHelper } from '@renderer/helpers/UtilsHelper'
import { useActions } from '@renderer/hooks/useActions'
import { useModalNavigate, useModalState } from '@renderer/hooks/useModalRouter'
import { useAppDispatch } from '@renderer/hooks/useRedux'
import { EndModalLayout } from '@renderer/layouts/EndModal'
import { contactReducerActions } from '@renderer/store/reducers/ContactReducer'

type TFormData = {
  name: string
  addresses: TContactAddress[]
}

type TLocationState = {
  contact?: IContactState
}

export const PersistContactModal = () => {
  const { t } = useTranslation('modals', { keyPrefix: 'persistContactModal' })
  const { t: commonT } = useTranslation('common', { keyPrefix: 'general' })

  const { modalNavigate, modalNavigateWrapper } = useModalNavigate()
  const { contact } = useModalState<TLocationState>()
  const dispatch = useAppDispatch()

  const { actionData, actionState, handleAct, setData, setError } = useActions<TFormData>({
    name: contact?.name ?? '',
    addresses: contact?.addresses ?? [],
  })

  const handleAddAddress = (address: TContactAddress) => {
    setData(prev => ({ addresses: [...prev.addresses, address] }))
  }

  const handleDeleteAddress = (addressToDeleteIndex: number) => {
    setData(prev => ({ addresses: prev.addresses.filter((_, index) => index !== addressToDeleteIndex) }))

    if (actionData.addresses.length - 1 == 0) {
      setError('addresses', t('emptyAddresses'))
    }
  }

  const openAddAddressModal = (selectedAddress?: TContactAddress) => {
    modalNavigate('add-address', {
      state: {
        contactName: actionData.name,
        address: selectedAddress,
        handleAddAddress: handleAddAddress,
      },
    })
  }

  const handleDeleteContact = (contact: IContactState) => {
    dispatch(contactReducerActions.deleteContact(contact.id))
    modalNavigate(-1)
  }

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value
    setData({ name })

    if (!name.length) {
      setError('name', t('invalidName'))
    }
  }

  const handleSubmit = async (data: TFormData) => {
    if (contact) {
      dispatch(contactReducerActions.saveContact({ name: data.name, addresses: data.addresses, id: contact.id }))
    } else {
      const newContact: IContactState = { name: data.name, addresses: data.addresses, id: UtilsHelper.uuid() }
      dispatch(contactReducerActions.saveContact(newContact))
    }

    modalNavigate(-1)
  }

  return (
    <EndModalLayout
      heading={contact ? t('editContact') : t('addContact')}
      headingIcon={contact ? <TbPencil /> : <TbPlus />}
    >
      <form onSubmit={handleAct(handleSubmit)} className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-y-6">
          <div>
            <div className="text-gray-100 font-bold pb-2">{t('name')}</div>
            <Input
              placeholder={t('enterAName')}
              value={actionData.name}
              onChange={handleChangeName}
              errorMessage={actionState.errors.name}
              compacted
              clearable
            />
          </div>

          <div className="flex flex-col">
            <div className="text-gray-100 font-bold pb-4">{t('addresses')}</div>

            <div>
              {actionData.addresses.map((address, index) => (
                <div
                  key={index}
                  className="flex items-center pl-3 pr-2 justify-between h-8.5 rounded bg-asphalt w-full mb-5"
                >
                  <div className="flex items-center gap-x-3 flex-grow min-w-0">
                    <BlockchainIcon blockchain={address.blockchain} type="white" className="h-3 w-3" />
                    <span className="truncate">{address.address}</span>
                  </div>
                  <IconButton
                    icon={<TbPencil className="text-blue h-5 w-5" />}
                    compacted
                    type="button"
                    onClick={() => openAddAddressModal(address)}
                    className="items-center"
                  />
                  <IconButton
                    icon={<MdDeleteForever className="text-pink h-5 w-5" />}
                    compacted
                    type="button"
                    onClick={modalNavigateWrapper('delete-contact', {
                      state: {
                        firstName: address.address,
                        secondName: contact?.name,
                        onButtonClick: () => handleDeleteAddress(index),
                        modalTitle: t('deleteAddress.title'),
                        warningText: t('deleteAddress.warningText'),
                        warningDescription: t('deleteAddress.warningDescription'),
                        buttonLabel: t('deleteAddress.buttonDeleteLabel'),
                        truncateFirstName: true,
                      },
                    })}
                    className="items-center"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-y-8">
              {actionData.addresses.length <= 0 && (
                <Banner type="error" message={t('noAddressesFound')} className="mt-4" />
              )}

              {actionState.errors.addresses && <div className="text-pink py-1">{actionState.errors.addresses}</div>}

              <Separator />

              <div className="flex justify-center">
                <Button
                  type="button"
                  leftIcon={<TbPlus className="stroke-neon" />}
                  label={t('addAddress')}
                  variant="outlined"
                  onClick={() => openAddAddressModal()}
                  className="w-[17.125rem]"
                  flat
                  iconsOnEdge={false}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-4">
          {contact && (
            <div className="flex flex-col pt-2 gap-y-4">
              <Separator />
              <Button
                label={t('deleteContact.title')}
                type="button"
                leftIcon={<MdDeleteForever className="fill-pink" />}
                variant="outlined"
                onClick={modalNavigateWrapper('delete-contact', {
                  state: {
                    firstName: contact.name,
                    onButtonClick: () => handleDeleteContact(contact),
                    modalTitle: t('deleteContact.title'),
                    warningText: t('deleteContact.warningText'),
                    warningDescription: t('deleteContact.warningDescription'),
                    buttonLabel: t('deleteContact.buttonDeleteLabel'),
                  },
                })}
                colorSchema="error"
                flat
                iconsOnEdge={false}
              />
            </div>
          )}

          <Button
            label={contact ? commonT('save') : t('saveContact')}
            flat
            disabled={actionData.addresses.length <= 0 || !actionState.isValid || actionState.isActing}
            type="submit"
            iconsOnEdge={false}
          />
        </div>
      </form>
    </EndModalLayout>
  )
}
