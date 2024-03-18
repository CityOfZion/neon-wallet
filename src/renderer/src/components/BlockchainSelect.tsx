import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { TBlockchainServiceKey } from '@renderer/@types/blockchain'
import { StyleHelper } from '@renderer/helpers/StyleHelper'
import { useBsAggregator } from '@renderer/hooks/useBsAggregator'

import { BlockchainIcon } from './BlockchainIcon'
import { Select } from './Select'

type TProps = {
  value?: TBlockchainServiceKey | undefined
  onSelect?: (blockchain: TBlockchainServiceKey) => void
}

export const BlockchainSelect = ({ value, onSelect }: TProps) => {
  const { bsAggregator } = useBsAggregator()
  const { t } = useTranslation('components', { keyPrefix: 'blockchainSelect' })
  const { t: commonT } = useTranslation('common', { keyPrefix: 'blockchain' })

  const options = Object.keys(bsAggregator.blockchainServicesByName) as TBlockchainServiceKey[]

  return (
    <Select.Root value={value} onValueChange={onSelect}>
      <Select.Trigger
        className={StyleHelper.mergeStyles('bg-asphalt', {
          'text-gray-300': !value,
        })}
      >
        <Select.Value placeholder={t('placeholder')}>
          {value && (
            <div className="flex gap-x-2 items-center text-gray-100 text-sm ">
              <BlockchainIcon blockchain={value} type="white" />
              {commonT(value)}
            </div>
          )}
        </Select.Value>

        <Select.Icon className="text-neon" />
      </Select.Trigger>

      <Select.Content>
        {options.map((blockchain, index) => (
          <Fragment key={blockchain}>
            <Select.Item
              value={blockchain}
              className="hover:bg-gray-300/15 flex gap-x-2 items-center cursor-pointer justify-start text-gray-100 text-sm"
            >
              <BlockchainIcon blockchain={blockchain} type="white" />
              <Select.ItemText>{commonT(blockchain)}</Select.ItemText>
            </Select.Item>

            {index + 1 !== options.length && <Select.Separator />}
          </Fragment>
        ))}
      </Select.Content>
    </Select.Root>
  )
}
