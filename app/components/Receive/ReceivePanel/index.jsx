// @flow
import React from 'react'
import classNames from 'classnames'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import Panel from '../../Panel'
import ReceivePanelHeader from './ReceivePanelHeader'
import ReceiveExplanation from '../ReceiveExplanation'
import DefaultReceive from '../DefaultReceive'
import QRCodeForm from '../QRCodeForm'

import styles from './styles.scss'

type Props = {
  address: string,
  onSubmit: Function,
  networkId: string
}

type State = {
  tabIndex: number
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
          <DefaultReceive address={this.props.address} />
        </div>
      ),
      display: 'Your Address'
    },
    nep9: {
      render: () => (
        <div className={styles.dynamicReceiveContent}>
          <QRCodeForm
            networkId={this.props.networkId}
            address={this.props.address}
            onSubmit={this.props.onSubmit}
          />
        </div>
      ),
      display: 'Request Assets'
    }
  }

  // $FlowFixMe
  tabOptions = Object.keys(this.options).map((key: string) => this.options[key])

  render() {
    const { address } = this.props
    return (
      <Panel
        className={styles.receivePanel}
        renderHeader={() => <ReceivePanelHeader address={address} />}
        contentClassName={styles.receivePanelContent}
      >
        <ReceiveExplanation />
        <Tabs
          selectedIndex={this.state.tabIndex}
          onSelect={tabIndex => {
            this.setState({ tabIndex })
          }}
          className={classNames(styles.tabs, 'neon-tabs')}
        >
          <TabList>
            {this.tabOptions.map(option => (
              <Tab key={option.display}>{option.display.toUpperCase()}</Tab>
            ))}
          </TabList>
          {this.tabOptions.map(option => (
            <TabPanel
              key={option.display}
              selectedClassName={styles.homeTabPanel}
            >
              {option.render()}
            </TabPanel>
          ))}
        </Tabs>
      </Panel>
    )
  }
}
