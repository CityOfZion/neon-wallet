// @flow
import React from 'react'
import classNames from 'classnames'

import Cleave from 'cleave.js/react'
import { omit, noop } from 'lodash-es'

import ErrorIcon from '../../../assets/icons/errorRed.svg'

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
  handleMaxClick: Function,
  error?: string,
  customChangeEvent?: boolean,
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
    options: {},
    customChangeEvent: false
  }

  state = {
    active: false
  }

  render = () => {
    const passDownProps = omit(
      this.props,
      'max',
      'options',
      'onChange',
      'className',
      'customChangeEvent',
      'handleMaxClick'
    )

    const className = classNames(styles.numberInput, this.props.className, {
      [styles.active]: this.state.active,
      [styles.error]: !!this.props.error
    })

    const { error } = this.props

    return (
      <div className={className}>
        <Cleave
          {...passDownProps}
          className={styles.cleave}
          options={this.getOptions()}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={
            this.props.customChangeEvent
              ? this.props.onChange
              : this.handleChange
          }
        />
        {error && <ErrorIcon className={styles.errorIcon} />}
        {error && <div className={styles.errorMessage}>{error}</div>}
        {!error && this.renderMaxButton()}
      </div>
    )
  }

  renderMaxButton = () => {
    if (this.props.max !== Infinity) {
      return (
        <Button
          className={styles.maxButton}
          onClick={
            this.props.handleMaxClick
              ? this.props.handleMaxClick
              : this.handleMaxValue
          }
        >
          MAX
        </Button>
      )
    }
  }

  handleFocus = (event: Object, ...args: Array<any>) => {
    this.setState({ active: true })
    event.persist()
    if (this.props.onFocus) {
      this.props.onFocus(event, ...args)
    }
  }

  handleBlur = (event: Object, ...args: Array<any>) => {
    this.setState({ active: false })
    event.persist()
    if (this.props.onBlur) {
      this.props.onBlur(event, ...args)
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

  getOptions = () => ({ ...DEFAULT_OPTIONS, ...this.props.options })
}
