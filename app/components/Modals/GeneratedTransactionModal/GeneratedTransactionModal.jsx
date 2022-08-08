// @flow
import React from 'react'
import EditIcon from 'assets/icons/edit.svg'
import { clipboard } from 'electron'
import moment from 'moment'
import fs from 'fs'
import JSONPretty from 'react-json-pretty'

import baseStyles from '../SendModal/SendModal.scss'
import styles from './GeneratedTransactionModal.scss'
import BaseModal from '../BaseModal'
import { ONE_SECOND_MS } from '../../../core/time'
import CopyIcon from '../../../assets/icons/copy.svg'
import ConfirmIcon from '../../../assets/icons/confirm.svg'
import SaveIcon from '../../../assets/icons/save-icon.svg'
import Button from '../../Button'

const electron = require('electron')

type Props = {
  showSuccessNotification: ({ message: string }) => string,
  showErrorNotification: ({ message: string }) => string,
  tx: Object,
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

  handleSave = async () => {
    const { showSuccessNotification, showErrorNotification } = this.props
    const { dialog, app } = electron
    try {
      dialog.showSaveDialog(
        {
          defaultPath: `${app.getPath(
            'documents',
          )}/neon-wallet-transaction-${moment().unix()}`,
          filters: [
            {
              name: 'JSON',
              extensions: ['json'],
            },
          ],
        },
        fileName => {
          if (fileName === undefined) {
            return
          }
          // fileName is a string that contains the path and filename created in the save file dialog.
          fs.writeFile(
            fileName,
            JSON.stringify(this.props.tx, null, 2),
            errorWriting => {
              if (errorWriting) {
                showErrorNotification({
                  message: `An error occurred creating the file: ${
                    errorWriting.message
                  }`,
                })
              } else {
                showSuccessNotification({
                  message: 'The file has been succesfully saved',
                })
              }
            },
          )
        },
      )
    } catch (err) {
      console.error(err)
      showErrorNotification({
        message: `An error occurred creating the file: ${err.message}`,
      })
    }
  }

  render() {
    const { hideModal } = this.props

    return (
      <BaseModal
        title="Generated Transaction"
        hideModal={hideModal}
        bodyClassName={styles.modalBody}
        style={{
          content: { width: '750px', height: '100%', overflow: 'none' },
        }}
      >
        <div className={styles.contentContainer}>
          <div className={baseStyles.header}>
            <EditIcon className={baseStyles.icon} />
            <div className={baseStyles.title}>Generated Transaction</div>
          </div>

          <div className={baseStyles.divider} />

          <div className={baseStyles.section}>
            <div className={baseStyles.sectionContent}>
              Login with a private key, or ledger in order to sign and broadcast
              to the network.
            </div>
          </div>

          <div className={baseStyles.section}>
            <div className={baseStyles.sectionTitle}>TRANSACTION OUPUT</div>{' '}
            <div className={styles.transactionOutput}>
              <JSONPretty
                id="json-pretty"
                data={JSON.stringify(this.props.tx)}
              />
            </div>
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
