// @flow
import React from 'react'
import { FormattedMessage } from 'react-intl'
import FullHeightPanel from '../../components/Panel/FullHeightPanel'
import { ROUTES } from '../../core/constants'
import CloseButton from '../../components/CloseButton'
import Button from '../../components/Button'
import neonWalletDesktop3PCImage from '../../assets/images/neon-wallet-desktop-3-pc.png'

import styles from './MigrationNotice.scss'

type Props = {
  history: any,
}

export default function MigrationNotice({ history }: Props) {
  const handleMigrate = () => {
    history.replace(ROUTES.MIGRATE_WALLETS_NEON3_STEPS)
  }

  return (
    <FullHeightPanel
      renderInstructions={false}
      renderCloseButton={() => <CloseButton routeTo={ROUTES.HOME} />}
      shouldRenderHeader={false}
      childrenContainerClassName={styles.childrenContainer}
    >
      <img className={styles.image} src={neonWalletDesktop3PCImage} />

      <h1 className={styles.title}>
        <FormattedMessage id="migrateWalletsNeon3NoticeTitle" />
      </h1>

      <p className={styles.subtitle}>
        <FormattedMessage id="migrateWalletsNeon3NoticeSubtitle" />
      </p>

      <p className={styles.description}>
        <FormattedMessage id="migrateWalletsNeon3NoticeDescription" />
      </p>

      <Button
        primary
        className={styles.button}
        contentClassName={styles.contentButton}
        onClick={handleMigrate}
      >
        <FormattedMessage id="migrateWalletsNeon3NoticeButtonLabel" />
      </Button>

      <p className={styles.note}>
        <FormattedMessage id="migrateWalletsNeon3NoticeNote" />
      </p>
    </FullHeightPanel>
  )
}
