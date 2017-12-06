// @flow
import React, { Component } from 'react'
import { forEach, map } from 'lodash'
import fs from 'fs'
import storage from 'electron-json-storage'

import HomeButtonLink from '../../components/HomeButtonLink'
import { EXPLORERS, MODAL_TYPES, CURRENCIES } from '../../core/constants'

import Delete from 'react-icons/lib/md/delete'

const { dialog } = require('electron').remote

type Props = {
  setKeys: Function,
  setBlockExplorer: Function,
  explorer: string,
  setCurrency: Function,
  currency: string,
  wallets: any,
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
    const { setKeys } = this.props
    // eslint-disable-next-line
    storage.get('keys', (error, data) => {
      setKeys(data)
    })
  }

  saveKeyRecovery = (keys: Object) => {
    const content = JSON.stringify(keys)
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
  }

  loadKeyRecovery = () => {
    const { setKeys } = this.props
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
        const keys = JSON.parse(data)
        // eslint-disable-next-line
        storage.get('keys', (error, data) => {
          forEach(keys, (value, key) => {
            data[key] = value
          })
          setKeys(data)
          storage.set('keys', data)
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

  deleteWallet = (key: string) => {
    const { setKeys, showModal } = this.props
    showModal(MODAL_TYPES.CONFIRM, {
      title: 'Confirm Delete',
      text: `Please confirm deleting saved wallet - ${key}`,
      onClick: () => {
        // eslint-disable-next-line
        storage.get('keys', (error, data) => {
          delete data[key]
          storage.set('keys', data)
          setKeys(data)
        })
      }
    })
  }

  getCurrencyOptions () {
    var options = []

    Object.keys(CURRENCIES).forEach(function (currencyCode) {
      options.push(<option value={currencyCode} key={currencyCode}>{currencyCode.toUpperCase()}</option>)
    })

    return options
  }

  render () {
    const { wallets, explorer, currency } = this.props

    return (
      <div id='settings'>
        <div className='description'>Manage your Neon wallet keys and settings</div>
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
              {this.getCurrencyOptions()}
            </select>
          </div>
          <div className='settingsItem'>
            <div className='itemTitle'>Saved Wallet Keys</div>
            {map(wallets, (value, key) => {
              return (
                <div className='walletList' key={`wallet${key}`}>
                  <div className='walletItem'>
                    <div className='walletName'>{key.slice(0, 20)}</div>
                    <div className='walletKey'>{value}</div>
                    <div className='deleteWallet' onClick={() => this.deleteWallet(key)}><Delete /></div>
                  </div>
                </div>
              )
            })
            }
          </div>
          <button onClick={() => this.saveKeyRecovery(wallets)}>Export key recovery file</button>
          <button onClick={this.loadKeyRecovery}>Load key recovery file</button>
        </div>
        <HomeButtonLink />
      </div>
    )
  }
}
