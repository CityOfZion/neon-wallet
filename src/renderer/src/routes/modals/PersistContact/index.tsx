import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { MdDeleteForever } from 'react-icons/md'
import { TbPlus } from 'react-icons/tb'
import { IContactState, TContactAddress } from '@renderer/@types/store'
import { BlockchainIcon } from '@renderer/components/BlockchainIcon'
import { Button } from '@renderer/components/Button'
import { IconButton } from '@renderer/components/IconButton'
import { Input } from '@renderer/components/Input'
import { Separator } from '@renderer/components/Separator'
import { StyleHelper } from '@renderer/helpers/StyleHelper'
import { UtilsHelper } from '@renderer/helpers/UtilsHelper'
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

  const form = useForm<TFormData>({
    defaultValues: {
      name: contact?.name ?? '',
      addresses: contact?.addresses ?? [],
    },
  })
  const { fields, append, remove } = useFieldArray({ control: form.control, name: 'addresses' })
  const hasSomeError = Object.keys(form.formState.errors).length > 0

  const handleAddAddress = (address: TContactAddress) => {
    append(address)
  }

  const handleDeleteAddress = (addressToDeleteIndex: number) => {
    remove(addressToDeleteIndex)
  }

  const openAddAddressModal = (selectedAddress?: TContactAddress) => {
    const contactName = form.getValues('name')

    modalNavigate('add-address-step1', {
      state: {
        contactName,
        address: selectedAddress,
        handleAddAddress: handleAddAddress,
      },
    })
  }

  const handleDeleteContact = (contact: IContactState) => {
    dispatch(contactReducerActions.deleteContact(contact.id))
    modalNavigate(-1)
  }

  const handleSubmit: SubmitHandler<TFormData> = async data => {
    if (!data.name.length || !data.addresses || data.addresses.length == 0) {
      if (!data.name.length) {
        form.setError('name', { message: t('invalidName') })
      }

      if (!data.addresses || data.addresses.length == 0) {
        form.setError('addresses', { message: t('emptyAddresses') })
      }

      return
    }

    if (contact) {
      dispatch(contactReducerActions.saveContact({ name: data.name, addresses: data.addresses, id: contact.id }))
    } else {
      const newContact: IContactState = { name: data.name, addresses: data.addresses, id: UtilsHelper.uuid() }
      dispatch(contactReducerActions.saveContact(newContact))
    }

    modalNavigate(-1)
  }

  return (
    <EndModalLayout heading={contact ? t('editContact') : t('addContact')} headingIcon={<TbPlus />}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col justify-between h-full">
        <div>
          <div className="mb-5">
            <div className="text-gray-100 font-bold pb-2">{t('name')}</div>
            <Input
              placeholder={t('enterAName')}
              {...form.register('name')}
              errorMessage={form.formState.errors.name?.message}
              compacted
              clearable
              onFocus={() => form.clearErrors('name')}
            />
          </div>

          <div className="mb-5">
            <div className="text-gray-100 font-bold pb-2">{t('addresses')}</div>
            {fields.map((address, index) => (
              <div
                key={address.id}
                className="flex items-center pl-3 pr-2 justify-between h-8.5 rounded bg-asphalt w-full mb-5"
              >
                <div className="flex items-center gap-x-3 max-w-[90%]">
                  <BlockchainIcon blockchain={address.blockchain} type="white" className="h-3 w-3" />
                  <span className="truncate">{address.address}</span>
                </div>
                <IconButton
                  icon={<MdDeleteForever className="text-pink h-5 w-5" />}
                  compacted
                  type="button"
                  onClick={() => handleDeleteAddress(index)}
                  className="items-center"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={() => openAddAddressModal()}
              className={StyleHelper.mergeStyles(
                'flex items-center h-9 rounded bg-asphalt w-full px-5 justify-between',
                {
                  'border-2 border-pink': form.formState.errors.addresses,
                }
              )}
              onFocus={() => form.clearErrors('addresses')}
            >
              <span className="text-gray-100 font-medium text-xs">{t('enterPublicKeyOrNNS')}</span>
              <TbPlus className="stroke-neon w-5 h-5" />
            </button>
            {form.formState.errors.addresses && (
              <div className="text-pink py-1">{form.formState.errors.addresses.message}</div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-y-4">
          <div className="flex flex-row items-center justify-center gap-x-2">
            <Button
              label={commonT('cancel')}
              onClick={modalNavigateWrapper(-1)}
              clickableProps={{ className: 'w-32 h-10' }}
              disabled={hasSomeError}
              type="button"
            />
            <Button
              label={commonT('save')}
              clickableProps={{ className: 'w-32 h-10' }}
              disabled={hasSomeError}
              type="submit"
            />
          </div>
          {contact && (
            <div className="flex flex-col pt-2 gap-y-4">
              <Separator />
              <Button
                label="Delete Contact"
                type="button"
                leftIcon={<MdDeleteForever />}
                variant="outlined"
                onClick={() => handleDeleteContact(contact)}
                colorSchema="error"
                flat
                className="w-full"
                clickableProps={{ className: 'h-10' }}
              ></Button>
            </div>
          )}
        </div>
      </form>
    </EndModalLayout>
  )
}
