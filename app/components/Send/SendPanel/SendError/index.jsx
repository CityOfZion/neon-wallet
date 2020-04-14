// @flow
import React from 'react'
import { FormattedMessage } from 'react-intl'

import ErrorIcon from '../../../../assets/icons/error.svg'
import Button from '../../../Button'
import DialogueBox from '../../../DialogueBox'
import BackIcon from '../../../../assets/icons/arrow.svg'
import WarningIcon from '../../../../assets/icons/warning.svg'
import ActivityLink from '../ActivityLink'
import styles from './SendError.scss'

type Props = {
  resetViewsAfterError: () => any,
  sendErrorMessage: string,
}

const SendError = ({ resetViewsAfterError, sendErrorMessage }: Props) => (
  <section className={styles.sendError}>
    <div className={styles.sendSerrorHeader}>
      <ErrorIcon />
      <div className={styles.sendErrorInfo}>
        <h1 className={styles.sendErrorHeaderTitle}>
          <FormattedMessage id="errors.network.general" />
        </h1>
        <p className={styles.sendErrorSubheader}>
          Error:{' '}
          {sendErrorMessage || <FormattedMessage id="errors.send.network" />}
        </p>
      </div>
    </div>
    <DialogueBox
      icon={<WarningIcon />}
      renderText={() => <ActivityLink error />}
      className={styles.sendErrorDialogueBox}
    />
    <Button
      primary
      renderIcon={() => <BackIcon />}
      onClick={resetViewsAfterError}
      className={styles.sendErrorButton}
    >
      <FormattedMessage id="takeMeBack" />
    </Button>
  </section>
)

export default SendError
