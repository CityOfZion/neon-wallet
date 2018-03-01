// @flow
import React from 'react'
import classNames from 'classnames'
import { clipboard } from 'electron'

import Tooltip from '../Tooltip'
import CopyIcon from '../../assets/icons/copy.svg'
import ConfirmIcon from '../../assets/icons/confirm.svg'
import { ONE_SECOND_MS } from '../../core/time'

import styles from './CopyToClipboard.scss'

type Props = {
  className?: string,
  text: string,
  tooltip: string
}

type State = {
  copied: boolean
}

class CopyToClipboard extends React.Component<Props, State> {
  static defaultProps = {
    tooltip: 'Copy'
  }

  state = {
    copied: false
  }

  copyText = (text: string) => {
    clipboard.writeText(text)
    this.setState({ copied: true })
    setTimeout(() => {
      this.setState({ copied: false })
    }, ONE_SECOND_MS)
  }

  render () {
    const { text, tooltip = '', className = '' } = this.props
    const { copied } = this.state

    return (
      <span className={classNames(styles.copyToClipboard, className)} onClick={() => this.copyText(text)}>
        <Tooltip className={styles.tooltip} title={tooltip}>
          {copied ? <ConfirmIcon /> : <CopyIcon />}
        </Tooltip>
      </span>)
  }
}

export default CopyToClipboard
