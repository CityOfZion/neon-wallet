import { useAppSelector } from './useRedux'

export const useBsAggregatorSelector = () => {
  const { ref, value } = useAppSelector(state => state.blockchain.bsAggregator)
  return {
    bsAggregator: value,
    bsAggregatorRef: ref,
  }
}
