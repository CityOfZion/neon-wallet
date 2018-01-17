// @flow
import React from 'react'
import classNames from 'classnames'

import Cleave from 'cleave.js/react'
import { omit, noop } from 'lodash'

import styles from './NumberInput.scss'
import Button from '../Button'

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
  options?: {
    numeralThousandsGroupStyle?: 'thousand' | 'lakh' | 'wan' | 'none',
    numeralIntegerScale?: number,
    numeralDecimalScale?: number,
    numeralDecimalMark?: string,
    numeralPositiveOnly?: boolean,
    stripLeadingZeroes?: boolean
  }
}

export default class NumberInput extends React.Component<Props> {
  static defaultProps = {
    max: Infinity,
    onChange: noop,
    options: {}
  }

  render = () => {
    const { className } = this.props
    const passDownProps = omit(this.props, 'max', 'options', 'onChange', 'className')

    return (
      <div className={classNames(styles.numberInput, className)}>
        <Cleave
          {...passDownProps}
          className={styles.cleave}
          options={this.getOptions()}
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
