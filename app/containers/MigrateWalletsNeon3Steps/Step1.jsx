// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import Button from '../../components/Button'
import styles from './Step1.scss'
import ArrowRightIcon from '../../assets/icons/arrow-right-green.svg'
import LaunchIcon from '../../assets/icons/launch-green.svg'

type Props = {
  onNext: () => void,
}

const MigrateWalletsNeon3Step1 = ({ onNext }: Props) => (
  <div className={styles.container}>
    <div className={styles.content}>
      <h2 className={styles.subtitle}>
        <FormattedMessage id="migrateWalletsNeon3Step1Title" />
      </h2>
      <p>
        <FormattedMessage id="migrateWalletsNeon3Step1Description" />
      </p>

      {/* TODO: Update the link to the latest NEON 3 build */}
      <Link className={styles.downloadButton} to="#">
        <LaunchIcon />
        <FormattedMessage id="migrateWalletsNeon3Step1DownloadButton" />
      </Link>

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

export default MigrateWalletsNeon3Step1
