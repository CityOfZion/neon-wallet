// @flow
import React from 'react'

import { useSettingsContext } from '../context/settings/SettingsContext'

// NOTE: this is a drop in replacement HOC to replace
// many of the HOCs that provide settings data to components.
function withSettingsContext(WrappedComponent: React$ComponentType<any>) {
  return function EnhancedComponent(props: any) {
    const { settings, setSetting } = useSettingsContext()
    const tokens = props.networkId
      ? settings?.tokens?.filter(
          ({ networkId }) => networkId === props.networkId,
        )
      : settings.tokens
    return (
      <WrappedComponent
        {...props}
        {...settings}
        tokens={tokens}
        setSetting={(setting: { [key: string]: any }) => setSetting(setting)}
      />
    )
  }
}

export default withSettingsContext
