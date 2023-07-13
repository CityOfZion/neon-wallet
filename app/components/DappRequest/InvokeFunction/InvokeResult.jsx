/* eslint-disable no-nested-ternary */
// @flow
import React from 'react'
import { ROUTES } from '../../../core/constants'
import CloseButton from '../../CloseButton'
import FullHeightPanel from '../../Panel/FullHeightPanel'
import WallletConnect from '../../../assets/icons/wallet_connect.svg'
import styles from '../../../containers/ConnectDapp/styles.scss'
import CheckMarkIcon from '../../../assets/icons/confirm-circle.svg'
import ErrorIcon from '../../../assets/icons/wc-error.svg'

type Props = {
  transactionHash?: string,
  errorMessage?: string,
}

const InvokeResult = ({ transactionHash, errorMessage }: Props) => (
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
      {transactionHash ? (
        <>
          <CheckMarkIcon />
          <h3> Transaction pending!</h3>
          <p>
            Once your transaction has been confirmed it will appear in your
            activity feed.
          </p>
          <br />
          <br />
          <p>
            <label>TRANSACTION ID</label>
            <br />
            <code>{transactionHash}</code>
          </p>
        </>
      ) : errorMessage ? (
        <>
          <ErrorIcon />
          <h3>Transaction failed!</h3>
          <p>{errorMessage}</p>
          <br />
          <br />
        </>
      ) : (
        <></>
      )}
    </div>
  </FullHeightPanel>
)

export default InvokeResult
