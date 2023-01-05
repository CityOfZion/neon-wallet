// @flow
import React from 'react'
import classNames from 'classnames'
import ReactModal from 'react-modal'

import Close from '../../../assets/icons/close.svg'
import Arrow from '../../../assets/icons/arrow.svg'
import Logo from '../../../assets/images/grey-logo.png'
import themes from '../../../themes'
import styles from './BaseModal.scss'

type Props = {
  children: React$Node,
  backButtonAction: Function,
  hideModal: Function,
  width?: string,
  height?: string,
  className?: string,
  bodyClassName?: string,
  style: {
    content: Object,
    overlay: Object,
  },
  onAfterOpen?: Function,
  shouldCloseWithEscapeKey: boolean,
  theme: string,
  shouldRenderHeader: boolean,
  dismissable: boolean,
}

const BaseModal = ({
  backButtonAction,
  hideModal,
  children,
  width,
  height,
  className,
  bodyClassName,
  style,
  onAfterOpen,
  shouldCloseWithEscapeKey,
  theme,
  shouldRenderHeader = true,
  dismissable = true,
}: Props) => (
  <ReactModal
    isOpen
    onRequestClose={() => {
      if (dismissable) {
        return shouldCloseWithEscapeKey && hideModal()
      }
    }}
    style={{
      content: {
        ...themes[theme],
        width,
        height,
        margin: 'auto',
        padding: 0,
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 4px',
        color: 'var(--base-text)',
        border: 'none',
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--panel-background)',
        zIndex: 5000,
        ...style.content,
      },
      overlay: {
        ...themes[theme],
        backgroundColor: 'var(--modal-overlay)',
        margin: 'auto',
        zIndex: 200,
        ...style.overlay,
      },
    }}
    className={className}
    onAfterOpen={onAfterOpen}
  >
    {shouldRenderHeader && (
      <div style={themes[theme]} className={styles.modalHeader}>
        {backButtonAction && (
          <button
            type="button"
            style={themes[theme]}
            className={styles.modalHeaderBackButton}
            onClick={() => {
              backButtonAction()
            }}
          >
            <Arrow />
          </button>
        )}
        <div className={styles.modalHeaderTitle}>
          <img src={Logo} alt="grey-neon-logo" />
        </div>
        <button
          style={themes[theme]}
          type="button"
          className={styles.modalHeaderCloseButton}
          onClick={() => {
            hideModal()
          }}
        >
          <Close />
        </button>
      </div>
    )}
    <div
      style={themes[theme]}
      className={classNames(styles.modalBody, bodyClassName)}
    >
      {children}
    </div>
  </ReactModal>
)

BaseModal.defaultProps = {
  backButtonAction: null,
  width: '450px',
  height: '450px',
  style: {
    content: {},
    overlay: {},
  },
  shouldCloseWithEscapeKey: true,
}

export default BaseModal
