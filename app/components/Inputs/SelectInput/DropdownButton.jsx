// @flow
import React from 'react'
import classNames from 'classnames'

import DropdownIcon from '../../../assets/icons/dropdown.svg'
import styles from './DropdownButton.scss'

type Props = {
  className?: string,
  onToggle: Function,
  disabled: boolean
}

const DropdownButton = ({ className, onToggle, disabled }: Props) => (
  <DropdownIcon
    className={classNames(styles.dropdownButton, className)}
    onClick={() => !disabled && onToggle()}
  />
)

export default DropdownButton
