// @flow
import React from 'react'

import ErrorIcon from '../../../../assets/icons/error.svg'
import Button from '../../../Button'
import DialogueBox from '../../../DialogueBox'

import BackIcon from '../../../../assets/icons/arrow.svg'
import WarningIcon from '../../../../assets/icons/warning.svg'

import styles from './SendError.scss'

type Props = {
  resetViewsAfterError: () => any,
  sendErrorMessage: string
}

const SendError = ({ resetViewsAfterError, sendErrorMessage }: Props) => (
  <section className={styles.sendError}>
    <div className={styles.sendSerrorHeader}>
      <ErrorIcon />
      <div className={styles.sendErrorInfo}>
        <h1 className={styles.sendErrorHeaderTitle}>
          Oops! Something went wrong.
        </h1>
        <p className={styles.sendErrorSubheader}>
          Error: {sendErrorMessage || 'A network error has occurred'}
        </p>
      </div>
    </div>
    <DialogueBox
      icon={<WarningIcon />}
      text="Your transaction has not been processed. Press the button below to go back and try again."
      className={styles.sendErrorDialogueBox}
    />
    <Button
      primary
      renderIcon={() => <BackIcon />}
      onClick={resetViewsAfterError}
      className={styles.sendErrorButton}
    >
      Take me back
    </Button>
  </section>
)

export default SendError
