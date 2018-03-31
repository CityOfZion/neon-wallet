// @flow
import React from 'react'
import classNames from 'classnames'
import { omit } from 'lodash'

import styles from './TextInput.scss'

type Props = {
  className: ?string,
  type: string,
  renderBefore: ?Function,
  renderAfter: ?Function
}

export default class TextInput extends React.Component<Props> {
  static defaultProps = {
    type: 'text'
  }

  render () {
    const passDownProps = omit(this.props, 'className', 'renderBefore', 'renderAfter')

    return (
      <div className={classNames(styles.textInput, this.props.className)}>
        {this.renderBefore()}
        <input {...passDownProps} className={styles.input} />
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
        {this.props.renderBefore()}
      </div>
    )
  }

  renderAfter = () => {
    if (!this.props.renderAfter) {
      return null
    }

    return (
      <div className={styles.afterInput}>
        {this.props.renderAfter()}
      </div>
    )
  }
}
