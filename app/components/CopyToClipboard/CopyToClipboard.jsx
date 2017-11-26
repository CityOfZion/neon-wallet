// @flow
import React, { Component } from 'react'
import classNames from 'classnames'
import { clipboard } from 'electron'

import Tooltip from '../Tooltip'

import Copy from 'react-icons/lib/md/content-copy'
import CheckCircle from 'react-icons/lib/md/check-circle'

import { ONE_SECOND_MS } from '../../core/time'

import styles from './CopyToClipboard.scss'

type Props = {
    text: string,
    tooltip?: string,
    className?: string,
    style?: Object
}

type State = {
  copyIconShown: boolean
}

class CopyToClipboard extends Component<Props, State> {
  state = {
    copyIconShown: true
  }

  copyText = (text: string) => {
    clipboard.writeText(text)
    this.setState({
      copyIconShown: false
    })
    setTimeout(() => {
      this.setState({
        copyIconShown: true
      })
    }, ONE_SECOND_MS)
  }

  render () {
    const { text, tooltip = '', className = '', style } = this.props
    const { copyIconShown } = this.state
    return (
      <span
        onClick={() => this.copyText(text)}
        className={classNames(styles.copyKey, className)}
        style={style}
      >
        {tooltip ? <Tooltip title={tooltip}>{copyIconShown ? <Copy /> : <CheckCircle />}</Tooltip> : <Copy />}
      </span>)
  }
}

export default CopyToClipboard
