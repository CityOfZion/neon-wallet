// @flow
import React from 'react'
import { Tooltip as Tippy } from 'react-tippy'

type Props = {
  position: 'top' | 'left' | 'right' | 'bottom',
  children: React$Node,
  style: string,
}

const Tooltip = ({ children, position = 'bottom', style, ...rest }: Props) => (
  // $FlowFixMe
  <Tippy arrow position={position} animation="fade" {...rest}>
    {children}
  </Tippy>
)

export default Tooltip
