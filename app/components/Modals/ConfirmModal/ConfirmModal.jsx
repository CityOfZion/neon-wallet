// @flow
import React from 'react'
import { noop } from 'lodash-es'
import { FormattedMessage } from 'react-intl'

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
  renderBody: Function,
  shouldRenderHeader: boolean,
  height: string,
  shouldRenderFooter: boolean,
}

const ConfirmModal = ({
  hideModal,
  title,
  onClick,
  onCancel,
  text,
  renderBody,
  width,
  shouldRenderHeader = false,
  height,
  shouldRenderFooter = true,
}: Props) => (
  <BaseModal
    title={title}
    hideModal={() => hideModal() && onCancel && onCancel()}
    shouldRenderHeader={shouldRenderHeader}
    style={{
      content: {
        width,
        height: height || '200px',
      },
    }}
  >
    <div className={styles.contentContainer}>
      <div className={styles.textContainer}>
        {text && <strong className={styles.text}>{text}</strong>}
        {renderBody && renderBody()}
      </div>
      {shouldRenderFooter && (
        <div className={styles.modalFooter}>
          <Button
            elevated
            id="cancel"
            onClick={() => {
              hideModal()
              onCancel()
            }}
          >
            <FormattedMessage id="modalActionCancel" />
          </Button>
          <Button
            id="confirm"
            primary
            className={styles.actionButton}
            onClick={() => {
              onClick()
              hideModal()
            }}
          >
            <FormattedMessage id="modalActionConfirm" />
          </Button>
        </div>
      )}
    </div>
  </BaseModal>
)

ConfirmModal.defaultProps = {
  width: '500px',
  height: '250px',
  onCancel: noop,
}

export default ConfirmModal
