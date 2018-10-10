// @flow
import React from 'react'

import StyledReactSelect from '../StyledReactSelect/StyledReactSelect'
import styles from './AssetInput.scss'

type Props = {
  symbols: Array<SymbolType>,
  onChange: Function
}

type State = {
  selectedAsset: Object
}

export default class AssetInput extends React.Component<Props, State> {
  parsedSymbols = this.props.symbols.map(symbol => ({
    value: symbol,
    label: symbol
  }))

  state = {
    selectedAsset: this.parsedSymbols[0]
  }

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
