// @flow
import React from 'react'

import BaseModal from '../BaseModal'
import Button from '../../Button'
import styles from './ConfirmModal.scss'

type Props = {
    title: string,
    text: string,
    onClick: Function,
    onCancel: Function,
    hideModal: Function,
    width: string,
    height: string,
}

const ConfirmModal = ({ hideModal, title, onClick, onCancel, text, width, height }: Props) => (
  <BaseModal
    title={title}
    hideModal={hideModal}
    style={{
      content: {
        width,
        height
      }
    }}
  >
    <div className={styles.textContainer}>
      <strong className={styles.text}>{text}</strong>
    </div>
    <div className={styles.modalFooter}>
      <Button
        id='confirm'
        className={styles.actionButton}
        onClick={() => {
          onClick()
          hideModal()
        }}>Confirm</Button>
      <Button
        id='cancel'
        cancel
        onClick={() => {
          hideModal()
          if (onCancel) {
            onCancel()
          }
        }}>Cancel</Button>
    </div>
  </BaseModal>
)

ConfirmModal.defaultProps = {
  width: '450px',
  height: '175px'
}

export default ConfirmModal
