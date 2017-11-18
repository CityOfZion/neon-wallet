// @flow
import React, { Component } from 'react'
import SplitPane from 'react-split-pane'
import FaArrowUpward from 'react-icons/lib/fa/arrow-circle-up'
import NetworkSwitch from '../NetworkSwitch'
import PriceDisplay from '../../components/PriceDisplay'
import WalletInfo from '../WalletInfo'
import TransactionHistory from '../TransactionHistory'
import Logout from '../../components/Logout'
import Send from '../../containers/Send'
import { version } from '../../../package.json'
import { log } from '../../util/Logs'
import styles from './Dashboard.scss'

const logo = require('../../images/neon-logo2.png')

type Props = {
  sendPane: boolean,
  confirmPane: boolean,
  blockHeight: number,
  net: string,
  address: string,
  neoPrice: number,
  gasPrice: number,
  togglePane: Function,
  logout: Function,
}

export default class Dashboard extends Component<Props> {
  componentDidMount () {
    const { net, address } = this.props
    // only logging public information here
    log(net, 'LOGIN', address, {})
  }

  render () {
    const { sendPane, confirmPane, blockHeight, togglePane, logout, neoPrice, gasPrice } = this.props
    let sendPaneClosed
    if (sendPane === true) {
      sendPaneClosed = '0%'
    } else {
      if (confirmPane === false) {
        sendPaneClosed = '21%'
      } else {
        sendPaneClosed = '15%'
      }
    }

    return (
      <div id='dashboard'>
        <SplitPane
          split='horizontal'
          size={'40px'}
          allowResize={false}
        >
          <div style={{ marginTop: 0, position: 'relative', width: '100%' }}>
            <div className={styles.title}>
              <img src={logo} width='60px' />
            </div>
            <PriceDisplay neoPrice={neoPrice} gasPrice={gasPrice} />
            <div className={styles.version}>
              <span className={styles.grey}>Version</span>
              <span className={styles.darker}>{version}</span>
            </div>
            <div className={styles.height}>
              <span className={styles.grey}>Block</span>
              <span className={styles.darker}>{blockHeight}</span>
            </div>
            <NetworkSwitch />
            <Logout logout={logout} />
          </div>
          <SplitPane split='vertical' size='50%' allowResize={false}>
            <SplitPane className='leftSplit' split='horizontal' size='55px' allowResize={false}>
              <div className={styles.send} onClick={() => togglePane('sendPane')}>
                <FaArrowUpward className={styles.upArrow} /> <span>Send</span>
              </div>
              <SplitPane className='sendSplit' split='horizontal' size={sendPaneClosed} allowResize={false}>
                <Send />
                <WalletInfo />
              </SplitPane>
            </SplitPane>
            <TransactionHistory />
          </SplitPane>
        </SplitPane>
      </div>
    )
  }
}
