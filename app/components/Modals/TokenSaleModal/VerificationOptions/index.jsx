// @flow
import React from 'react'

import styles from './styles.scss'
import commonStyles from '../styles.scss'

type Props = {
  isVerified: boolean,
  onChange: boolean => any
}

const VerificationOptions = ({ onChange, isVerified }: Props) => (
  <div className={styles.container}>
    <div className={commonStyles.sectionHeading}>Check your verification</div>
    <div className={styles.section}>
      <div className={styles.body}>
        <div className={styles.explanation}>
          By supporting verification, a smart contract will automatically reject
          your transaction if the sale is over-funded, otherwise refunds must be
          done manually
        </div>
        <div>
          <div className={styles.option}>
            <label>
              <input
                type='radio'
                defaultChecked={!isVerified}
                onChange={() => onChange(false)}
                name='verification'
              />
              I have checked - It doesn’t perform verification
            </label>
          </div>
          <div className={styles.option}>
            <label>
              <input
                type='radio'
                defaultChecked={isVerified}
                onChange={() => onChange(true)}
                name='verification'
              />
              I have checked - It performs verification
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default VerificationOptions
