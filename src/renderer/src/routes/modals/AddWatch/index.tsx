import { ChangeEvent, FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdAdd } from 'react-icons/md'
import { TbEyePlus } from 'react-icons/tb'
import { TBlockchainServiceKey, TImportAccountsParam } from '@renderer/@types/blockchain'
import { Banner } from '@renderer/components/Banner'
import { Button } from '@renderer/components/Button'
import { Input } from '@renderer/components/Input'
import { Separator } from '@renderer/components/Separator'
import { useBlockchainActions } from '@renderer/hooks/useBlockchainActions'
import { useBsAggregator } from '@renderer/hooks/useBsAggregator'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'
import { EndModalLayout } from '@renderer/layouts/EndModal'

import { BlockchainIcon } from '../../../components/BlockchainIcon'

type TValidatedAddress = {
  address: string
  abbreviatedAddress: string
  blockchain: TBlockchainServiceKey | undefined
}

export const AddWatch = () => {
  const { bsAggregator } = useBsAggregator()
  const { modalNavigate } = useModalNavigate()
  const blockchainActions = useBlockchainActions()
  const { t } = useTranslation('modals', { keyPrefix: 'addWatch' })
  const { t: commomT } = useTranslation('common', { keyPrefix: 'wallet' })
  const [validatedAddress, setValidatedAddress] = useState<TValidatedAddress>()
  const [error, setError] = useState<string>()

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault()
      setIsLoading(true)
      if (!validatedAddress?.address.length) {
        throw new Error(t('errors.empty'))
      }

      if (!validatedAddress.blockchain) {
        throw new Error(t('errors.invalid'))
      }

      const wallet = await blockchainActions.createWallet({
        name: commomT('watchAccount'),
        walletType: 'watch',
        mnemonic: undefined,
      })

      const accountsToImport: TImportAccountsParam['accounts'] = [
        {
          address: validatedAddress.address,
          blockchain: validatedAddress.blockchain,
          type: 'watch',
        },
      ]

      await blockchainActions.importAccounts({ wallet, accounts: accountsToImport })

      modalNavigate(-1)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const abbreviateAddress = (address: string): string => {
    if (address.length <= 34) {
      return address
    }
    return (
      address.substring(0, address.length / 2 - 4) + '.....' + address.substring(address.length / 2 + 4, address.length)
    )
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (!value.length) {
      setError(t('errors.empty'))
      return
    }
    for (const blockchainService of bsAggregator.blockchainServices) {
      const isValid = blockchainService.validateAddress(value)
      if (isValid) {
        setValidatedAddress({
          blockchain: blockchainService.blockchainName,
          abbreviatedAddress: abbreviateAddress(value),
          address: value,
        })
        setError(undefined)
        return
      }
    }
    setValidatedAddress({
      blockchain: undefined,
      abbreviatedAddress: '',
      address: '',
    })
    setError(t('errors.invalid'))
  }

  return (
    <EndModalLayout heading={t('title')} headingIcon={<TbEyePlus />}>
      <p className="text-xs">{t('description')}</p>

      <form className="mt-6" onSubmit={handleSubmit}>
        <Input onChange={handleChange} placeholder={t('inputPlaceholder')} errorMessage={error} />

        <Banner className="mt-5" message={t('information')} type="info" />

        {validatedAddress?.blockchain && (
          <div>
            <Separator className="mt-6" />

            <p className="mt-6 text-xs">{t('willBeAdded')}</p>

            <div className="bg-asphalt mt-5 rounded-md">
              <div className="flex p-4 overflow-hidden">
                <BlockchainIcon blockchain={validatedAddress.blockchain} type="white" className="w-5 h-5 opacity-50" />

                <p className="text-xs ml-4 capitalize">{validatedAddress.blockchain}</p>
              </div>
              <Separator className="mx-4 w-9/10" />
              <p className="text-xs p-4 pt-3">{validatedAddress.abbreviatedAddress}</p>
            </div>

            <div className="flex justify-center w-full">
              <Button
                className="mt-8 absolute bottom-10"
                type="submit"
                label={t('buttonAdd')}
                leftIcon={<MdAdd />}
                loading={isLoading}
              />
            </div>
          </div>
        )}
      </form>
    </EndModalLayout>
  )
}
