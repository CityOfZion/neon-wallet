// @flow

import React from 'react'

import DialogueBox from '../../../DialogueBox'
import Button from '../../../Button/Button'

import WarningIcon from '../../../../assets/icons/warning.svg'
import CheckMarkIcon from '../../../../assets/icons/confirm.svg'
import ErrorIcon from '../../../../assets/icons/error.svg'

import styles from '../SendPanel.scss'

type Props = {
  handleEditRecipientsClick: () => any
}

const ConfirmSend = ({ handleEditRecipientsClick }: Props) => (
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
      <Button
        primary
        className={styles.confirmSendButtons}
        renderIcon={() => <CheckMarkIcon />}
        type="submit"
      >
        Confirm & Send
      </Button>
    </div>
  </section>
)

export default ConfirmSend
