// @flow
import React from 'react'
import classNames from 'classnames'

import styles from './SuccessMessage.scss'
import ConfirmIcon from '../../assets/icons/confirm.svg'

type Props = {
  className?: string,
  text?: string,
  icon?: React$Node
}

const SuccessMessage = ({ className, text, icon }: Props) => (
  <div className={classNames(styles.successMessage, className)}>
    <span className={styles.iconContainer}>{icon || <ConfirmIcon />}</span>
    <span className={styles.text}>{text}</span>
  </div>
)

export default SuccessMessage
