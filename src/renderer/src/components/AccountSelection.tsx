import { useTranslation } from 'react-i18next'
import { TBlockchainServiceKey } from '@renderer/@types/blockchain'

import { BlockchainIcon } from './BlockchainIcon'
import { Checkbox } from './Checkbox'
import { Separator } from './Separator'

type TRootProps = {
  blockchain: TBlockchainServiceKey
  children: React.ReactNode
}

type TItemProps = {
  onCheckedChange?(checked: boolean): void
  address: string
  label?: string
}

const Root = ({ blockchain, children }: TRootProps) => {
  const { t: blockchainT } = useTranslation('common', { keyPrefix: 'blockchain' })

  return (
    <div className="rounded bg-asphalt p-2 gap-y-4">
      <div className="flex p-2 gap-x-2 items-center">
        <BlockchainIcon blockchain={blockchain} type="white" />
        {blockchainT(blockchain)}
      </div>

      <Separator />

      <ul className="flex flex-col w-full p-2 gap-y-2 items-center justify-between">{children}</ul>
    </div>
  )
}

const Item = ({ onCheckedChange, address, label }: TItemProps) => {
  return (
    <li className="flex flex-col w-full gap-y-0.5 text-white text-xs">
      <span className="text-gray-300">{label}</span>
      <div className="flex gap-x-2 justify-between">
        <span className="block truncate min-w-0">{address}</span>
        <Checkbox defaultChecked onCheckedChange={onCheckedChange} />
      </div>
    </li>
  )
}

export const AccountSelection = {
  Root,
  Item,
}
