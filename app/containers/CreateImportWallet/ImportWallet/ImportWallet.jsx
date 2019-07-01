// @flow
import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { ROUTES } from '../../../core/constants'
import CloseButton from '../../../components/CloseButton'
import BackButton from '../../../components/BackButton'
import Button from '../../../components/Button'
import CreateImportWalletForm from '../../../components/CreateImportWalletForm'
import FullHeightPanel from '../../../components/Panel/FullHeightPanel'
import { loadWalletRecovery } from '../../Settings/Settings'
import ImportIcon from '../../../assets/icons/import.svg'
import AddIcon from '../../../assets/icons/add.svg'
import styles from './ImportWallet.scss'

type Props = {
  // eslint-disable-next-line react/no-unused-prop-types
  authenticated: boolean,
  // eslint-disable-next-line react/no-unused-prop-types
  setAccounts: (Array<Object>) => any,
  // eslint-disable-next-line react/no-unused-prop-types
  showSuccessNotification: Object => any,
  // eslint-disable-next-line react/no-unused-prop-types
  showErrorNotification: Object => any,
}

type State = {
  tabIndex: number,
}

const IMPORT_KEY_OPTIONS = {
  WIF: {
    render: (props: Props) => (
      <CreateImportWalletForm
        option="IMPORT"
        importKeyOption="WIF"
        authenticated={props.authenticated}
      />
    ),
    display: 'Private Key',
  },
  ENCRYPTED_WIF: {
    render: (props: Props) => (
      <CreateImportWalletForm
        option="IMPORT"
        importKeyOption="ENCRYPTED_WIF"
        authenticated={props.authenticated}
      />
    ),
    display: 'Encrypted Key',
  },

  RECOVER_WALLET: {
    render: (props: Props) => (
      <div
        className={styles.buttonContainer}
        onClick={() => {
          loadWalletRecovery(
            props.showSuccessNotification,
            props.showErrorNotification,
            props.setAccounts,
          )
        }}
      >
        <Button
          renderIcon={AddIcon}
          type="submit"
          shouldCenterButtonLabelText
          primary
        >
          Import File
        </Button>
      </div>
    ),
    display: 'Recover Wallet',
  },
}

export default class ImportWallet extends React.Component<Props, State> {
  state = {
    tabIndex: 0,
  }

  // $FlowFixMe
  options = Object.keys(IMPORT_KEY_OPTIONS).map(
    (key: string) => IMPORT_KEY_OPTIONS[key],
  )

  render = () => {
    const { tabIndex } = this.state
    const { authenticated } = this.props
    const conditionalPanelProps = {}
    if (authenticated) {
      conditionalPanelProps.renderBackButton = () => (
        <BackButton routeTo={ROUTES.WALLET_MANAGER} />
      )
      conditionalPanelProps.renderCloseButton = () => (
        <CloseButton routeTo={ROUTES.DASHBOARD} />
      )
    } else {
      conditionalPanelProps.renderCloseButton = () => (
        <CloseButton routeTo={ROUTES.HOME} />
      )
    }

    return (
      <FullHeightPanel
        headerText="Import Wallet"
        renderInstructions={false}
        renderHeaderIcon={() => (
          <div className={styles.iconDisplay}>
            <ImportIcon />
          </div>
        )}
        {...conditionalPanelProps}
      >
        <div className={styles.tabContainer}>
          <Tabs
            selectedIndex={tabIndex}
            onSelect={tabIndex => this.setState({ tabIndex })}
            className="neon-tabs"
          >
            <TabList>
              {this.options.map(option => (
                <Tab key={option.display}>{option.display.toUpperCase()}</Tab>
              ))}
            </TabList>
            <div>
              {this.options.map(option => (
                <TabPanel key={option.display}>
                  {option.render(this.props)}
                </TabPanel>
              ))}
            </div>
          </Tabs>
        </div>
      </FullHeightPanel>
    )
  }
}
