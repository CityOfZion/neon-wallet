import React from 'react'
import { TBlockchainImageColor, TBlockchainServiceKey } from '@renderer/@types/blockchain'
import { blockchainIconsByBlockchain } from '@renderer/constants/blockchain'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

type Props = React.SVGProps<SVGSVGElement> & {
  blockchain: TBlockchainServiceKey
  type?: TBlockchainImageColor
}

export const BlockchainIcon = React.memo(({ blockchain, type = 'gray', ...props }: Props) => {
  const Component = blockchainIconsByBlockchain[blockchain][type]

  return <Component {...props} className={StyleHelper.mergeStyles('w-4 h-4 object-contain', props.className)} />
})
