// @flow
import React from 'react'
import classNames from 'classnames'

import DropdownIcon from '../../../assets/icons/dropdown.svg'
import styles from './DropdownButton.scss'

type Props = {
  className?: string,
  onToggle: Function
}

const DropdownButton = ({ className, onToggle }: Props) => (
  <DropdownIcon
    className={classNames(styles.dropdownButton, className)}
    onClick={() => onToggle()}
  />
)

export default DropdownButton
