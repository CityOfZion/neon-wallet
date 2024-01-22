import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { TbChevronRight } from 'react-icons/tb'
import { VscCircleFilled } from 'react-icons/vsc'
import { TokenBalance } from '@renderer/@types/query'
import { IAccountState } from '@renderer/@types/store'
import { BlockchainIcon } from '@renderer/components/BlockchainIcon'
import { Separator } from '@renderer/components/Separator'
import { StringHelper } from '@renderer/helpers/StringHelper'
import { StyleHelper } from '@renderer/helpers/StyleHelper'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'

type TTokenParams = {
  selectedAccount?: IAccountState
  selectedToken?: TokenBalance | null
  onSelectToken?: (token: TokenBalance) => void
  active: boolean
  textColor: string
}

export const SelectToken = ({ selectedAccount, selectedToken, onSelectToken, active, textColor }: TTokenParams) => {
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
        <button
          className="flex items-center"
          disabled={!selectedAccount}
          onClick={modalNavigateWrapper('select-token', {
            state: {
              selectedAccount: selectedAccount,
              onSelectToken: onSelectToken,
            },
          })}
        >
          <span className={StyleHelper.mergeStyles('mr-3', textColor && [textColor])}>
            {selectedToken ? (
              <div className="flex">
                <div className="rounded-lg bg-gray-300 w-4.5 h-4.5 flex justify-center items-center">
                  <BlockchainIcon blockchain={selectedToken.blockchain} type="white" className="w-2.5 h-2.5" />
                </div>
                <span className="pl-2" title={selectedToken.token.symbol}>
                  {StringHelper.truncateString(selectedToken.token.symbol, 4)}
                </span>
              </div>
            ) : (
              !selectedToken && t('selectToken')
            )}
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
