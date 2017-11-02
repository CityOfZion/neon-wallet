// @flow
import React, { Component } from 'react'
import SplitPane from 'react-split-pane'
import FaArrowUpward from 'react-icons/lib/fa/arrow-circle-up'
import NetworkSwitch from '../NetworkSwitch'
import WalletInfo from '../WalletInfo'
import TransactionHistory from '../TransactionHistory'
import Logout from '../../components/Logout'
import Send from '../../containers/Send'
import { version } from '../../../package.json'
import { log } from '../../util/Logs'
import { NOTIFICATION_POSITIONS } from '../../core/constants'
import styles from './Dashboard.scss'

const logo = require('../../images/neon-logo2.png')

type Props = {
  sendPane: boolean,
  confirmPane: boolean,
  blockHeight: number,
  net: string,
  address: string,
  togglePane: Function,
  logout: Function,
  notification: NotificationType
}

export default class Dashboard extends Component<Props> {
  componentDidMount () {
    const { net, address } = this.props
    // only logging public information here
    log(net, 'LOGIN', address, {})
  }

  render () {
    const { sendPane, confirmPane, blockHeight, togglePane, logout, notification } = this.props
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
    const shouldPushTop = notification.isShown && notification.position === NOTIFICATION_POSITIONS.TOP

    return (
      <div id='dashboard'>
        <SplitPane className={styles.navBarPane} split='horizontal' size={shouldPushTop ? '80px' : '40px'} allowResize={false}>
          <div className={styles.navBar} style={{ marginTop: shouldPushTop ? '40px' : 0, position: 'relative', width: '100%' }}>
            <div className={styles.title}>
              <img src={logo} width='60px' />
            </div>
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
              <SplitPane className={'sendSplit'} split='horizontal' size={sendPaneClosed} allowResize={false}>
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
