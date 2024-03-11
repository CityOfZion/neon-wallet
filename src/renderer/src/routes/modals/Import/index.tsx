import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { MdChevronRight } from 'react-icons/md'
import { TbFileImport } from 'react-icons/tb'
import { IWalletState } from '@renderer/@types/store'
import { Banner } from '@renderer/components/Banner'
import { Button } from '@renderer/components/Button'
import { Textarea } from '@renderer/components/Textarea'
import { UtilsHelper } from '@renderer/helpers/UtilsHelper'
import { useActions } from '@renderer/hooks/useActions'
import { useBsAggregator } from '@renderer/hooks/useBsAggregator'
import { useModalNavigate, useModalState } from '@renderer/hooks/useModalRouter'
import { EndModalLayout } from '@renderer/layouts/EndModal'

type TInputType = 'key' | 'mnemonic' | 'encrypted'

type TImportState = {
  onImportWallet?: (wallet: IWalletState) => void
}

type TFormData = {
  text: string
  inputType?: TInputType
}

export const ImportModal = () => {
  const { bsAggregator } = useBsAggregator()
  const { modalNavigate } = useModalNavigate()
  const { t } = useTranslation('modals', { keyPrefix: 'import' })
  const { onImportWallet } = useModalState<TImportState>()

  const { handleAct, setError, actionState, actionData, setData, clearErrors } = useActions<TFormData>({ text: '' })

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
        encrypted: bsAggregator.validateEncryptedAllBlockchains.bind(bsAggregator),
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
    modalNavigate('import-key-accounts-selection', { state: { key, onImportWallet } })
  }

  const submitMnemonic = async (mnemonic: string) => {
    modalNavigate('import-mnemonic-accounts-selection', { state: { mnemonic, onImportWallet } })
  }

  const submitEncrypted = async (encryptedKey: string) => {
    modalNavigate('blockchain-selection', {
      state: {
        heading: t('title'),
        headingIcon: <TbFileImport />,
        description: t('importEncryptedDescription'),
        onSelect: (blockchain: string) => {
          modalNavigate('import-encrypted-password', { state: { encryptedKey, blockchain, onImportWallet } })
        },
      },
    })
  }

  const handleSubmit = async (data: TFormData) => {
    const submitByInputType: Record<TInputType, (value: string) => Promise<void>> = {
      key: submitKey,
      mnemonic: submitMnemonic,
      encrypted: submitEncrypted,
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
    <EndModalLayout heading={t('title')} headingIcon={<TbFileImport />} contentClassName="flex flex-col">
      <p className="text-gray-300 uppercase font-bold">{t('subtitle')}</p>
      <p className="text-xs">{t('description')}</p>

      <form className="mt-10 flex flex-col justify-between flex-grow" onSubmit={handleAct(handleSubmit)}>
        <div>
          <Textarea
            placeholder={t('inputPlaceholder')}
            error={!!actionState.errors.text}
            value={actionData.text}
            onChange={handleChange}
            compacted
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
    </EndModalLayout>
  )
}
