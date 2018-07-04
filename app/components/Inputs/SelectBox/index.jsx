// @flow
import React from 'react'
import classNames from 'classnames'

import style from './SelectBox.scss'

type Props = {
  className?: string,
  options: Array<OptionsObject>,
  name?: string,
  id?: string,
  label?: string,
  onChangeHandler: Function
}

type OptionsObject = {
  value: number,
  label: string
}

const SelectBox = ({
  options = [],
  className = '',
  name = '',
  id = '',
  label = '',
  onChangeHandler
}: Props) => {
  const selectBoxLabelStyles = label ? style.selectBoxLabelStyles : ''
  const formattedOptions = options.map(option => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ))

  const selectBox = (
    <select
      className={classNames(style.selectBox, className, selectBoxLabelStyles)}
      name={name}
      id={id}
      onChange={onChangeHandler}
    >
      {formattedOptions}
    </select>
  )

  if (label) {
    return (
      <label className={style.selectBoxLabel}>
        {label}
        {selectBox}
      </label>
    )
  }

  return selectBox
}

export default SelectBox
