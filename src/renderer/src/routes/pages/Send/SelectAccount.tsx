import { cloneElement } from 'react'
import { useTranslation } from 'react-i18next'
import { TbChevronRight } from 'react-icons/tb'
import { IAccountState } from '@renderer/@types/store'
import { Button } from '@renderer/components/Button'
import { StringHelper } from '@renderer/helpers/StringHelper'
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
    <div className="flex justify-between my-1">
      <div className="flex items-center gap-3">
        {leftIcon &&
          cloneElement(leftIcon, {
            ...leftIcon.props,
            className: StyleHelper.mergeStyles('text-blue w-5 h-5', leftIcon.props.className),
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
        variant="text"
        clickableProps={{
          className: 'text-sm pl-3 pr-1',
        }}
        colorSchema={active ? 'neon' : 'white'}
        label={selectedAccount ? StringHelper.truncateString(selectedAccount.name, 40) : t('selectAccount')}
        rightIcon={<TbChevronRight />}
        flat
      />
    </div>
  )
}
