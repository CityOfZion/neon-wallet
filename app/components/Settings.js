// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { forEach, map } from 'lodash'
import fs from 'fs'
import storage from 'electron-json-storage'
import { setBlockExplorer } from '../modules/metadata'
import { setKeys } from '../modules/account'
import Delete from 'react-icons/lib/md/delete'
import Logo from './Logo'
import { EXPLORER } from '../core/constants'

const { dialog } = require('electron').remote

type Props = {
  dispatch: DispatchType,
  explorer: string,
  wallets: any
}

type State = {
  explorer: string,
}

class Settings extends Component<Props, State> {
  state = {
    explorer: this.props.explorer
  }

  componentDidMount () {
    const { dispatch } = this.props
    // eslint-disable-next-line
    storage.get('keys', (error, data) => {
      dispatch(setKeys(data))
    })
    this.loadSettings()
  }

  saveKeyRecovery = (keys) => {
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

  loadKeyRecovery = () => {
    const { dispatch } = this.props
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

  saveSettings = (settings) => {
    storage.set('settings', settings)
  }

  loadSettings = () => {
    const { dispatch } = this.props
    // eslint-disable-next-line
    storage.get('settings', (error, settings) => {
      if (settings.blockExplorer !== null && settings.blockExplorer !== undefined) {
        dispatch(setBlockExplorer(settings.blockExplorer))
      }
    })
  }

  updateSettings = (e) => {
    const { dispatch } = this.props
    const explorer = e.target.value
    this.setState({
      explorer
    })
    this.saveSettings({ blockExplorer: explorer })
    dispatch(setBlockExplorer(explorer))
  }

  deleteWallet = (key: string) => {
    const { dispatch } = this.props
    // eslint-disable-next-line
    storage.get('keys', (error, data) => {
      delete data[key]
      storage.set('keys', data)
      dispatch(setKeys(data))
    })
  }

  render () {
    const { wallets } = this.props
    const { explorer } = this.state
    return (
      <div id='settings'>
        <Logo />
        <div className='description'>Manage your Neon wallet keys and settings</div>
        <div className='settingsForm'>
          <div className='settingsItem'>
            <div className='itemTitle'>Block Explorer</div>
            <select value={explorer} onChange={this.updateSettings}>
              <option value={EXPLORER.NEO_TRACKER}>Neotracker</option>
              <option value={EXPLORER.ANT_CHAIN}>Antchain</option>
            </select>
          </div>
          <div className='settingsItem'>
            <div className='itemTitle'>Saved Wallet Keys</div>
            {map(wallets, (value, key) => {
              return (
                <div className='walletList' key={`wallet${key}`}>
                  <div className='walletItem'>
                    <div className='walletName'>{key.slice(0, 20)}</div><div className='walletKey'>{value}</div><div className='deleteWallet' onClick={() => this.deleteWallet(key)}><Delete /></div>
                  </div>
                </div>
              )
            })
            }
          </div>
          <button onClick={() => this.saveKeyRecovery(wallets)}>Export key recovery file</button>
          <button onClick={this.loadKeyRecovery}>Load key recovery file</button>
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

export default connect(mapStateToProps)(Settings)
