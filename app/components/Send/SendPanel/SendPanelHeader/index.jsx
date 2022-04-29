// @flow
import React from 'react'
import { injectIntl, IntlShape, FormattedMessage } from 'react-intl'

import ImportIcon from '../../../../assets/icons/import.svg'
import AddIcon from '../../../../assets/icons/add.svg'
import GridIcon from '../../../../assets/icons/grid.svg'
import LightningIcon from '../../../../assets/icons/lightning.svg'
import PanelHeaderButton from '../../../PanelHeaderButton/PanelHeaderButton'

import styles from '../SendPanel.scss'

type Props = {
  sendRowDetails: Array<*>,
  addRow: (row?: Object) => any,
  resetViews: () => any,
  showConfirmSend: boolean,
  sendSuccess: boolean,
  sendError: boolean,
  noSendableAssets: boolean,
  disableAddRecipient: boolean,
  disableEnterQRCode: boolean,
  hasNetworkFees: boolean,
  maxNumberOfRecipients: number,
  showSendModal: (props: Object) => any,
  pushQRCodeData: (data: Object) => any,
  showImportModal: (props: Object) => void,
  intl: IntlShape,
  chain: string,
}

const SendPanelHeader = ({
  sendRowDetails,
  addRow,
  showConfirmSend,
  resetViews,
  sendError,
  sendSuccess,
  noSendableAssets,
  disableAddRecipient,
  disableEnterQRCode,
  hasNetworkFees = false,
  maxNumberOfRecipients,
  showSendModal,
  showImportModal,
  pushQRCodeData,
  intl,
  chain,
}: Props) => {
  const numberOfItems = sendRowDetails.length

  let headerTitle = intl.formatMessage({ id: 'selectAssets' })
  let headerSubtitle = intl.formatMessage(
    {
      id: 'sendSelectAssets',
    },
    {
      transferCount: numberOfItems,
      maxNumberOfRecipients,
    },
  )
  let buttons = (
    <div className={styles.sendPanelHeaderButtons}>
      <PanelHeaderButton
        onClick={() => showImportModal({ pushQRCodeData })}
        renderIcon={() => (
          <ImportIcon className={styles.sendPanelHeaderButtonIcon} />
        )}
        buttonText={<FormattedMessage id="sendImport" />}
      />
      <PanelHeaderButton
        disabled={disableEnterQRCode}
        onClick={() => showSendModal({ pushQRCodeData })}
        renderIcon={() => (
          <GridIcon className={styles.sendPanelHeaderButtonIcon} />
        )}
        buttonText={<FormattedMessage id="sendEnterQRCode" />}
      />
      <PanelHeaderButton
        disabled={disableAddRecipient}
        onClick={addRow}
        renderIcon={() => (
          <AddIcon className={styles.sendPanelHeaderButtonIcon} />
        )}
        buttonText={<FormattedMessage id="sendAdd" />}
      />
    </div>
  )

  if (showConfirmSend) {
    headerTitle = <FormattedMessage id="confirmation" />
    headerSubtitle = (
      <FormattedMessage
        id="confirmationRecipient"
        values={{ transferCount: numberOfItems }}
      />
    )
    buttons = <div className={styles.sendPanelHeaderButtons} />
  }

  if (sendSuccess) {
    headerTitle = <FormattedMessage id="completeExclaim" />

    buttons = (
      <div className={styles.sendPanelHeaderButtons}>
        <button
          type="button"
          className={styles.sendPanelHeaderButton}
          onClick={resetViews}
        >
          <AddIcon className={styles.sendPanelHeaderButtonIcon} />{' '}
          <FormattedMessage id="sendMoreAssets" />
        </button>
      </div>
    )
  }

  if (sendError) {
    headerTitle = <FormattedMessage id="sendErrorLabel" />
    headerSubtitle = null
    buttons = null
  }

  if (noSendableAssets) {
    headerTitle = <FormattedMessage id="noAvailableAssetsToSend" />
    headerSubtitle = null
    buttons = null
  }

  return (
    <section className={styles.sendPanelHeader}>
      <div className={styles.sendPanelHeaderInfo}>
        {headerTitle}{' '}
        <span className={styles.sendPanelRecipients}>{headerSubtitle}</span>
      </div>
      {hasNetworkFees &&
        !sendError && (
          <div className={styles.priorityTrasferHeaderTextContainer}>
            <LightningIcon /> <FormattedMessage id="priorityTransfer" />
          </div>
        )}
      {buttons}
    </section>
  )
}

export default injectIntl(SendPanelHeader)
