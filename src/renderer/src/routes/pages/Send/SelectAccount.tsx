import { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbChevronRight, TbStepOut } from 'react-icons/tb'
import { IAccountState } from '@renderer/@types/store'
import { Separator } from '@renderer/components/Separator'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'

export const SelectAccount = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'send' })
  const { modalNavigateWrapper } = useModalNavigate()
  const [selectedAccount, setSelectedAccount] = useState<IAccountState>()

  const handleSelectAccount = account => {
    setSelectedAccount(account)
  }

  return (
    <Fragment>
      <div className="flex justify-between h-11 p-3">
        <div className="flex items-center">
          <TbStepOut className="text-blue w-5 h-5 mr-3 ml-1" />
          <span className="font-bold">{t('sourceAccount')}</span>
        </div>
        <button
          className="flex items-center"
          onClick={modalNavigateWrapper('select-account', {
            state: {
              handleSelectAccount: handleSelectAccount,
            },
          })}
        >
          <span className="text-neon mr-3">{selectedAccount ? selectedAccount.name : t('selectAccount')}</span>
          <TbChevronRight className="w-5 h-5 text-gray-300" />
        </button>
      </div>
      <div className="px-3">
        <Separator />
      </div>
    </Fragment>
  )
}
