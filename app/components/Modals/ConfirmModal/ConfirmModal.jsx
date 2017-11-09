// @flow
import React from 'react'
import BaseModal from '../BaseModal'
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
      <button
        className={styles.actionButton}
        onClick={() => {
          onClick()
          hideModal()
        }}>Confirm</button>
      <button
        className={styles.cancelButton}
        onClick={() => {
          hideModal()
          if (onCancel) {
            onCancel()
          }
        }}>Cancel</button>
    </div>
  </BaseModal>
)

ConfirmModal.defaultProps = {
  width: '450px',
  height: '175px'
}

export default ConfirmModal
