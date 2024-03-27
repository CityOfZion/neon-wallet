// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import FullHeightPanel from '../../components/Panel/FullHeightPanel'
import CloseButton from '../../components/CloseButton'
import { ROUTES } from '../../core/constants'
import Button from '../../components/Button'
import styles from './MigrateWalletNeon3.scss'
import migrateWalletsIconDark from '../../assets/images/migrate-wallets-icon-dark.png'
import migrateWalletsIconWhite from '../../assets/images/migrate-wallets-icon-white.png'

type Props = {
  theme: string,
}

const MigrateWalletsNeon3 = ({ theme }: Props) => (
  <FullHeightPanel
    renderInstructions={false}
    renderCloseButton={() => <CloseButton routeTo={ROUTES.HOME} />}
    scrollableContentClassName={styles.scrollableContent}
    childrenContainerClassName={styles.childrenContainer}
  >
    <div className={styles.container}>
      <div className={styles.content}>
        <FormattedMessage id="migrateWalletsNeon3AltImage">
          {translation => (
            <img
              src={
                theme === 'Light'
                  ? migrateWalletsIconWhite
                  : migrateWalletsIconDark
              }
              alt={translation}
            />
          )}
        </FormattedMessage>

        <h1 className={styles.title}>
          <FormattedMessage id="migrateWalletNeon3Title" />
        </h1>

        <p className={styles.description}>
          <FormattedMessage id="migrateWalletNeon3Description" />
        </p>
      </div>

      <Link to={ROUTES.MIGRATE_WALLETS_NEON3_STEPS}>
        <Button
          id="loginButton"
          primary
          shouldCenterButtonLabelText
          type="submit"
        >
          <FormattedMessage id="migrateWalletNeon3Button" />
        </Button>
      </Link>
    </div>
  </FullHeightPanel>
)

export default MigrateWalletsNeon3
