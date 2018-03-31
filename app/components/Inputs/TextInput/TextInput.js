// @flow
import React from 'react'
import classNames from 'classnames'
import { omit } from 'lodash'

import styles from './TextInput.scss'

type Props = {
  className: ?string,
  type: string,
  renderBefore: ?Function,
  renderAfter: ?Function,
  onFocus: ?Function,
  onBlur: ?Function
}

type State = {
  active: boolean
}

export default class TextInput extends React.Component<Props, State> {
  static defaultProps = {
    type: 'text'
  }

  state = {
    active: false
  }

  render () {
    const passDownProps = omit(this.props, 'className', 'renderBefore', 'renderAfter')

    const className = classNames(styles.textInput, this.props.className, {
      [styles.active]: this.state.active
    })

    return (
      <div className={className}>
        {this.renderBefore()}
        <input
          {...passDownProps}
          className={styles.input}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        {this.renderAfter()}
      </div>
    )
  }

  renderBefore = () => {
    if (!this.props.renderBefore) {
      return null
    }

    return (
      <div className={styles.beforeInput}>
        {this.props.renderBefore({ active: this.state.active })}
      </div>
    )
  }

  renderAfter = () => {
    if (!this.props.renderAfter) {
      return null
    }

    return (
      <div className={styles.afterInput}>
        {this.props.renderAfter({ active: this.state.active })}
      </div>
    )
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
}
