// @flow
import React, { Component } from 'react'
import fs from 'fs'
import { Parser } from 'json2csv'
import { omit } from 'lodash-es'
import moment from 'moment'
import { FormattedMessage, intlShape } from 'react-intl'

import { NeoLegacyREST, NeoRest } from '@cityofzion/dora-ts/dist/api'
import HeaderBar from '../../components/HeaderBar'
import TransactionHistoryPanel from '../../components/TransactionHistory/TransactionHistoryPanel'
import styles from './TransactionHistory.scss'
import RefreshButton from '../Buttons/RefreshButton'
import ExportIcon from '../../assets/icons/export.svg'
import PanelHeaderButton from '../../components/PanelHeaderButton/PanelHeaderButton'
import {
  computeN3Activity,
  parseAbstractData,
} from '../../actions-migrated/transactionHistory'

const { ipcRenderer, app } = require('electron')

type Props = {
  chain: string,
  showSuccessNotification: ({ message: string }) => string,
  showErrorNotification: ({ message: string }) => string,
  showInfoNotification: ({ message: string }) => string,
  hideNotification: string => void,
  net: string,
  address: string,
  intl: intlShape,
}

type State = {
  isExporting: boolean,
}

export default class TransactionHistory extends Component<Props, State> {
  state = {
    isExporting: false,
  }

  render() {
    return (
      <div className={styles.transactionHistory}>
        <HeaderBar
          label={<FormattedMessage id="activityPageLabel" />}
          renderRightContent={() => this.renderPanelHeaderContent()}
        />
        <TransactionHistoryPanel className={styles.transactionHistoryPanel} />
      </div>
    )
  }

  renderPanelHeaderContent = () => {
    const { intl } = this.props
    return (
      <div className={styles.panelHeaderButtons}>
        <PanelHeaderButton
          disabled={this.state.isExporting}
          onClick={this.saveHistoryFile}
          className={styles.exportButton}
          renderIcon={() => <ExportIcon />}
          buttonText={intl.formatMessage({
            id: 'activityExport',
          })}
        />
        <RefreshButton />
      </div>
    )
  }

  // TODO - update this
  fetchHistory = async () => {
    const { showInfoNotification, net, address, chain } = this.props
    const infoNotification = showInfoNotification({
      message: 'Fetching entire transaction history...',
    })
    const abstracts = []
    let currentPage = 1
    let shouldFetchAdditionalPages = true

    let data = { entries: [] }
    let parsedEntries = []
    while (shouldFetchAdditionalPages) {
      if (chain === 'neo3') {
        const network = net === 'MainNet' ? 'mainnet' : 'testnet'
        data = await NeoRest.addressTXFull(address, currentPage, network)
        parsedEntries = await computeN3Activity(data, address, net)
        parsedEntries.forEach((entry: Object) => {
          Object.assign(entry, entry.metadata)
          delete entry.metadata
          abstracts.push(entry)
        })
        if (abstracts.length >= data.totalCount) {
          shouldFetchAdditionalPages = false
        }
      } else {
        const network = net === 'MainNet' ? 'mainnet' : 'testnet'
        const data = await NeoLegacyREST.getAddressAbstracts(
          address,
          currentPage,
          network,
        )
        parsedEntries = await parseAbstractData(data.entries, address, net)
        abstracts.push(...parsedEntries)
        if (
          data.total_pages === 1 ||
          data.total_pages === 0 ||
          data.total_pages === currentPage
        ) {
          shouldFetchAdditionalPages = false
        }
      }
      currentPage += 1
    }
    return { infoNotification, abstracts }
  }

  saveHistoryFile = async () => {
    this.setState({
      isExporting: true,
    })
    const {
      showErrorNotification,
      showSuccessNotification,
      hideNotification,
    } = this.props
    const fields = [
      'to',
      'from',
      'txid',
      'time',
      'amount',
      'symbol',
      'type',
      'id',
    ]
    try {
      const { infoNotification, abstracts } = await this.fetchHistory()
      const parser = new Parser(fields)
      const csv = parser.parse(
        abstracts.map(abstract => {
          const omitted = omit(abstract, [
            'isNetworkFee',
            'asset',
            'image',
            'label',
          ])
          omitted.time = moment
            .unix(omitted.time)
            .format('MM/DD/YYYY | HH:mm:ss')
          return omitted
        }),
      )
      hideNotification(infoNotification)
      const path = await ipcRenderer.invoke('getPath', 'documents')

      const result = await ipcRenderer.invoke('dialog', 'showSaveDialog', {
        defaultPath: `${path}/neon-wallet-activity-${moment().unix()}.csv`,
        filters: [
          {
            name: 'CSV',
            extensions: ['csv'],
          },
        ],
      })

      const fileName = result.filePath

      this.setState({
        isExporting: false,
      })
      if (fileName === undefined) {
        return
      }
      // fileName is a string that contains the path and filename created in the save file dialog.
      fs.writeFile(fileName, csv, errorWriting => {
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
      })
    } catch (err) {
      console.error(err)
      this.setState({
        isExporting: false,
      })
      showErrorNotification({
        message: `An error occurred creating the file: ${err.message}`,
      })
    }
  }
}
