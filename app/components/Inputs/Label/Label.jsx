// @flow
import React from 'react'
import classNames from 'classnames'

import styles from './Label.scss'

type Props = {
  label: string,
  loading: boolean,
  children: React$Node,
  labelClassName: string,
  labelContainerClassName: string,
  renderAdditionalContent: () => React$Node
}

export default class Label extends React.Component<Props> {
  render() {
    const {
      label,
      loading,
      children,
      labelClassName,
      labelContainerClassName,
      renderAdditionalContent,
      ...passDownProps
    } = this.props

    const combinedLabelClassName = classNames(
      styles.label,
      this.props.labelClassName
    )
    const combinedLabelContainerClassName = classNames(
      styles.labelContainer,
      this.props.labelContainerClassName
    )

    return (
      <div className={combinedLabelContainerClassName}>
        <label {...passDownProps} className={combinedLabelClassName}>
          {label}
        </label>
        {children}
      </div>
    )
  }
}
