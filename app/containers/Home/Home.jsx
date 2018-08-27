// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import LoginPrivateKey from '../LoginPrivateKey'
import LoginNep2 from '../LoginNep2'
import LoginLedgerNanoS from '../LoginLedgerNanoS'
import LoginLocalStorage from '../LoginLocalStorage'
import Button from '../../components/Button'
import styles from './Home.scss'
import AddIcon from '../../assets/icons/add.svg'
import ImportIcon from '../../assets/icons/import.svg'
import { ROUTES } from '../../core/constants'
import HomeLayout from './HomeLayout'
import pack from '../../../package.json'

type State = {
  tabIndex: number
}

type Props = {
  loading: boolean
}

const LOGIN_OPTIONS = {
  LOCAL_STORAGE: {
    render: () => <LoginLocalStorage />,
    display: 'Saved Wallet'
  },
  PRIVATE_KEY: {
    render: () => <LoginPrivateKey />,
    display: 'Private Key'
  },
  NEP2: {
    render: () => <LoginNep2 />,
    display: 'Encrypted Key'
  },
  ledger: {
    render: () => <LoginLedgerNanoS />,
    display: 'Ledger'
  }
}

export default class Home extends React.Component<Props, State> {
  state = {
    tabIndex: 0
  }

  options = Object.keys(LOGIN_OPTIONS).map((key: string) => LOGIN_OPTIONS[key])

  render = () => {
    const { loading } = this.props
    return (
      <HomeLayout>
        <div className={styles.inputContainer}>
          <Tabs
            selectedIndex={this.state.tabIndex}
            onSelect={tabIndex => this.setState({ tabIndex })}
            className={styles.homeTabs}
          >
            <TabList>
              {this.options.map(option => (
                <Tab key={option.display}>{option.display.toUpperCase()}</Tab>
              ))}
            </TabList>
            <div className={styles.loginContentContainer}>
              {this.options.map(option => (
                <TabPanel
                  key={option.display}
                  selectedClassName={styles.homeTabPanel}
                >
                  {option.render()}
                </TabPanel>
              ))}
            </div>
          </Tabs>
          <div className={styles.buttonRow}>
            <div className={styles.buttonContainer}>
              <Link to={ROUTES.CREATE_WALLET}>
                <Button disabled={loading} renderIcon={AddIcon}>
                  Create Wallet
                </Button>
              </Link>
            </div>
            <div className={styles.buttonContainer}>
              <Link to={ROUTES.IMPORT_WALLET}>
                <Button disabled={loading} renderIcon={ImportIcon}>
                  Import Wallet
                </Button>
              </Link>
            </div>
          </div>
          <div className={styles.versionNumber}>{`v${pack.version}`}</div>
        </div>
      </HomeLayout>
    )
  }
}
