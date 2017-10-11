// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { forEach, map, noop } from 'lodash'
import fs from 'fs'
import storage from 'electron-json-storage'
import { setBlockExplorer } from '../modules/metadata'
import { setKeys } from '../modules/account'
import Delete from 'react-icons/lib/md/delete'

const { dialog } = require('electron').remote

const logo = require('../images/neon-logo2.png')

const saveKeyRecovery = (keys) => {
  const content = JSON.stringify(keys)
  dialog.showSaveDialog({filters: [{
    name: 'JSON',
    extensions: ['json']
  }]}, (fileName) => {
    if (fileName === undefined) {
      console.log('File failed to save...')
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

const loadKeyRecovery = (dispatch: DispatchType) => {
  dialog.showOpenDialog((fileNames) => {
    // fileNames is an array that contains all the selected
    if (fileNames === undefined) {
      console.log('No file selected')
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
        dispatch(setKeys(data))
        storage.set('keys', data)
      })
    })
  })
}

const saveSettings = (settings) => {
  storage.set('settings', settings)
}

const loadSettings = (dispatch: DispatchType) => {
  // eslint-disable-next-line
  storage.get('settings', (error, settings) => {
    if (settings.blockExplorer !== null && settings.blockExplorer !== undefined) {
      dispatch(setBlockExplorer(settings.blockExplorer))
    }
  })
}

const updateSettings = (dispatch: DispatchType, explorerSelect: NeoExplorerType) => {
  saveSettings({ blockExplorer: explorerSelect })
  dispatch(setBlockExplorer(explorerSelect))
}

const deleteWallet = (dispatch: DispatchType, key: string) => {
  // eslint-disable-next-line
  storage.get('keys', (error, data) => {
    delete data[key]
    storage.set('keys', data)
    dispatch(setKeys(data))
  })
}

type Props = {
  dispatch: DispatchType,
  explorer: string,
  wallets: any
}

let Settings = class Settings extends Component<Props> {
  explorerSelect: ?HTMLSelectElement

  componentDidMount () {
    const { dispatch } = this.props
    // eslint-disable-next-line
    storage.get('keys', (error, data) => {
      dispatch(setKeys(data))
    })
    loadSettings(dispatch)
  }

  render () {
    const { wallets, explorer, dispatch } = this.props
    return (
      <div id='settings'>
        <div className='logo'><img src={logo} width='60px' /></div>
        <div className='description'>Manage your Neon wallet keys and settings</div>
        <div className='settingsForm'>
          <div className='settingsItem'>
            <div className='itemTitle'>Block Explorer</div>
            <select value={explorer} ref={(node) => { this.explorerSelect = node }} onChange={() => this.explorerSelect ? updateSettings(dispatch) : noop}>
              <option>Neotracker</option>
              <option>Antchain</option>
            </select>
          </div>
          <div className='settingsItem'>
            <div className='itemTitle'>Saved Wallet Keys</div>
            {map(wallets, (value, key) => {
              return (<div className='walletList'>
                <div className='walletItem'>
                  <div className='walletName'>{key.slice(0, 20)}</div><div className='walletKey'>{value}</div><div className='deleteWallet' onClick={() => deleteWallet(dispatch, key)}><Delete /></div>
                </div>
              </div>)
            })
            }
          </div>
          <button onClick={() => saveKeyRecovery(wallets)}>Export key recovery file</button>
          <button onClick={() => loadKeyRecovery(dispatch)}>Load key recovery file</button>
        </div>
        <Link to='/'><button className='altButton'>Home</button></Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  explorer: state.metadata.blockExplorer,
  wallets: state.account.accountKeys
})

Settings = connect(mapStateToProps)(Settings)

export default Settings
