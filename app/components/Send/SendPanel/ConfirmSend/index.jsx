// @flow
import React from 'react'
import { FormattedMessage } from 'react-intl'

import DialogueBox from '../../../DialogueBox'
import Button from '../../../Button/Button'
import { formatGAS } from '../../../../core/formatters'
import WarningIcon from '../../../../assets/icons/warning.svg'
import CheckMarkIcon from '../../../../assets/icons/confirm.svg'
import ErrorIcon from '../../../../assets/icons/error.svg'

import styles from '../SendPanel.scss'

type Props = {
  handleEditRecipientsClick: () => any,
  fees: number,
  pendingTransaction: boolean,
}

const ConfirmSend = ({
  handleEditRecipientsClick,
  fees,
  pendingTransaction,
}: Props) => (
  <section>
    <DialogueBox
      icon={<WarningIcon />}
      text={<FormattedMessage id="sendDisclaimer" />}
    />
    <div className={styles.confirmButtonsContainer}>
      <Button
        className={styles.confirmSendButtons}
        renderIcon={() => <ErrorIcon />}
        onClick={handleEditRecipientsClick}
        disabled={pendingTransaction}
      >
        <FormattedMessage id="editRecipients" />
      </Button>

      <div className={styles.confirmContainer}>
        <Button
          primary
          className={styles.confirmSendButtons}
          renderIcon={() => <CheckMarkIcon />}
          type="submit"
          disabled={pendingTransaction}
        >
          <FormattedMessage id="confirmAndSend" />
        </Button>
      </div>
    </div>
    {!!fees && (
      <div className={styles.confirmationFees}>
        <p>
          {' '}
          <FormattedMessage id="fee" /> {formatGAS(fees)} GAS
        </p>
      </div>
    )}
  </section>
)

export default ConfirmSend
