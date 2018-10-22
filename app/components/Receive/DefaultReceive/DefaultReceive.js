// @flow
import React from 'react'

import DialogueBox from '../../DialogueBox'
import WarningIcon from '../../../assets/icons/warning.svg'
import CopyIcon from '../../../assets/icons/copy.svg'
import ConfirmIcon from '../../../assets/icons/confirm.svg'

import Button from '../../Button'
import styles from '../ReceivePanel/styles.scss'

type Props = {
  address: string,
  copied: boolean,
  handleCopy: (?HTMLCanvasElement, string) => Promise<void>,
  handleCreateCanvas: (?HTMLCanvasElement, string) => any
}

export default class ReceivePanel extends React.Component<Props> {
  publicCanvas: ?HTMLCanvasElement

  componentDidMount() {
    const { address } = this.props
    this.props.handleCreateCanvas(this.publicCanvas, address)
  }

  render() {
    return (
      <div className={styles.defaultReceiveContainer}>
        <canvas
          ref={node => {
            this.publicCanvas = node
          }}
        />
        <DialogueBox
          icon={
            <WarningIcon
              className={styles.warningIcon}
              height={60}
              width={60}
            />
          }
          renderText={() => (
            <div>
              Only send assets that are{' '}
              <b>compatible with the NEO blockchain (NEO, GAS, etc.)</b>.
              Sending other assets will result in permanent loss.{' '}
            </div>
          )}
          className={styles.warningDialogue}
        />
        <Button
          shouldCenterButtonLabelText
          primary
          className={styles.submitButton}
          renderIcon={() =>
            this.props.copied ? <ConfirmIcon /> : <CopyIcon />
          }
          type="submit"
          onClick={() =>
            this.props.handleCopy(this.publicCanvas, 'public-address')
          }
        >
          Copy Code Image
        </Button>
      </div>
    )
  }
}
