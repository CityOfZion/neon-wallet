// @flow
import React from 'react'
import { useIntl } from 'react-intl'

import { ROUTES } from '../../core/constants'
import FullHeightPanel from '../../components/Panel/FullHeightPanel'
import EncryptForm from '../../components/Settings/EncryptForm'
import EncryptSuccess from '../../components/Settings/EncryptSuccess'
import LockIcon from '../../assets/icons/lock.svg'
import CloseButton from '../../components/CloseButton'
import styles from './Encrypt.scss'

type Props = {
  resetEncryptedWIF(): void,
  encryptedWIF: string,
}

const HeaderIcon = () => (
  <div>
    <LockIcon />
  </div>
)

const Encrypt = ({ encryptedWIF, resetEncryptedWIF }: Props) => {
  const intl = useIntl()

  return (
    <FullHeightPanel
      className={styles.encrypt}
      headerText={intl.formatMessage({ id: 'encryptPanelHeader' })}
      renderCloseButton={() => (
        <CloseButton onClick={resetEncryptedWIF} routeTo={ROUTES.SETTINGS} />
      )}
      renderHeaderIcon={HeaderIcon}
      renderInstructions={
        !encryptedWIF
          ? () => intl.formatMessage({ id: 'encryptInstructions' })
          : null
      }
    >
      {!encryptedWIF ? (
        <EncryptForm />
      ) : (
        <EncryptSuccess encryptedKey={encryptedWIF} />
      )}
    </FullHeightPanel>
  )
}

export default Encrypt
