// @flow
import React from 'react'
import { FormattedMessage } from 'react-intl'
import electron from 'electron'
import styles from './Step3.scss'
import migrateWalletsIconDark from '../../assets/images/migrate-wallets-icon-dark.png'
import migrateWalletsIconWhite from '../../assets/images/migrate-wallets-icon-white.png'
import ExternalIcon from '../../assets/icons/external.svg'
import Button from '../../components/Button'

type Props = {
  theme: string,
}

const openNeon3Click = () => {
  electron.shell.openExternal('neon3://migration')
}

const MigrateWalletsNeon3Step3 = ({ theme }: Props) => (
  <div className={styles.container}>
    <div className={styles.content}>
      <h2 className={styles.subtitle}>
        <FormattedMessage id="migrateWalletsNeon3Step3Title" />
      </h2>

      <p className={styles.description}>
        <FormattedMessage id="migrateWalletsNeon3Step3Description" />
      </p>

      <p>
        <FormattedMessage id="migrateWalletsNeon3Step3Description2" />
      </p>

      <FormattedMessage id="migrateWalletsNeon3Step3AltImage">
        {translation => (
          <img
            className={styles.image}
            src={
              theme === 'Light'
                ? migrateWalletsIconWhite
                : migrateWalletsIconDark
            }
            alt={translation}
          />
        )}
      </FormattedMessage>

      <Button
        primary
        className={styles.nextButton}
        contentClassName={styles.nextButtonContent}
        onClick={openNeon3Click}
      >
        <FormattedMessage id="migrateWalletsNeon3Step3Button" />
        <ExternalIcon />
      </Button>
    </div>
  </div>
)

export default MigrateWalletsNeon3Step3
