// @flow
import React from 'react'

import StyledReactSelect from '../StyledReactSelect/StyledReactSelect'
import { ASSETS, TOKENS } from '../../../core/constants'

type Props = {
  symbols: Array<SymbolType>,
  onChange: Function
}

type State = {
  selectedAsset: Object
}

function parsedSymbols(
  symbols = [ASSETS.NEO, ASSETS.GAS, ...Object.keys(TOKENS)]
): Array<{ value: string, label: string }> {
  return symbols.map(symbol => ({
    value: symbol,
    label: symbol
  }))
}

export default class AssetInput extends React.Component<Props, State> {
  state = {
    selectedAsset: this.parsedSymbols[0]
  }

  parsedSymbols = parsedSymbols(this.props.symbols)

  render() {
    const { selectedAsset } = this.state

    return (
      <StyledReactSelect
        value={selectedAsset}
        onChange={option => this.handleChange(option)}
        options={this.parsedSymbols}
        isSearchable={false}
      />
    )
  }

  handleChange = (selectedAsset: Object) => {
    const { onChange } = this.props
    this.setState({ selectedAsset }, () => {
      onChange(selectedAsset.value)
    })
  }
}
