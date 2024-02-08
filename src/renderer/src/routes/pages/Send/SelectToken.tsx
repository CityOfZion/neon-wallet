import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { TbChevronRight } from 'react-icons/tb'
import { VscCircleFilled } from 'react-icons/vsc'
import { TokenBalance } from '@renderer/@types/query'
import { IAccountState } from '@renderer/@types/store'
import { BlockchainIcon } from '@renderer/components/BlockchainIcon'
import { Button } from '@renderer/components/Button'
import { Separator } from '@renderer/components/Separator'
import { StringHelper } from '@renderer/helpers/StringHelper'
import { StyleHelper } from '@renderer/helpers/StyleHelper'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'

type TTokenParams = {
  selectedAccount?: IAccountState
  selectedToken?: TokenBalance | null
  onSelectToken?: (token: TokenBalance) => void
  active: boolean
}

export const SelectToken = ({ selectedAccount, selectedToken, onSelectToken, active }: TTokenParams) => {
  const { t } = useTranslation('pages', { keyPrefix: 'send' })
  const { modalNavigateWrapper } = useModalNavigate()

  return (
    <Fragment>
      <div className="flex justify-between h-11 p-3">
        <div className="flex items-center">
          <VscCircleFilled className="text-gray-300 w-2 h-2 mr-[1.09rem] ml-[0.65rem]" />
          <span
            className={StyleHelper.mergeStyles({
              'font-bold': active,
            })}
          >
            {t('tokenToSend')}
          </span>
        </div>
        <Button
          className="flex items-center"
          onClick={modalNavigateWrapper('select-token', {
            state: {
              selectedAccount: selectedAccount,
              onSelectToken: onSelectToken,
            },
          })}
          clickableProps={{ className: selectedAccount ? 'hover:bg-gray-300/15 hover:rounded pr-1' : 'pr-1' }}
          variant="text"
          colorSchema={active ? 'neon' : 'white'}
          disabled={selectedAccount ? false : true}
          label={selectedToken ? StringHelper.truncateString(selectedToken.token.symbol, 4) : t('selectToken')}
          leftIcon={
            selectedToken ? (
              <div className="rounded-lg bg-gray-300 w-4.5 h-4.5 flex justify-center items-center">
                <BlockchainIcon blockchain={selectedToken.blockchain} type="white" className="w-2.5 h-2.5" />
              </div>
            ) : undefined
          }
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
