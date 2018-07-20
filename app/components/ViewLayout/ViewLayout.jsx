// @flow
import React, { Component } from 'react'
import classNames from 'classnames'

import styles from './ViewLayout.scss'

type Props = {}

export default class ViewLayout extends Component<Props> {
  static defaultProps = {}

  render() {
    return <div className={styles.homeContainer}>hello neon</div>
  }
}
