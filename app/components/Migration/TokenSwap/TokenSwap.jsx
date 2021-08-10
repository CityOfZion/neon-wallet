// @flow
import React from 'react'
import Send from '../../../containers/Send'
// import { intlShape } from 'react-intl'

// import InfoIcon from '../../../assets/icons/info.svg'
// import n3Logo from '../../../assets/images/n3_logo.png'
// import Button from '../../Button'
// import PasswordInput from '../../Inputs/PasswordInput'
// import TextInput from '../../Inputs/TextInput'
// import CreateImportWalletForm from '../../CreateImportWalletForm'
import styles from './TokenSwap.scss'

type Props = {}

type State = {}

export default class CreateMigrationWallet extends React.Component<
  Props,
  State,
> {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.explanation}>
          <div>
            <h3> Select a token to migrate</h3>
            <p>
              Filium morte multavit si sine causa, mox videro; interea hoc
              epicurus in gravissimo bello animadversionis metu degendae
              praesidia firmissima ut ipsi auctori huius disciplinae placet:
              constituam, quid sit voluptatem et accusamus et voluptates
              omittantur m.
            </p>
          </div>
        </div>

        <div className={styles.formContainer}>
          <Send isMigration />
        </div>
      </div>
    )
  }
}
