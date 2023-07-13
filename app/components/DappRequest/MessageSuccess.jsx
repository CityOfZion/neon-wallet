// @flow
import React from 'react'
import { ROUTES } from '../../core/constants'
import CloseButton from '../CloseButton'
import FullHeightPanel from '../Panel/FullHeightPanel'
import WallletConnect from '../../assets/icons/wallet_connect.svg'
import styles from '../../containers/ConnectDapp/styles.scss'
import CheckMarkIcon from '../../assets/icons/confirm-circle.svg'

type Props = {
  isVerify: boolean,
}

const MessageSuccess = ({ isVerify }: Props) => (
  <FullHeightPanel
    headerText="Wallet Connect"
    renderCloseButton={() => <CloseButton routeTo={ROUTES.DASHBOARD} />}
    renderHeaderIcon={() => (
      <div>
        <WallletConnect />
      </div>
    )}
    renderInstructions={false}
  >
    <div className={styles.txSuccessContainer}>
      <CheckMarkIcon />
      <h3>
        You have successfully
        {!isVerify ? ' signed ' : ' verified '}
        the message!
      </h3>
      <br />
      <br />
    </div>
  </FullHeightPanel>
)

export default MessageSuccess
