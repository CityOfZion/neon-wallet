// @flow
import React, { Component } from 'react'
import { map } from 'lodash'
import fs from 'fs'
import storage from 'electron-json-storage'

import { recoverWallet } from '../../modules/generateWallet'

import HomeButtonLink from '../../components/HomeButtonLink'
import { EXPLORERS, MODAL_TYPES, CURRENCIES } from '../../core/constants'

import Delete from 'react-icons/lib/md/delete'

const { dialog } = require('electron').remote

type Props = {
  setAccounts: Function,
  setBlockExplorer: Function,
  explorer: string,
  setCurrency: Function,
  currency: string,
  accounts: any,
  showModal: Function
}

type State = {
  explorer: string,
}

export default class Settings extends Component<Props, State> {
  state = {
    explorer: this.props.explorer,
    currency: this.props.currency
  }

  componentDidMount () {
    const { setAccounts } = this.props

    // eslint-disable-next-line
    storage.get('userWallet', (error, data) => {
      setAccounts(data.accounts)
    })
  }

  saveWalletRecovery = () => {
    // eslint-disable-next-line
    storage.get('userWallet', (error, data) => {
      const content = JSON.stringify(data)
      dialog.showSaveDialog({filters: [
        {
          name: 'JSON',
          extensions: ['json']
        }]}, (fileName) => {
        if (fileName === undefined) {
          return
        }
        // fileName is a string that contains the path and filename created in the save file dialog.
        fs.writeFile(fileName, content, (err) => {
          if (err) {
            window.alert('An error ocurred creating the file ' + err.message)
          }
          window.alert('The file has been succesfully saved')
        })
      })
    })
  }

  loadWalletRecovery = () => {
    const { setAccounts } = this.props
    dialog.showOpenDialog((fileNames) => {
      // fileNames is an array that contains all the selected
      if (fileNames === undefined) {
        return
      }
      const filepath = fileNames[0]
      fs.readFile(filepath, 'utf-8', (err, data) => {
        if (err) {
          window.alert('An error ocurred reading the file :' + err.message)
          return
        }
        const walletData = JSON.parse(data)

        recoverWallet(walletData)
          .then((data) => {
            setAccounts(data.accounts)
          })
      })
    })
  }

  componentWillReceiveProps (nextProps: Props) {
    storage.set('settings', {
      currency: nextProps.currency,
      blockExplorer: nextProps.explorer
    })
  }

  updateExplorerSettings = (e: Object) => {
    const { setBlockExplorer } = this.props
    setBlockExplorer(e.target.value)
  }

  updateCurrencySettings = (e: Object) => {
    const { setCurrency } = this.props
    setCurrency(e.target.value)
  }

  deleteWalletAccount = (label: string, key: string) => {
    const { setAccounts, showModal } = this.props
    showModal(MODAL_TYPES.CONFIRM, {
      title: 'Confirm Delete',
      text: `Please confirm deleting saved wallet - ${label}`,
      onClick: () => {
        // eslint-disable-next-line
        storage.get('userWallet', (error, data) => {
          data.accounts.map((account, index) => {
            if (account.key === key && account.label === label) {
              data.accounts.splice(index, 1) // delete data.accounts[index] was leaving a null item
            }
          })

          storage.set('userWallet', data)
          setAccounts(data.accounts)
        })
      }
    })
  }

  render () {
    const { accounts, explorer, currency } = this.props

    return (
      <div id='settings'>
        <div className='description'>Manage your Neon wallet accounts and settings</div>
        <div className='settingsForm'>
          <div className='settingsItem'>
            <div className='itemTitle'>Block Explorer</div>
            <select value={explorer} onChange={this.updateExplorerSettings}>
              {Object.keys(EXPLORERS).map((explorer: ExplorerType) =>
                <option key={explorer} value={EXPLORERS[explorer]}>{EXPLORERS[explorer]}</option>)
              }
            </select>
          </div>
          <div className='settingsItem'>
            <div className='itemTitle'>Currency</div>
            <select value={currency} onChange={this.updateCurrencySettings}>
              {Object.keys(CURRENCIES).map((currencyCode: string) =>
                <option value={currencyCode} key={currencyCode}>{currencyCode.toUpperCase()}</option>
              )}
            </select>
          </div>
          <div className='settingsItem'>
            <div className='itemTitle'>Saved Wallet Accounts</div>
            {map(accounts, (account) => {
              return (
                <div className='walletList' key={`wallet${account.key}`}>
                  <div className='walletItem'>
                    <div className='walletName'>{account.key.slice(0, 20)}</div>
                    <div className='walletKey'>{account.label}</div>
                    <div className='deleteWallet' onClick={() => this.deleteWalletAccount(account.label, account.key)}><Delete /></div>
                  </div>
                </div>
              )
            })
            }
          </div>
          <button onClick={() => this.saveWalletRecovery()}>Export wallet recovery file</button>
          <button onClick={this.loadWalletRecovery}>Load wallet recovery file</button>
        </div>
        <HomeButtonLink />
      </div>
    )
  }
}
