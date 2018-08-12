// @flow
import React from 'react'

import SelectInput from '../../Inputs/SelectInput'

type Props = {
  className?: string,
  childClassName?: string,
  currencies: array,
  currency: string,
  updateCurrencySettings: ?Function
}

const CurrencySelect = ({ className, childClassName, currencies, currency, updateCurrencySettings }: Props) => (
    <div className={className}>
      <span className={childClassName}>CURRENCY</span>
      <SelectInput
        items={Object.keys(currencies).map(value => value.toUpperCase())}
        value={currency.toUpperCase()}
        onChange={updateCurrencySettings}
        getItemValue={value => value.toLowerCase()}
      />
    </div>
)

export default CurrencySelect
