import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { MdChevronRight } from 'react-icons/md'
import { TbFileImport } from 'react-icons/tb'
import { TBlockchainServiceKey, TImportAccountsParam } from '@renderer/@types/blockchain'
import { Banner } from '@renderer/components/Banner'
import { Button } from '@renderer/components/Button'
import { Textarea } from '@renderer/components/Textarea'
import { UtilsHelper } from '@renderer/helpers/UtilsHelper'
import { useAccountsSelector } from '@renderer/hooks/useAccountSelector'
import { useActions } from '@renderer/hooks/useActions'
import { useBlockchainActions } from '@renderer/hooks/useBlockchainActions'
import { useBsAggregatorSelector } from '@renderer/hooks/useBlockchainSelector'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'
import { ModalLayout } from '@renderer/layouts/Modal'

type TInputType = 'key' | 'mnemonic'

type TFormData = {
  text: string
  inputType?: TInputType
}

export const ImportModal = () => {
  const { bsAggregator } = useBsAggregatorSelector()
  const blockchainActions = useBlockchainActions()
  const { accountsRef } = useAccountsSelector()
  const { modalNavigate } = useModalNavigate()
  const { t } = useTranslation('modals', { keyPrefix: 'import' })
  const { t: commomT } = useTranslation('common', { keyPrefix: 'wallet' })

  const { handleAct, setError, actionState, actionData, setData, clearErrors } = useActions<TFormData>({ text: '' })

  const accountAlreadyExists = (address: string, blockchain: TBlockchainServiceKey) => {
    return accountsRef.current.some(account => account.address === address && account.blockchain === blockchain)
  }

  const validateMnemonic = (value: string) => {
    const isValid = UtilsHelper.isValidMnemonic(value)
    if (!isValid) throw new Error(t('errors.mnemonicIncomplete'))
  }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
    setData({ text: value, inputType: undefined })

    try {
      const checkFunctionsByInputType: Record<TInputType, (value: string) => boolean> = {
        key: bsAggregator.validateKeyAllBlockchains.bind(bsAggregator),
        mnemonic: UtilsHelper.isMnemonic,
      }

      const functionsByInputType = Object.entries(checkFunctionsByInputType).find(([, checkFunc]) => {
        try {
          return checkFunc(value)
        } catch {
          return false
        }
      })

      if (!functionsByInputType) throw new Error()
      const inputType = functionsByInputType[0] as TInputType

      setData({ inputType })

      const validationByInputType: Partial<Record<TInputType, (value: string) => void>> = {
        mnemonic: validateMnemonic,
      }
      const validateFunc = validationByInputType[inputType]
      validateFunc?.(value)

      clearErrors()
    } catch (error: any) {
      setError('text', error.message || t('errors.invalid'))
    }
  }

  const submitKey = async (key: string) => {
    const addresses = await UtilsHelper.promiseAll(bsAggregator.blockchainServices, async service => {
      if (!service.validateKey(key)) throw new Error()

      const blockchain = service.blockchainName
      const { address } = service.generateAccountFromKey(key)

      if (accountAlreadyExists(address, blockchain)) throw new Error()

      return {
        address,
        blockchain,
      }
    })

    if (!addresses.length) throw new Error(t('errors.allAddressesAlreadyImported'))

    const wallet = await blockchainActions.createWallet({
      name: commomT('importedName'),
      walletType: 'legacy',
      mnemonic: undefined,
    })

    const accountsToImport: TImportAccountsParam['accounts'] = addresses.map(({ address, blockchain }) => ({
      address,
      blockchain,
      key,
      type: 'legacy',
    }))

    await blockchainActions.importAccounts({ wallet, accounts: accountsToImport })
    modalNavigate(-1)
  }

  const submitMnemonic = async (mnemonic: string) => {
    modalNavigate('mnemonic-account-selection', { state: { mnemonic } })
  }

  const handleSubmit = async (data: TFormData) => {
    const submitByInputType: Record<TInputType, (value: string) => Promise<void>> = {
      key: submitKey,
      mnemonic: submitMnemonic,
    }

    try {
      if (!data.text.length) {
        throw new Error(t('errors.empty'))
      }

      if (!data.inputType) {
        throw new Error(t('errors.invalid'))
      }

      await submitByInputType[data.inputType](data.text)
    } catch (error: any) {
      setError('text', error.message)
    }
  }

  return (
    <ModalLayout
      heading={t('title')}
      headingIcon={<TbFileImport />}
      headingIconFilled={false}
      contentClassName="flex flex-col"
    >
      <p className="text-gray-300 uppercase font-bold">{t('subtitle')}</p>
      <p className="text-xs">{t('description')}</p>

      <form className="mt-10 flex flex-col justify-between flex-grow" onSubmit={handleAct(handleSubmit)}>
        <div>
          <Textarea
            placeholder={t('inputPlaceholder')}
            error={!!actionState.errors.text}
            value={actionData.text}
            onChange={handleChange}
            compact
            clearable
            multiline={actionData.inputType === 'mnemonic'}
          />

          <div className="mt-5">
            {actionState.errors.text ? (
              <Banner type="error" message={actionState.errors.text} />
            ) : (
              actionState.isValid &&
              actionData.inputType && <Banner type="success" message={t(`success.${actionData.inputType}` as const)} />
            )}
          </div>
        </div>

        <Button
          className="mt-8"
          type="submit"
          label={t('buttonContinueLabel')}
          rightIcon={<MdChevronRight />}
          loading={actionState.isActing}
          flat
        />
      </form>
    </ModalLayout>
  )
}
