// @flow
import React from 'react'

type Options = {
  axisType: 'x' | 'y',
  x: number,
  y: number,
  width: number,
  height: number,
  stroke: ?string,
  children: ?(React$Node | string)
}

export default function AxisLabel ({ axisType, x, y, width, height, stroke, children }: Options) {
  const isVertical = axisType === 'y'
  const cx = isVertical ? x : x + (width / 2)
  const cy = isVertical ? (height / 2) + y : y + height + 10
  const rotation = isVertical ? `270 ${cx} ${cy}` : 0

  return (
    <text x={cx} y={cy} transform={`rotate(${rotation})`} textAnchor='middle' stroke={stroke}>
      {children}
    </text>
  )
}
