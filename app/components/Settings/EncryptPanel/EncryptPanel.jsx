// @flow
import React from 'react'
import { noop } from 'lodash'
import classNames from 'classnames'

import { ROUTES } from '../../../core/constants'
import FullHeightPanel from '../../Panel/FullHeightPanel'
import EncryptForm from '../EncryptForm'
import ImportIcon from '../../../assets/icons/import.svg'
import CloseButton from '../../CloseButton'
import styles from './EncryptPanel.scss'

type State = {
  encryptedkey: string
}

type Props = {
  handleSubmit: Function,
  className: string,
  title: string
}

export default class EncryptPanel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      encryptedkey: ''
    }
  }

  static defaultProps = {
    handleSubmit: noop
  }

  render() {
    const { className } = this.props
    const { encryptedkey } = this.state

    if (!this.state.encryptedkey) {
      return (
        <FullHeightPanel
          className={classNames(styles.encryptPanel, className)}
          contentClassName={styles.content}
          renderHeader={this.renderHeader}
          headerText="Encrypt a key"
          renderCloseButton={() => <CloseButton routeTo={ROUTES.SETTINGS} />}
          renderHeaderIcon={this.renderIcon}
          renderInstructions={() => (
            <div>Choose a passphrase to encrypt an existing key</div>
          )}
        >
          <EncryptForm
            submitLabel="Generate Encrypted Key"
            onSubmit={this.onSubmit}
          />
        </FullHeightPanel>
      )
    }
    return <div>{encryptedkey}</div>
  }

  renderHeader = () => <span>{this.props.title}</span>

  // TODO change to correct icon
  renderIcon = () => (
    <div>
      <ImportIcon />
    </div>
  )

  onSubmit = (
    privateKey: string,
    passphrase: string,
    confirmPassphrase: string
  ) => {
    const { handleSubmit } = this.props
    const result = handleSubmit(privateKey, passphrase, confirmPassphrase)
    this.setState({ encryptedkey: result })
  }
}
