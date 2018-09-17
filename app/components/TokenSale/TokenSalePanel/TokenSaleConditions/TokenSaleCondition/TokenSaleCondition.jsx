// @flow
import React from 'react'

import CheckBox from '../../../../Inputs/CheckBox'
import QuestionMarkIcon from '../../../../../assets/icons/question.svg'

import styles from './TokenSaleCondition.scss'

type Props = {
  text: string
}

const TokenSaleCondition = ({ text, onClick, updateConditions, checked }: Props) => (
  <div className={styles.tokenSaleCondition}>
    <p className={styles.tokenSaleConditionText}>{text}</p>
    <CheckBox
      onChange={() => updateConditions(text)}
      checked={checked}
      icon={
        <QuestionMarkIcon className={styles.tokenSaleConditionCheckBoxIcon} />
      }
      className={styles.tokenSaleCheckBox}
    />
  </div>
)

export default TokenSaleCondition
