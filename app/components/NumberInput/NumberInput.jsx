// @flow
import React from 'react'
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
    const passDownProps = omit(this.props, 'max', 'options', 'onChange')

    return (
      <div className={styles.numberInput}>
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

  handleChange = (event) => {
    this.props.onChange(event.target.rawValue)
  }

  handleMaxValue = () => {
    this.props.onChange(this.props.max)
  }

  getOptions = () => {
    return { ...DEFAULT_OPTIONS, ...this.props.options }
  }
}
