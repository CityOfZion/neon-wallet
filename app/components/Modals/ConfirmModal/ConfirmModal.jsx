// @flow
import React from 'react'
import { noop } from 'lodash-es'

import BaseModal from '../BaseModal'
import Button from '../../Button'
import styles from './ConfirmModal.scss'

type Props = {
  title: string,
  text: string,
  onClick: Function,
  onCancel: Function,
  hideModal: Function,
  width: string
}

const ConfirmModal = ({
  hideModal,
  title,
  onClick,
  onCancel,
  text,
  width
}: Props) => (
  <BaseModal
    title={title}
    hideModal={hideModal}
    shouldRenderHeader={false}
    style={{
      content: {
        width,
        height: '200px'
      }
    }}
  >
    <div className={styles.contentContainer}>
      <div className={styles.textContainer}>
        <strong className={styles.text}>{text}</strong>
      </div>
      <div className={styles.modalFooter}>
        <Button
          id="confirm"
          primary
          className={styles.actionButton}
          onClick={() => {
            onClick()
            hideModal()
          }}
        >
          Confirm
        </Button>
        <Button
          id="cancel"
          onClick={() => {
            hideModal()
            onCancel()
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  </BaseModal>
)

ConfirmModal.defaultProps = {
  width: '500px',
  height: '250px',
  onCancel: noop
}

export default ConfirmModal
