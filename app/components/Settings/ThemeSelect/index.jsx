// @flow
import React from 'react'

import SelectInput from '../../Inputs/SelectInput'

type Props = {
  className?: string,
  childClassName?: string,
  themes: array,
  theme: string,
  updateThemeSettings: ?Function
}

const ThemeSelect = ({ className, childClassName, themes, theme, updateThemeSettings }: Props) => (
    <div className={className}>
      <span className={childClassName}>THEME</span>
      <SelectInput
        items={Object.keys(themes)}
        value={theme}
        onChange={updateThemeSettings}
      />
    </div>
)

export default ThemeSelect
