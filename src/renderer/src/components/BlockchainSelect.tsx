import { useTranslation } from 'react-i18next'
import * as RadixSelect from '@radix-ui/react-select'
import { TBlockchainServiceKey } from '@renderer/@types/blockchain'
import { StyleHelper } from '@renderer/helpers/StyleHelper'
import { useBsAggregator } from '@renderer/hooks/useBsAggregator'

import { BlockchainIcon } from './BlockchainIcon'
import { Select } from './Select'
import { Separator } from './Separator'

type TItemProps = {
  blockchain: TBlockchainServiceKey
  className?: string
}

type TProps = {
  selected?: TBlockchainServiceKey | undefined
  onSelect?: (blockchain: TBlockchainServiceKey) => void
}

const Item = ({ blockchain }: TItemProps) => {
  return (
    <RadixSelect.Item value={blockchain} className="outline-none hover:bg-gray-700 cursor-pointer">
      <Separator />
      <ItemContent blockchain={blockchain} className="px-3 py-2" />
    </RadixSelect.Item>
  )
}

const ItemContent = ({ blockchain, className }: TItemProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'blockchain' })
  return (
    <div className={StyleHelper.mergeStyles('flex flex-row gap-x-2 items-center text-gray-100 text-sm', className)}>
      <BlockchainIcon blockchain={blockchain} type="white" />
      {t(blockchain)}
    </div>
  )
}

export const BlockchainSelect = ({ selected, onSelect }: TProps) => {
  const { bsAggregator } = useBsAggregator()
  const { t } = useTranslation('components', { keyPrefix: 'blockchainSelect' })

  const handleValueChange = (value: string) => {
    const blockchain = (Object.keys(bsAggregator.blockchainServicesByName) as TBlockchainServiceKey[]).find(
      blockchain => blockchain === value
    )
    if (!blockchain) return
    onSelect?.(blockchain)
  }

  return (
    <Select.Root
      title={selected ? <ItemContent blockchain={selected} /> : t('placeholder')}
      onSelect={handleValueChange}
      triggerClassName="bg-asphalt"
      contentClassName="w-[18.625rem] bg-asphalt"
      expandIconClassName="text-neon"
    >
      {(Object.keys(bsAggregator.blockchainServicesByName) as TBlockchainServiceKey[]).map(blockchain => (
        <Item key={blockchain} blockchain={blockchain} />
      ))}
    </Select.Root>
  )
}
