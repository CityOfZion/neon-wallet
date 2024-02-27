import { BSAggregator } from '@cityofzion/blockchain-service'
import { BSEthereum } from '@cityofzion/bs-ethereum'
import { BSNeoLegacy } from '@cityofzion/bs-neo-legacy'
import { BSNeo3 } from '@cityofzion/bs-neo3'
import { TBlockchainServiceKey } from '@renderer/@types/blockchain'

import { useAppSelector } from './useRedux'

export const useBsAggregatorSelector = () => {
  const { ref, value } = useAppSelector(
    state =>
      new BSAggregator<TBlockchainServiceKey>({
        neo3: new BSNeo3('neo3', { type: state.settings.networkType }),
        neoLegacy: new BSNeoLegacy('neoLegacy', { type: state.settings.networkType }),
        ethereum: new BSEthereum(
          'ethereum',
          { type: state.settings.networkType },
          import.meta.env.BITQUERY_API_KEY ?? ''
        ),
      })
  )
  return {
    bsAggregator: value,
    bsAggregatorRef: ref,
  }
}
