// @flow
import React from 'react'
import classNames from 'classnames'
import ReactModal from 'react-modal'
import Close from 'react-icons/lib/md/close'

import styles from './BaseModal.scss'

type Props = {
    title: string,
    children: React$Node,
    hideModal: Function,
    width?: string,
    height?: string,
    className?: string,
    bodyClassName?: string,
    style: {
      content: Object,
      overlay: Object
    },
    onAfterOpen?: Function,
    shouldCloseWithEscapeKey: boolean
}

const BaseModal = ({
  hideModal,
  title,
  children,
  width,
  height,
  className,
  bodyClassName,
  style,
  onAfterOpen,
  shouldCloseWithEscapeKey
}: Props) => (
  <ReactModal
    isOpen
    onRequestClose={() => shouldCloseWithEscapeKey && hideModal()}
    style={{
      content: {
        width,
        height,
        margin: 'auto',
        padding: 0,
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 4px',
        border: 'none',
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        ...style.content
      },
      overlay: {
        backgroundColor: 'rgba(26, 54, 80, 0.25)',
        margin: 'auto',
        ...style.overlay
      }
    }}
    className={className}
    onAfterOpen={onAfterOpen}
  >
    <div className={styles.modalHeader}>
      <div className={styles.modalHeaderTitle}>{title}</div>
      <div className={styles.modalHeaderCloseButton} onClick={hideModal}><Close /></div>
    </div>
    <div className={classNames(styles.modalBody, bodyClassName)}>{children}</div>
  </ReactModal>
)

BaseModal.defaultProps = {
  width: '450px',
  height: '450px',
  style: {
    content: {},
    overlay: {}
  },
  shouldCloseWithEscapeKey: true
}

export default BaseModal
