// @flow
import Tippy from '@tippyjs/react'
import React from 'react'
import { NavLink } from 'react-router-dom'

import { ROUTES } from '../../core/constants'
import Dapps from '../../assets/icons/dapps.svg'
import GreenDapps from '../../assets/icons/green-dapps.svg'
import Plus from '../../assets/icons/add.svg'
import styles from './DapiStatus.scss'
import { useWalletConnect } from '../../context/WalletConnect/WalletConnectContext'

const DapiStatus = ({
  showSuccessNotification,
}: {
  showSuccessNotification: ({ message: string }) => void,
}) => {
  const { sessions, disconnect } = useWalletConnect()

  return (
    <div className={styles.tooltipContainer}>
      <div className={styles.arrowUp} />
      <div className={styles.innerTooltipContainer}>
        <div className={styles.title}>
          CONNECTED DAPPS{' '}
          <NavLink exact to={ROUTES.CONNECT_DAPP}>
            {' '}
            <Plus />{' '}
          </NavLink>
        </div>
        <div className={styles.dappList}>
          {sessions.length ? (
            sessions.map((s, idx) => (
              <div key={idx} className={styles.sessionContainer}>
                <div>
                  {' '}
                  <img src={s.peer.metadata.icons[0]} />
                  {s.peer.metadata.name}
                </div>{' '}
                <div
                  className={styles.connectButton}
                  onClick={() => {
                    showSuccessNotification({
                      message: `You have successfully disconected from ${
                        s.peer.metadata.name
                      }`,
                    })
                    disconnect(s.topic)
                  }}
                >
                  {' '}
                  Disconnect{' '}
                </div>
              </div>
            ))
          ) : (
            <div style={{ marginTop: 6 }}>No dApps connected </div>
          )}
        </div>

        {!sessions.length && (
          <NavLink id="wallet-manager" exact to={ROUTES.CONNECT_DAPP}>
            <div className={styles.connectButton}> Connect </div>
          </NavLink>
        )}
      </div>
    </div>
  )
}

const DashboardButton = ({
  theme,
  showSuccessNotification,
}: {
  theme: string,
  showSuccessNotification: ({ message: string }) => void,
}) => (
  <Tippy
    interactive
    content={<DapiStatus showSuccessNotification={showSuccessNotification} />}
  >
    <div className={styles.contentContainer}>
      {theme === 'Light' ? <Dapps /> : <GreenDapps />}
      dApps
    </div>
  </Tippy>
)

export default DashboardButton
