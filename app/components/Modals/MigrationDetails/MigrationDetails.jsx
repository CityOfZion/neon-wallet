// @flow

import React from 'react'
import moment from 'moment'
import classNames from 'classnames'

import FullHeightPanel from '../../Panel/FullHeightPanel'
import SendIcon from '../../../assets/navigation/migration.svg'
import CloseButton from '../../CloseButton'
import CheckMarkIcon from '../../../assets/icons/confirm.svg'
import ClockIcon from '../../../assets/icons/clock.svg'
import BlockExplorerIcon from '../../../assets/icons/info.svg'
import styles from './MigrationDetails.scss'
import BaseModal from '../BaseModal'

const electron = require('electron').remote

type Props = {
  hideModal: () => void,
  tx: {
    time: number,
    tokenname: string,
    assetHash: string,
    destTransactionStatus: Number,
    srcTransactionStatus: number,
    amount: string,
    destAddress: string,
    srcTransactionHash: string,
    destTransactionHash: string,
  },
}

const TokenSaleSuccess = ({ tx, hideModal }: Props) => (
  <BaseModal
    hideModal={hideModal}
    shouldRenderHeader={false}
    style={{
      content: {
        width: '600px',
        height: '90%',
      },
    }}
  >
    <FullHeightPanel
      headerText="Migration Details"
      renderInstructions={false}
      renderHeaderIcon={() => <SendIcon className={styles.migrationIcon} />}
      containerClassName={styles.innerFullHeightContentClass}
      className={styles.detailsContainer}
      renderCloseButton={() => (
        <div className={styles.closeButton} onClick={() => hideModal()}>
          <CloseButton renderWithoutLink />
        </div>
      )}
    >
      <div className={styles.innerContainer}>
        <label className={styles.detailsContainerLabel}>DETAILS</label>

        <div className={styles.detailsContainer}>
          <div className={styles.detailContainer}>
            <label>DESTINATION</label>
            <div> {tx.destAddress}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.detailContainer}>
              <label>TIME</label>
              <div> {moment.unix(tx.time).format('MM/DD/YYYY | HH:mm:ss')}</div>
            </div>
            <div className={styles.detailContainer}>
              <label>STATUS</label>
              <div>
                {/* $FlowFixMe */}
                {tx.destTransactionStatus === 0 &&
                tx.srcTransactionStatus === 0 ? (
                  <div className={styles.statusContainer}>
                    <CheckMarkIcon /> Completed
                  </div>
                ) : (
                  <div className={styles.statusContainerPending}>
                    <ClockIcon />Pending{' '}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <br />
        <label className={styles.detailsContainerLabel}>STATUS</label>

        <div className={classNames([styles.detailsContainer])}>
          <div className={styles.stepContainer}>
            <div className={styles.completedStep} />
            <div
              className={styles.statusDetailContainer}
              onClick={() => {
                electron.shell.openExternal(
                  `https://dora.coz.io/transaction/neo2/mainnet/${
                    tx.srcTransactionHash
                  }`,
                )
              }}
            >
              <p>Processed on Neo Legacy</p>
              <code>{tx.srcTransactionHash}</code>
              <small>
                {' '}
                <BlockExplorerIcon />View on dora
              </small>
            </div>
          </div>
          <div
            className={
              tx.destTransactionHash
                ? styles.stepStatusContainer
                : styles.stepStatusContainerPending
            }
          />
          <div className={styles.stepContainer}>
            {tx.destTransactionHash ? (
              <React.Fragment>
                <div className={styles.completedStep} />
                <div
                  className={styles.statusDetailContainer}
                  onClick={() => {
                    electron.shell.openExternal(
                      `https://dora.coz.io/transaction/neo3/mainnet/${
                        tx.destTransactionHash
                      }`,
                    )
                  }}
                >
                  <p>Processed on Neo N3</p>
                  <code>{tx.destTransactionHash}</code>
                  <small>
                    {' '}
                    <BlockExplorerIcon /> View on dora
                  </small>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className={styles.incompleteStep} />
                <div className={styles.statusDetailContainer}>
                  <p>Processing on Neo N3</p>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </FullHeightPanel>
  </BaseModal>
)

export default TokenSaleSuccess
