// @flow
import React from 'react'
import { noop } from 'lodash-es'
import { FormattedMessage } from 'react-intl'

import BaseModal from '../BaseModal'
import Button from '../../Button'
import styles from './styles.scss'
import LoginLedgerNanoS from '../../../containers/LoginLedgerNanoS'

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

type State = {
  continueButtonDisabled: boolean,
}

class LedgerMigrationConfirm extends React.Component<Props, State> {
  state = {
    continueButtonDisabled: true,
  }

  render() {
    const {
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
    } = this.props

    return (
      <BaseModal
        title={title}
        hideModal={() => hideModal() && onCancel && onCancel()}
        shouldRenderHeader={shouldRenderHeader}
        style={{
          content: {
            width,
            height,
          },
        }}
      >
        <div className={styles.contentContainer}>
          <div className={styles.textContainer}>
            {text && <strong className={styles.text}>{text}</strong>}
            {renderBody && renderBody()}
          </div>
          <div className={styles.formWrapper}>
            <LoginLedgerNanoS
              chain="neo2"
              hideFormElements
              onAppOpen={isOpen =>
                this.setState({ continueButtonDisabled: !isOpen })
              }
            />
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
                disabled={this.state.continueButtonDisabled}
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
  }
}

// $FlowFixMe
LedgerMigrationConfirm.defaultProps = {
  width: '500px',
  height: '250px',
  onCancel: noop,
  shouldRenderHeader: false,
  shouldRenderFooter: true,
}

export default LedgerMigrationConfirm
