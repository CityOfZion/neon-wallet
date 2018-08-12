// @flow
import React from 'react'

import SelectInput from '../../Inputs/SelectInput'

type Props = {
  className?: string,
  childClassName?: string,
  explorers: array,
  explorer: string,
  updateExplorerSettings: ?Function
}

const BlockExplorerSelect = ({ className, childClassName, explorers, explorer, updateExplorerSettings }: Props) => (
    <div className={className}>
      <span className={childClassName}>BLOCK EXPLORER</span>
      <SelectInput
        items={Object.keys(explorers).map(value => explorers[value])}
        value={explorer}
        onChange={updateExplorerSettings}
      />
    </div>
)

export default BlockExplorerSelect
