import React from 'react'
import { TBlockchainImageColor, TBlockchainServiceKey } from '@renderer/@types/blockchain'
import { blockchainIconsByBlockchain } from '@renderer/constants/blockchain'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

type Props = React.ComponentProps<'img'> & {
  blockchain: TBlockchainServiceKey
  type?: TBlockchainImageColor
}

export const BlockchainIcon = React.memo(({ blockchain, type = 'default', ...props }: Props) => {
  const source = blockchainIconsByBlockchain[blockchain][type]

  return <img src={source} {...props} className={StyleHelper.mergeStyles('w-4 h-4 object-contain', props.className)} />
})
