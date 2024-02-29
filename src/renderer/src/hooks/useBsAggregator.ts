import { useMemo } from 'react'
import { BSAggregator } from '@cityofzion/blockchain-service'
import { BSEthereum } from '@cityofzion/bs-ethereum'
import { BSNeoLegacy } from '@cityofzion/bs-neo-legacy'
import { BSNeo3 } from '@cityofzion/bs-neo3'
import { TBlockchainServiceKey } from '@renderer/@types/blockchain'

import { useNetworkTypeSelector } from './useSettingsSelector'

export const useBsAggregator = () => {
  const { networkType } = useNetworkTypeSelector()

  const bsAggregator = useMemo(() => {
    return new BSAggregator<TBlockchainServiceKey>({
      neo3: new BSNeo3('neo3', { type: networkType }),
      neoLegacy: new BSNeoLegacy('neoLegacy', { type: networkType }),
      ethereum: new BSEthereum('ethereum', { type: networkType }, import.meta.env.RENDERER_VITE_BITQUERY_API_KEY ?? ''),
    })
  }, [networkType])

  return {
    bsAggregator,
  }
}
