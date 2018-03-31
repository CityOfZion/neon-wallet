// @flow
import React from 'react'
import classNames from 'classnames'

import Cleave from 'cleave.js/react'
import { omit, noop } from 'lodash'

import styles from './NumberInput.scss'
import Button from '../../Button'

const DEFAULT_OPTIONS = {
  numeral: true,
  numeralThousandsGroupStyle: 'thousand',
  numeralPositiveOnly: true,
  stripLeadingZeroes: true
}

type Props = {
  max?: number,
  className?: string,
  onChange?: Function,
  onFocus?: Function,
  onBlur?: Function,
  options?: {
    numeralThousandsGroupStyle?: 'thousand' | 'lakh' | 'wan' | 'none',
    numeralIntegerScale?: number,
    numeralDecimalScale?: number,
    numeralDecimalMark?: string,
    numeralPositiveOnly?: boolean,
    stripLeadingZeroes?: boolean
  }
}

type State = {
  active: boolean
}

export default class NumberInput extends React.Component<Props, State> {
  static defaultProps = {
    max: Infinity,
    onChange: noop,
    options: {}
  }

  state = {
    active: false
  }

  render = () => {
    const passDownProps = omit(this.props, 'max', 'options', 'onChange', 'className')

    const className = classNames(styles.numberInput, this.props.className, {
      [styles.active]: this.state.active
    })

    return (
      <div className={className}>
        <Cleave
          {...passDownProps}
          className={styles.cleave}
          options={this.getOptions()}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange} />
        {this.renderMaxButton()}
      </div>
    )
  }

  renderMaxButton = () => {
    if (this.props.max !== Infinity) {
      return (
        <Button className={styles.maxButton} onClick={this.handleMaxValue}>
          MAX
        </Button>
      )
    }
  }

  handleFocus = (event: Object, ...args: Array<any>) => {
    this.setState({ active: true })
    event.persist()
    this.props.onFocus && this.props.onFocus(event, ...args)
  }

  handleBlur = (event: Object, ...args: Array<any>) => {
    this.setState({ active: false })
    event.persist()
    this.props.onBlur && this.props.onBlur(event, ...args)
  }

  handleChange = (event: Object) => {
    const { onChange } = this.props
    if (onChange) {
      return onChange(event.target.rawValue)
    }
  }

  handleMaxValue = () => {
    const { onChange, max } = this.props
    if (onChange) {
      return onChange(max)
    }
  }

  getOptions = () => {
    return { ...DEFAULT_OPTIONS, ...this.props.options }
  }
}
