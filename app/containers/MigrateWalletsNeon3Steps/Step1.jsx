// @flow
import React from 'react'
import { FormattedMessage } from 'react-intl'
import electron from 'electron'
import Button from '../../components/Button'
import styles from './Step1.scss'
import ArrowRightIcon from '../../assets/icons/arrow-right-green.svg'
import LaunchIcon from '../../assets/icons/launch-green.svg'

type Props = {
  onNext: () => void,
}

const MigrateWalletsNeon3Step1 = ({ onNext }: Props) => {
  const handleDownloadClick = () => {
    electron.shell.openExternal(
      'https://github.com/CityOfZion/neon-wallet-desktop/releases/latest',
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.subtitle}>
          <FormattedMessage id="migrateWalletsNeon3Step1Title" />
        </h2>
        <p>
          <FormattedMessage id="migrateWalletsNeon3Step1Description" />
        </p>

        <Button
          className={styles.downloadButton}
          contentClassName={styles.downloadButtonContent}
          onClick={handleDownloadClick}
          renderIcon={() => <LaunchIcon />}
          iconClassName={styles.downloadIcon}
        >
          <FormattedMessage id="migrateWalletsNeon3Step1DownloadButton" />
        </Button>

        <p className={styles.nextStep}>
          <FormattedMessage id="migrateWalletsNeon3Step1NextStep" />
        </p>
      </div>

      <Button
        primary
        className={styles.nextButton}
        contentClassName={styles.nextButtonContent}
        onClick={onNext}
      >
        <FormattedMessage id="migrateWalletsNeon3Step1ButtonLabel" />
        <ArrowRightIcon />
      </Button>
    </div>
  )
}

export default MigrateWalletsNeon3Step1
