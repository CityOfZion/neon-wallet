// @flow
import classNames from 'classnames'
import React from 'react'
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl'

import InfoIcon from '../../../assets/icons/info.svg'

import styles from './Explanation.scss'

// const CREATE_WALLET_STEP = 'CREATE_WALLET_STEP'
// const SELECT_TOKEN_STEP = 'SELECT_TOKEN_STEP'
// const MIGRATION_HISTORY_STEP = 'MIGRATION_HISTORY_STEP'

const STEPS = {
  CREATE_WALLET_STEP: {
    explanation: 'Create N3 Wallet',
  },
  SELECT_TOKEN_STEP: {
    explanation: 'Select tokens to migrate',
  },
  MIGRATION_HISTORY_STEP: {
    explanation: 'View migration history',
  },
}

export default function Explanation({
  currentStep,
  handleStepChange,
}: {
  currentStep: string,
  handleStepChange: string => void,
}) {
  return (
    <div className={styles.receiveExplanation}>
      <div className={styles.header}>
        <InfoIcon className={styles.icon} />
        <div className={styles.title}>How does token migration work?</div>
      </div>
      <div className={styles.message}>
        {/* $FlowFixMe */}
        {Object.keys(STEPS).map((key, i) => {
          const { explanation } = STEPS[key]
          return (
            <div
              className={classNames([
                styles.stepContainer,
                key === currentStep ? styles.activeStep : '',
              ])}
              key={key}
              onClick={() => handleStepChange(key)}
            >
              <div className={styles.stepImage}>{i + 1}</div>
              {explanation}
            </div>
          )
        })}
      </div>

      <p>
        Neon Wallet will format and relay your migration transaction to a
        utility which will mint N3 NEO and GAS to your new N3 address. You can
        return to the migration tab at any time to view the migration status for
        your address or to relay new migration transactions.
      </p>
    </div>
  )
}
