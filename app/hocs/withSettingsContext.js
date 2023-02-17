// @flow
import React from 'react'

import { useSettingsContext } from '../context/settings/SettingsContext'

// NOTE: this is a drop in replacement HOC to replace
// many of the HOCs that provide settings data to components.
function withSettingsContext(WrappedComponent: React$ComponentType<any>) {
  return function EnhancedComponent(props: any) {
    const { settings, setSetting } = useSettingsContext()
    return <WrappedComponent {...props} {...settings} setSetting={setSetting} />
  }
}

export default withSettingsContext
