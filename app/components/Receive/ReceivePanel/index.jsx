// @flow
import React from 'react'
import classNames from 'classnames'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { FormattedMessage } from 'react-intl'

import Panel from '../../Panel'
import ReceivePanelHeader from './ReceivePanelHeader'
import ReceiveExplanation from '../ReceiveExplanation'
import DefaultReceive from '../DefaultReceive'
import QRCodeForm from '../QRCodeForm'

import styles from './styles.scss'

type Props = {
  address: string,
  onSubmit: Function,
  networkId: string,
  chain: string,
}

type State = {
  tabIndex: number,
}

export default class ReceivePanel extends React.Component<Props, State> {
  state = {
    tabIndex: 0,
  }

  publicCanvas: ?HTMLCanvasElement

  options = {
    default: {
      key: 'default',
      render: () => (
        <div className={styles.dynamicReceiveContent}>
          <DefaultReceive address={this.props.address} />
        </div>
      ),
      display: <FormattedMessage id="receiveYourAddressTabLabel" />,
    },
    nep9: {
      key: 'nep9',
      render: () => (
        <div className={styles.dynamicReceiveContent}>
          <QRCodeForm
            networkId={this.props.networkId}
            address={this.props.address}
            onSubmit={this.props.onSubmit}
          />
        </div>
      ),
      display: <FormattedMessage id="receiveRequestTabAssets" />,
    },
  }

  // $FlowFixMe
  tabOptions = Object.keys(this.options).map((key: string) => this.options[key])

  render() {
    const { address, chain } = this.props
    return (
      <Panel
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
            {chain === 'neo2' ? (
              this.tabOptions.map(option => (
                <Tab key={option.key}>{option.display}</Tab>
              ))
            ) : (
              <Tab>{this.options.default.display}</Tab>
            )}
          </TabList>

          {chain === 'neo2' ? (
            this.tabOptions.map(option => (
              <TabPanel
                key={option.key}
                selectedClassName={styles.homeTabPanel}
              >
                {option.render()}
              </TabPanel>
            ))
          ) : (
            <TabPanel selectedClassName={styles.homeTabPanel}>
              {this.options.default.render()}
            </TabPanel>
          )}
        </Tabs>
      </Panel>
    )
  }
}
