// @flow
import React, { Component } from 'react'
import fs from 'fs'
import { Parser } from 'json2csv'

import HeaderBar from '../../components/HeaderBar'
import TransactionHistoryPanel from '../../components/TransactionHistory/TransactionHistoryPanel'
import styles from './TransactionHistory.scss'
import RefreshButton from '../Buttons/RefreshButton/RefreshButton'
import ExportIcon from '../../assets/icons/export.svg'
import PanelHeaderButton from '../../components/PanelHeaderButton/PanelHeaderButton'

const { dialog } = require('electron').remote

type Props = {
  showSuccessNotification: ({ message: string }) => any,
  showErrorNotification: ({ message: string }) => any,
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
        onClick={this.generateAndSaveHistoryRecord}
        className={styles.exportButton}
        renderIcon={() => <ExportIcon />}
        buttonText="Export"
      />
      <RefreshButton />
    </div>
  )

  generateAndSaveHistoryRecord = () => {
    const { showErrorNotification, showSuccessNotification } = this.props
    const fields = ['car', 'price', 'color']
    const myCars = [
      {
        car: 'Audi',
        price: 40000,
        color: 'blue',
      },
      {
        car: 'BMW',
        price: 35000,
        color: 'black',
      },
      {
        car: 'Porsche',
        price: 60000,
        color: 'green',
      },
    ]

    try {
      const parser = new Parser(fields)
      const csv = parser.parse(myCars)
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
    }
  }
}
