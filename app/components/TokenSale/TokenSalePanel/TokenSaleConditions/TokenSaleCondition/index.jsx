// @flow
import React from 'react'

import CheckBox from '../../../../Inputs/CheckBox'
import QuestionMarkIcon from '../../../../../assets/icons/question.svg'

import styles from './TokenSaleCondition.scss'

type Props = {
  text: string
}

const TokenSaleCondition = ({ text }: Props) => (
  <div className={styles.tokenSaleCondition}>
    <p className={styles.tokenSaleConditionText}>{text}</p>
    <CheckBox
      onChange={() => console.log('changed')}
      icon={
        <QuestionMarkIcon className={styles.tokenSaleConditionCheckBoxIcon} />
      }
      className={styles.tokenSaleCheckBox}
    />
  </div>
)

export default TokenSaleCondition
