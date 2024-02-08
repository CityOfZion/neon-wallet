import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbStepOut } from 'react-icons/tb'
import { TokenBalance } from '@renderer/@types/query'
import { IAccountState } from '@renderer/@types/store'
import { Button } from '@renderer/components/Button'
import { TokenBalanceList } from '@renderer/components/TokenBalanceList'
import { useBalancesAndExchange } from '@renderer/hooks/useBalancesAndExchange'
import { useModalNavigate, useModalState } from '@renderer/hooks/useModalRouter'
import { EndModalLayout } from '@renderer/layouts/EndModal'

type TTokenState = {
  selectedAccount: IAccountState
  onSelectToken: (token: TokenBalance) => void
}

export const SelectToken = () => {
  const { t } = useTranslation('modals', { keyPrefix: 'selectToken' })
  const { modalNavigate } = useModalNavigate()
  const { selectedAccount, onSelectToken } = useModalState<TTokenState>()
  const balanceExchange = useBalancesAndExchange(selectedAccount)
  const [selectedToken, setSelectedToken] = useState<TokenBalance | null>(null)

  const selectToken = () => {
    if (!selectedToken) {
      return
    }
    onSelectToken(selectedToken)
    modalNavigate(-1)
  }

  return (
    <EndModalLayout heading={t('title')} headingIcon={<TbStepOut />}>
      <section className="w-full flex flex-col h-full items-center">
        <h2 className="text-sm text-left w-full pl-[0.2em]">{t('yourBalances')}</h2>
        <main className="w-full overflow-y-auto flex-grow my-3 flex flex-col basis-0">
          <TokenBalanceList balanceExchange={balanceExchange} onTokenSelected={setSelectedToken} />
        </main>

        <Button
          className="w-[16rem]"
          type="submit"
          label={t('selectToken')}
          disabled={!selectedToken}
          onClick={selectToken}
        />
      </section>
    </EndModalLayout>
  )
}
