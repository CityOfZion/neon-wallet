// @flow
import React from 'react'
import classNames from 'classnames'
import { omit } from 'lodash-es'

import styles from './Label.scss'

type Props = {
  label: string,
  className: string
}

export default class Label extends React.Component<Props> {
  render() {
    const { label } = this.props

    const passDownProps = omit(this.props)

    const className = classNames(styles.label, this.props.className)

    return (
      <label {...passDownProps} className={className}>
        {label}
      </label>
    )
  }
}
