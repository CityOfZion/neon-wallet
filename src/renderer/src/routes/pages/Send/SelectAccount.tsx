import { cloneElement, Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { TbChevronRight } from 'react-icons/tb'
import { IAccountState } from '@renderer/@types/store'
import { Button } from '@renderer/components/Button'
import { Separator } from '@renderer/components/Separator'
import { StyleHelper } from '@renderer/helpers/StyleHelper'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'

type TAccountParams = {
  selectedAccount?: IAccountState
  onSelectAccount: (contact: IAccountState) => void
  active: boolean
  title: string
  modalTitle: string
  buttonLabel: string
  leftIcon: JSX.Element
}

export const SelectAccount = ({
  selectedAccount,
  onSelectAccount,
  active,
  title,
  modalTitle,
  buttonLabel,
  leftIcon,
}: TAccountParams) => {
  const { t } = useTranslation('pages', { keyPrefix: 'selectAccount' })
  const { modalNavigateWrapper } = useModalNavigate()

  return (
    <Fragment>
      <div className="flex justify-between h-11 p-3">
        <div className="flex items-center">
          {leftIcon &&
            cloneElement(leftIcon, {
              ...leftIcon.props,
              className: StyleHelper.mergeStyles('text-blue w-5 h-5 mr-3 ml-1', leftIcon.props.className),
            })}
          <span
            className={StyleHelper.mergeStyles({
              'font-bold': active,
            })}
          >
            {title}
          </span>
        </div>
        <Button
          className="flex items-center"
          onClick={modalNavigateWrapper('select-account', {
            state: {
              onSelectAccount: onSelectAccount,
              title: modalTitle,
              buttonLabel: buttonLabel,
              leftIcon,
            },
          })}
          clickableProps={{ className: 'hover:bg-gray-300/15 hover:rounded pr-1' }}
          variant="text"
          colorSchema={active ? 'neon' : 'white'}
          label={selectedAccount ? selectedAccount.name : t('selectAccount')}
          rightIcon={<TbChevronRight />}
          flat
        />
      </div>
      <div className="px-3">
        <Separator />
      </div>
    </Fragment>
  )
}
