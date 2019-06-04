// @flow
import React from 'react'
import EditIcon from 'assets/icons/edit.svg'
import { clipboard } from 'electron'
import moment from 'moment'
import fs from 'fs'

import baseStyles from '../SendModal/SendModal.scss'
import styles from './ImportTransactionModal.scss'
import BaseModal from '../BaseModal'
import { ONE_SECOND_MS } from '../../../core/time'
import CopyIcon from '../../../assets/icons/copy.svg'
import ConfirmIcon from '../../../assets/icons/confirm.svg'
import ImportIcon from '../../../assets/icons/import.svg'
import Button from '../../Button'
import SaveIcon from '../../../assets/icons/save-icon.svg'

// const electron = require('electron').remote

type Props = {
  // showSuccessNotification: ({ message: string }) => string,
  // showErrorNotification: ({ message: string }) => string,
  // tx: Object,
  hideModal: () => void,
}

type State = {
  copied: boolean,
}

export default class GeneratedTransactionModal extends React.Component<
  Props,
  State,
> {
  state = {
    copied: false,
  }

  copyText = (text: string) => {
    clipboard.writeText(text)
    this.setState({ copied: true })
    setTimeout(() => {
      this.setState({ copied: false })
    }, ONE_SECOND_MS)
  }

  handleSave = async () => {}

  render() {
    const { hideModal } = this.props
    console.log('fsdfsdfds')
    console.log(styles)

    return (
      <BaseModal
        title="Import Transaction"
        hideModal={hideModal}
        bodyClassName={styles.modalBody}
        style={{ content: { width: '750px', height: '100%' } }}
      >
        <div className={styles.contentContainer}>
          <div className={baseStyles.header}>
            <ImportIcon className={baseStyles.icon} />
            <div className={baseStyles.title}>Import Transaction</div>
          </div>

          <div className={baseStyles.divider} />

          <div className={baseStyles.section}>
            <div className={baseStyles.sectionContent}>
              If you have produced a transction from a watch only address you
              can sign it below or import an already signed transaction.
            </div>
          </div>

          <div className={baseStyles.section}>
            <textarea />
            {/* <div className={baseStyles.sectionTitle}>TRANSACTION OUPUT</div>{' '}
            <div className={styles.transactionOutput}>
              <pre>{JSON.stringify(this.props.tx, null, 2)}</pre>
            </div> */}
          </div>
          <div className={styles.buttonContainer}>
            <Button
              shouldCenterButtonLabelText
              className={styles.submitButton}
              renderIcon={() =>
                this.state.copied ? <ConfirmIcon /> : <CopyIcon />
              }
              type="submit"
              onClick={() => this.copyText(JSON.stringify(this.props.tx))}
            >
              Copy Code
            </Button>
            <Button
              shouldCenterButtonLabelText
              primary
              className={styles.submitButton}
              renderIcon={() => <SaveIcon />}
              type="submit"
              onClick={this.handleSave}
            >
              Save
            </Button>
          </div>
        </div>
      </BaseModal>
    )
  }
}
