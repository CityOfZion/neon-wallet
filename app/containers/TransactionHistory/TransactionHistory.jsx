// @flow
import React, { Component } from 'react'
import fs from 'fs'
import { Parser } from 'json2csv'
import { api } from '@cityofzion/neon-js'
import axios from 'axios'
import { omit } from 'lodash-es'
import moment from 'moment'

import HeaderBar from '../../components/HeaderBar'
import TransactionHistoryPanel from '../../components/TransactionHistory/TransactionHistoryPanel'
import styles from './TransactionHistory.scss'
import RefreshButton from '../Buttons/RefreshButton'
import ExportIcon from '../../assets/icons/export.svg'
import PanelHeaderButton from '../../components/PanelHeaderButton/PanelHeaderButton'
import { parseAbstractData } from '../../actions/transactionHistoryActions'

const { dialog } = require('electron').remote

type Props = {
  showSuccessNotification: ({ message: string }) => string,
  showErrorNotification: ({ message: string }) => string,
  showInfoNotification: ({ message: string }) => string,
  hideNotification: string => void,
  net: string,
  address: string,
}

export default class TransactionHistory extends Component<Props> {
  render() {
    return (
      <div className={styles.transactionHistory}>
        <HeaderBar
          label="All Activity"
          renderRightContent={this.renderPanelHeaderContent}
        />
        <TransactionHistoryPanel className={styles.transactionHistoryPanel} />
      </div>
    )
  }

  renderPanelHeaderContent = () => (
    <div className={styles.panelHeaderButtons}>
      <PanelHeaderButton
        onClick={this.saveHistoryFile}
        className={styles.exportButton}
        renderIcon={() => <ExportIcon />}
        buttonText="Export"
      />
      <RefreshButton />
    </div>
  )

  fetchHistory = async () => {
    const { showInfoNotification, net, address } = this.props
    const infoNotification = showInfoNotification({
      message: 'Fetching entire transaction history...',
    })
    const abstracts = []
    const endpoint = api.neoscan.getAPIEndpoint(net)
    let numberOfPages = 1
    let currentPage = 1

    while (currentPage !== numberOfPages || currentPage === 1) {
      const { data } = await axios.get(
        `${endpoint}/v1/get_address_abstracts/${address}/${currentPage}`,
      )
      abstracts.push(...data.entries)
      numberOfPages = data.total_pages
      currentPage += 1
    }

    const parsedAbstracts = await parseAbstractData(abstracts, address, net)
    return { infoNotification, parsedAbstracts }
  }

  saveHistoryFile = async () => {
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
      const { infoNotification, parsedAbstracts } = await this.fetchHistory()
      const parser = new Parser(fields)
      const csv = parser.parse(
        parsedAbstracts.map(abstract => {
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
      dialog.showSaveDialog(
        {
          filters: [
            {
              name: 'CSV',
              extensions: ['csv'],
            },
          ],
        },
        fileName => {
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
        },
      )
    } catch (err) {
      console.error(err)
      showErrorNotification({
        message: `An error occurred creating the file: ${err.message}`,
      })
    }
  }
}
