// @flow
import React from 'react'
import { FormattedMessage } from 'react-intl'
import Button from '../../components/Button'
import styles from './Step2.scss'
import ArrowRightIcon from '../../assets/icons/arrow-right-green.svg'
import TextInput from '../../components/Inputs/TextInput'

type Props = {
  path: string,
  onNext: () => Promise<void>,
  onBrowse: () => Promise<void>,
}

const MigrateWalletsNeon3Step2 = ({ onNext, onBrowse, path }: Props) => (
  <div className={styles.container}>
    <div className={styles.content}>
      <h2 className={styles.subtitle}>
        <FormattedMessage id="migrateWalletsNeon3Step2Title" />
      </h2>

      <p>
        <FormattedMessage id="migrateWalletsNeon3Step2Description" />
      </p>

      <div className={styles.inputContainer}>
        <label>
          <FormattedMessage id="migrateWalletsNeon3InputLabel" />
        </label>
        <div>
          <TextInput containerClassName={styles.input} readOnly value={path} />
          <Button primary className={styles.browseButton} onClick={onBrowse}>
            <FormattedMessage id="migrateWalletsNeon3Step2BrowseButton" />
          </Button>
        </div>
      </div>

      <p className={styles.nextStep}>
        <FormattedMessage id="migrateWalletsNeon3Step2NextStep" />
      </p>
    </div>

    <Button
      primary
      className={styles.nextButton}
      contentClassName={styles.nextButtonContent}
      disabled={!path}
      onClick={onNext}
    >
      <FormattedMessage id="migrateWalletsNeon3Step2ButtonLabel" />
      <ArrowRightIcon />
    </Button>
  </div>
)

export default MigrateWalletsNeon3Step2
