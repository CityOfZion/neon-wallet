import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { TUseImportActionInputType } from '@renderer/@types/hooks'
import { UtilsHelper } from '@renderer/helpers/UtilsHelper'

import { useActions } from './useActions'
import { useBsAggregator } from './useBsAggregator'

type TFormData = {
  text: string
  inputType?: TUseImportActionInputType
}

export const useImportAction = (
  submitByInputType: Record<
    TUseImportActionInputType,
    (value: string, inputType: TUseImportActionInputType) => Promise<void>
  >
) => {
  const { bsAggregator } = useBsAggregator()
  const { t } = useTranslation('hooks', { keyPrefix: 'useImportAction' })

  const { handleAct, setError, actionState, actionData, setData, clearErrors } = useActions<TFormData>({ text: '' })

  const validateMnemonic = (value: string) => {
    const isValid = UtilsHelper.isValidMnemonic(value)
    if (!isValid) throw new Error(t('errors.mnemonicIncomplete'))
  }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
    setData({ text: value, inputType: undefined })

    try {
      const checkFunctionsByInputType: Record<TUseImportActionInputType, (value: string) => boolean> = {
        key: bsAggregator.validateKeyAllBlockchains.bind(bsAggregator),
        mnemonic: UtilsHelper.isMnemonic,
        encrypted: bsAggregator.validateEncryptedAllBlockchains.bind(bsAggregator),
        address: bsAggregator.validateAddressAllBlockchains.bind(bsAggregator),
      }

      const functionsByInputType = Object.entries(checkFunctionsByInputType).find(([, checkFunc]) => {
        try {
          return checkFunc(value)
        } catch {
          return false
        }
      })

      if (!functionsByInputType) throw new Error()
      const inputType = functionsByInputType[0] as TUseImportActionInputType

      setData({ inputType })

      const validationByInputType: Partial<Record<TUseImportActionInputType, (value: string) => void>> = {
        mnemonic: validateMnemonic,
      }
      const validateFunc = validationByInputType[inputType]
      validateFunc?.(value)

      clearErrors()
    } catch (error: any) {
      setError('text', error.message || t('errors.invalid'))
    }
  }

  const handleSubmit = async (data: TFormData) => {
    try {
      if (!data.text.length) {
        throw new Error(t('errors.empty'))
      }

      if (!data.inputType) {
        throw new Error(t('errors.invalid'))
      }

      await submitByInputType[data.inputType](data.text, data.inputType)
    } catch (error: any) {
      setError('text', error.message)
    }
  }

  return { actionData, actionState, handleAct, handleChange, handleSubmit }
}
