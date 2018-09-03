<<<<<<< HEAD
// @flow

import React from 'react'

import Panel from '../../Panel'
import TokenSaleConfirmDetails from './TokenSaleConfirmDetails'
import Button from '../../Button'
import TokenSaleIcon from '../../../assets/navigation/tokens.svg'

import styles from './TokenSaleConfirm.scss'
import Logo from '../../../assets/images/grey-logo.png'

import { TOKEN_SALE_SUCCESS } from '../../../core/constants'

type Props = {
  setStep: () => void
}

const TokenSaleConfirm = ({ setStep }: Props) => (
  <Panel
    className={styles.tokenSaleConfirmPanel}
    renderHeader={() => (
      <img
        src={Logo}
        alt="Neon logo"
        className={styles.tokenSaleConfirmImage}
      />
    )}
  >
    <div className={styles.tokenSaleConfirmContainer}>
      <TokenSaleConfirmDetails />
      <Button
        onClick={() => setStep(TOKEN_SALE_SUCCESS)}
        primary
        renderIcon={TokenSaleIcon}
        className={styles.tokenSaleConfirmButton}
      >
        Continue
      </Button>
    </div>
=======
import React from 'react'

import Panel from '../../Panel'
import Logo from '../../../assets/icons/neonLogoGrey.svg'

import styles from './TokenSaleConfirm.scss'

const TokenSaleConfirm = () => (
  <Panel className={styles.tokenSaleConfirmPanel} renderHeader={() => <Logo />}>
    hello
>>>>>>> d79a17bafb9b724d97aac16c4f669575a5c67812
  </Panel>
)

export default TokenSaleConfirm
