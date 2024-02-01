import { ComponentProps, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TBlockchainServiceKey } from '@renderer/@types/blockchain'
import { useBsAggregatorSelector } from '@renderer/hooks/useBlockchainSelector'

import { BlockchainIcon } from './BlockchainIcon'
import { Checkbox } from './Checkbox'
import { SearchInput } from './SearchInput'
import { Separator } from './Separator'

type TProps = Omit<ComponentProps<'div'>, 'onSelect'> & {
  onSelect: (blockchain: TBlockchainServiceKey) => void
  selected?: TBlockchainServiceKey | null
}

export const BlockchainSelection = ({ selected, onSelect, ...props }: TProps) => {
  const { t } = useTranslation('components', { keyPrefix: 'blockchainSelection' })
  const { t: blockchainT } = useTranslation('common', { keyPrefix: 'blockchain' })
  const { bsAggregatorRef } = useBsAggregatorSelector()

  const [search, setSearch] = useState<string | null>(null)

  const filteredBlockchain = useMemo(() => {
    const blockchainServices = Object.keys(bsAggregatorRef.current.blockchainServicesByName) as TBlockchainServiceKey[]

    if (search) {
      return blockchainServices.filter(blockchain =>
        blockchain.toLocaleLowerCase().includes(search.toLocaleLowerCase() as string)
      )
    }

    return blockchainServices
  }, [search, bsAggregatorRef])

  const handleCheckboxChange = (service: TBlockchainServiceKey) => {
    onSelect(service)
  }

  return (
    <div {...props}>
      <SearchInput placeholder={t('search')} onChange={event => setSearch(event.target.value)} compacted />

      <Separator className="my-8" />

      <ul className="flex flex-col gap-2.5">
        {filteredBlockchain &&
          filteredBlockchain.map((service, index) => (
            <li className="flex flex-row items-center justify-between h-12 rounded bg-asphalt p-5" key={index}>
              <div className="flex flex-row gap-x-2">
                <BlockchainIcon blockchain={service} type="white" className="opacity-60" />
                {blockchainT(service)}
              </div>

              <Checkbox onCheckedChange={() => handleCheckboxChange(service)} checked={selected === service} />
            </li>
          ))}
      </ul>
    </div>
  )
}
