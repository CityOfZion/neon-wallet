// @flow
import React from 'react'
import styles from './Label.scss'

type Props = {
  label: string
}

export default class Label extends React.Component<Props> {
  render() {
    const { label } = this.props
    return <label className={styles.label}> {label} </label>
  }
}
