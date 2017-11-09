// @flow
import React, { Component } from 'react'
import { forEach, map } from 'lodash'
import fs from 'fs'
import storage from 'electron-json-storage'
import Delete from 'react-icons/lib/md/delete'
import Page from '../../components/Page'
import HomeButtonLink from '../../components/HomeButtonLink'
import { EXPLORER, MODAL_TYPES } from '../../core/constants'

const { dialog } = require('electron').remote

type Props = {
  setKeys: Function,
  setBlockExplorer: Function,
  explorer: string,
  wallets: any,
  showModal: Function
}

type State = {
  explorer: string,
}

export default class Settings extends Component<Props, State> {
  state = {
    explorer: this.props.explorer
  }

  componentDidMount () {
    const { setKeys } = this.props
    // eslint-disable-next-line
    storage.get('keys', (error, data) => {
      setKeys(data)
    })
    this.loadSettings()
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

  saveSettings = (settings: Object) => {
    storage.set('settings', settings)
  }

  loadSettings = () => {
    const { setBlockExplorer } = this.props
    // eslint-disable-next-line
    storage.get('settings', (error, settings) => {
      if (settings.blockExplorer !== null && settings.blockExplorer !== undefined) {
        setBlockExplorer(settings.blockExplorer)
      }
    })
  }

  updateSettings = (e: Object) => {
    const { setBlockExplorer } = this.props
    const explorer = e.target.value
    this.setState({
      explorer
    })
    this.saveSettings({ blockExplorer: explorer })
    setBlockExplorer(explorer)
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

  render () {
    const { wallets } = this.props
    const { explorer } = this.state
    return (
      <Page id='settings'>
        <div className='description'>Manage your Neon wallet keys and settings</div>
        <div className='settingsForm'>
          <div className='settingsItem'>
            <div className='itemTitle'>Block Explorer</div>
            <select value={explorer} onChange={this.updateSettings}>
              <option value={EXPLORER.NEO_TRACKER}>Neotracker</option>
              <option value={EXPLORER.NEO_SCAN}>Neoscan</option>
              <option value={EXPLORER.ANT_CHAIN}>Antchain</option>
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
      </Page>
    )
  }
}
