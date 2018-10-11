// @flow
import React from 'react'

import DialogueBox from '../../../DialogueBox'
import Button from '../../../Button/Button'
import { formatGAS } from '../../../../core/formatters'

import WarningIcon from '../../../../assets/icons/warning.svg'
import CheckMarkIcon from '../../../../assets/icons/confirm.svg'
import ErrorIcon from '../../../../assets/icons/error.svg'

import styles from '../SendPanel.scss'

type Props = {
  handleEditRecipientsClick: () => any,
  fees: number
}

const ConfirmSend = ({ handleEditRecipientsClick, fees }: Props) => (
  <section>
    <DialogueBox
      icon={<WarningIcon />}
      text="Please review and ensure that you have entered the correct details to avoid loss of funds."
    />
    <div className={styles.confirmButtonsContainer}>
      <Button
        className={styles.confirmSendButtons}
        renderIcon={() => <ErrorIcon />}
        onClick={handleEditRecipientsClick}
      >
        Edit Recipients
      </Button>

      <div className={styles.confirmContainer}>
        <Button
          primary
          className={styles.confirmSendButtons}
          renderIcon={() => <CheckMarkIcon />}
          type="submit"
        >
          Confirm & Send
        </Button>
      </div>
    </div>
    {!!fees && (
      <div className={styles.confirmationFees}>
        <p>Fee: {formatGAS(fees)} GAS</p>
      </div>
    )}
  </section>
)

export default ConfirmSend
