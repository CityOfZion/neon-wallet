// @flow
import React from 'react'
import classNames from 'classnames'
import { omit, noop } from 'lodash'

import SelectInput from '../SelectInput'
import styles from './AssetInput.scss'

type Props = {
  className?: string,
  value?: string,
  symbols: Array<SymbolType>,
  onChange: Function,
  onFocus: Function,
  onBlur: Function
}

type State = {
  typingValue: string
}

export default class AssetInput extends React.Component<Props, State> {
  static defaultProps = {
    onChange: noop,
    onFocus: noop,
    onBlur: noop
  }

  state = {
    typingValue: this.props.value || ''
  }

  render = () => {
    const passDownProps = omit(this.props, 'symbols')
    const { typingValue } = this.state

    return (
      <SelectInput
        {...passDownProps}
        value={typingValue}
        className={classNames(styles.assetInput, this.props.className)}
        items={this.props.symbols}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur} />
    )
  }

  handleChange = (value: string) => {
    const { symbols, onChange } = this.props

    this.setState({ typingValue: value }, () => {
      if (symbols.includes(value)) {
        onChange(value)
      }
    })
  }

  handleFocus = (event: Object) => {
    const { value, onFocus } = this.props

    this.setState({ typingValue: value })
    event.persist()
    onFocus()
  }

  handleBlur = (event: Object) => {
    const { symbols, value, onBlur } = this.props
    const { typingValue } = this.state

    if (!symbols.includes(typingValue)) {
      this.setState({ typingValue: value })
    }

    event.persist()
    onBlur(event)
  }
}
