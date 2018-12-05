// @flow
import React, { Fragment } from 'react'
import { shell } from 'electron'
import Tooltip from '../components/Tooltip'

type Props = {
  href: ?string,
  tooltip?: string,
  children: React$Node
}

export function ConditionalLink(props: Props): React$Element<*> {
  const { href, tooltip } = props
  let { children } = props

  if (href) {
    if (tooltip) {
      children = <Tooltip title={tooltip}>{children}</Tooltip>
    }

    const linkProps = {
      onClick: () => shell.openExternal(href), // open in default browser
      href: 'return false' // prevent default
    }

    return <a {...linkProps}>{children}</a>
  }
  return <Fragment>{children}</Fragment>
}
