// @flow
import React from 'react'
import Cleave from 'cleave.js/react';

type Props = {
  placeholder?: string,
  onChange?: () => any,
  value?: string | number,
  options: {
    numeralThousandsGroupStyle?: 'thousand' | 'lakh' | 'wan' | 'none',
    numeralIntegerScale?: number,
    numeralDecimalScale?: number,
    numeralDecimalMark?: string,
    numeralPositiveOnly?: boolean,
    stripLeadingZeroes?: boolean
  },
  onBlur?: () => any
}

const NumberInput = ({
  options,
  onChange,
  placeholder,
  value,
  onBlur
}: Props) =>
  <Cleave
    placeholder={placeholder}
    onChange={onChange}
    options={{
      numeral: true,
      numeralThousandsGroupStyle: 'thousand',
      numeralPositiveOnly: true,
      stripLeadingZeroes: true,
      ...options
    }}
    value={value}
    onBlur={onBlur}
  />

export default NumberInput
