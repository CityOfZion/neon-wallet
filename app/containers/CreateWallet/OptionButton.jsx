// @flow

import React from 'react'
import styles from './OptionButton.scss'

const OptionButton = ({ active, children, handleClick }: Object) => (
  <div
    onClick={handleClick}
    className={active ? styles.activeOptionButton : styles.optionButton}
  >
    {children}
  </div>
)

export default OptionButton
