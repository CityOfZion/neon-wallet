import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { TbChevronRight, TbStepOut } from 'react-icons/tb'
import { IAccountState } from '@renderer/@types/store'
import { Separator } from '@renderer/components/Separator'
import { StyleHelper } from '@renderer/helpers/StyleHelper'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'

type TAccountParams = {
  selectedAccount?: IAccountState
  onSelectAccount: (contact: IAccountState) => void
  active: boolean
}

export const SelectAccount = ({ selectedAccount, onSelectAccount, active }: TAccountParams) => {
  const { t } = useTranslation('pages', { keyPrefix: 'send' })
  const { modalNavigateWrapper } = useModalNavigate()

  return (
    <Fragment>
      <div className="flex justify-between h-11 p-3">
        <div className="flex items-center">
          <TbStepOut className="text-blue w-5 h-5 mr-3 ml-1" />
          <span
            className={StyleHelper.mergeStyles({
              'font-bold': active,
            })}
          >
            {t('sourceAccount')}
          </span>
        </div>
        <button
          className="flex items-center"
          onClick={modalNavigateWrapper('select-account', {
            state: {
              onSelectAccount: onSelectAccount,
            },
          })}
        >
          <span
            className={StyleHelper.mergeStyles('mr-3', {
              'text-neon': active,
            })}
          >
            {selectedAccount ? selectedAccount.name : t('selectAccount')}
          </span>
          <TbChevronRight className="w-5 h-5 text-gray-300" />
        </button>
      </div>
      <div className="px-3">
        <Separator />
      </div>
    </Fragment>
  )
}
