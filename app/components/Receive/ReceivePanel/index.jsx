// @flow
import React from 'react'
import classNames from 'classnames'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import QRCode from 'qrcode/lib/browser'

import Panel from '../../Panel'
import ReceivePanelHeader from './ReceivePanelHeader'
import ReceiveExplanation from '../ReceiveExplanation'
import CopyToClipboard from '../../CopyToClipboard'
import QRCodeForm from '../QRCodeForm'
import DialogueBox from '../../DialogueBox'
import WarningIcon from '../../../assets/icons/warning.svg'

import styles from './styles.scss'

type Props = {
  address: string,
  onSubmit: Function
}

export default class ReceivePanel extends React.Component<Props, State> {
  state = {
    tabIndex: 0
  }

  publicCanvas: ?HTMLCanvasElement

  options = {
    default: {
      render: () => (
        <div className={styles.dynamicReceiveContent}>
          <div className={styles.defaultReceiveContainer}>
            <canvas
              ref={node => {
                this.publicCanvas = node
              }}
            />
            <div className={styles.walletAddressContainer}>
              <div className={styles.address}>{this.props.address}</div>
              <CopyToClipboard
                className={styles.copy}
                text={this.props.address}
              />
            </div>
            <DialogueBox
              icon={
                <WarningIcon
                  className={styles.warningIcon}
                  height={50}
                  width={50}
                />
              }
              text="Only send assets, such as NEO and GAS, and tokens, such as RPX,
              that are compatible with the NEO Blockchain. Sending any other
              digital asset or token will result in permanent loss."
              className={styles.conactFormDialogue}
            />
          </div>
        </div>
      ),
      display: 'Your Address'
    },
    nep9: {
      render: () => (
        <div className={styles.dynamicReceiveContent}>
          <ReceiveExplanation />
          <QRCodeForm
            address={this.props.address}
            onSubmit={this.props.onSubmit}
          />
        </div>
      ),
      display: 'Request Assets'
    }
  }

  tabOptions = Object.keys(this.options).map((key: string) => this.options[key])

  componentDidMount() {
    const { address } = this.props
    QRCode.toCanvas(this.publicCanvas, address, { version: 5 }, err => {
      if (err) console.error(err)
    })
  }

  render() {
    const { address, onSubmit } = this.props
    return (
      <Panel
        className={styles.receivePanel}
        renderHeader={() => <ReceivePanelHeader address={address} />}
        contentClassName={styles.receivePanelContent}
      >
        <Tabs
          selectedIndex={this.state.tabIndex}
          onSelect={tabIndex => {
            this.setState({ tabIndex }, () =>
              QRCode.toCanvas(
                this.publicCanvas,
                address,
                { version: 5 },
                err => {
                  if (err) console.error(err)
                }
              )
            )
          }}
          className={classNames(styles.tabs, 'neon-tabs')}
        >
          <TabList>
            {this.tabOptions.map(option => (
              <Tab key={option.display}>{option.display.toUpperCase()}</Tab>
            ))}
          </TabList>
          {/* <div className={styles.loginContentContainer}> */}
          {this.tabOptions.map(option => (
            <TabPanel
              key={option.display}
              selectedClassName={styles.homeTabPanel}
            >
              {option.render()}
            </TabPanel>
          ))}
          {/* </div> */}
        </Tabs>
      </Panel>
    )
  }
}

// encryptedCanvas: ?HTMLCanvasElement
// privateCanvas: ?HTMLCanvasElement

// componentDidMount () {
//   const { address, encryptedWIF, wif } = this.props
//   QRCode.toCanvas(this.publicCanvas, address, { version: 5 }, (err) => {
//     if (err) console.log(err)
//   })

// const ReceivePanel = ({ address, onSubmit }: Props) => (
//   <Panel
//     className={styles.receivePanel}
//     renderHeader={() => <ReceivePanelHeader address={address} />}
//     contentClassName={styles.receivePanelContent}
//   >
//     <Tabs
//       selectedIndex={this.state.tabIndex}
//       onSelect={tabIndex => this.setState({ tabIndex })}
//       className="neon-tabs"
//     >
//       <TabList>
//         {this.options.map(option => (
//           <Tab key={option.display}>{option.display.toUpperCase()}</Tab>
//         ))}
//       </TabList>
//       <div className={styles.loginContentContainer}>
//         {this.options.map(option => (
//           <TabPanel
//             key={option.display}
//             selectedClassName={styles.homeTabPanel}
//           >
//             {option.render()}
//           </TabPanel>
//         ))}
//       </div>
//     </Tabs>

//     <ReceiveExplanation />
//     <QRCodeForm address={address} onSubmit={onSubmit} />
//   </Panel>
// )

// export default ReceivePanel

// const LOGIN_OPTIONS = {
//   LOCAL_STORAGE: {
//     render: () => <LoginLocalStorage />,
//     display: 'Saved Wallet'
//   },
//   PRIVATE_KEY: {
//     render: () => <LoginPrivateKey />,
//     display: 'Private Key'
//   },
//   NEP2: {
//     render: () => <LoginNep2 />,
//     display: 'Encrypted Key'
//   },
//   ledger: {
//     render: () => <LoginLedgerNanoS />,
//     display: 'Ledger'
//   }
// }
// options = Object.keys(LOGIN_OPTIONS).map((key: string) => LOGIN_OPTIONS[key])
// <Tabs
//             selectedIndex={this.state.tabIndex}
//             onSelect={tabIndex => this.setState({ tabIndex })}
//             className="neon-tabs"
//           >
//             <TabList>
//               {this.options.map(option => (
//                 <Tab key={option.display}>{option.display.toUpperCase()}</Tab>
//               ))}
//             </TabList>
//             <div className={styles.loginContentContainer}>
//               {this.options.map(option => (
//                 <TabPanel
//                   key={option.display}
//                   selectedClassName={styles.homeTabPanel}
//                 >
//                   {option.render()}
//                 </TabPanel>
//               ))}
//             </div>
//           </Tabs>
