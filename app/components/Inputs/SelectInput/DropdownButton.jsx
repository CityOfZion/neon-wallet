// @flow
import React from 'react'
import classNames from 'classnames'
import ArrowDropDown from 'react-icons/lib/md/arrow-drop-down'

import styles from './DropdownButton.scss'

type Props = {
  className?: string,
  onToggle: Function
}

const DropdownButton = ({ className, onToggle }: Props) => (
  <div className={classNames(styles.dropdownButton, className)} onClick={() => onToggle()}>
    <ArrowDropDown />
  </div>
)

export default DropdownButton
