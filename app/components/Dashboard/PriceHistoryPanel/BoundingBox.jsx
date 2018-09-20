// @flow
import React from 'react'
import classNames from 'classnames'
// $FlowFixMe
import { isEqual } from 'lodash-es'

import styles from './BoundingBox.scss'

type SVGRect = {
  x: number,
  y: number,
  width: number,
  height: number
}

type SVGLocatable = {
  getBBox(): SVGRect
}

type Props = {
  className?: string,
  children: React$Node,
  paddingX: number,
  paddingY: number,
  roundedX: number,
  roundedY: number
}

type State = {
  position: ?SVGRect
}

export default class BoundingBox extends React.Component<Props, State> {
  // HACK: Any recharts chart will only render pure SVG elements and child elements that have a
  //       recognized displayName.  Since this element renders an SVG element, we'll make its
  //       displayName recognized to recharts to force it to render.
  static displayName = 'ReferenceArea'

  static defaultProps = {
    paddingX: 0,
    paddingY: 0,
    roundedX: 0,
    roundedY: 0
  }

  group: ?Node

  state = {
    position: null
  }

  componentDidMount() {
    this.updateBoundingBox()
  }

  componentDidUpdate() {
    this.updateBoundingBox()
  }

  render() {
    return (
      // $FlowFixMe
      <g ref={this.registerRef('group')} className={styles.boundingBoxGroup}>
        {this.renderBoundingBox()}
        {this.props.children}
      </g>
    )
  }

  renderBoundingBox() {
    const { position } = this.state
    const { roundedX, roundedY } = this.props

    if (position) {
      return (
        <rect
          // $FlowFixMe
          ref={this.registerRef('box')}
          className={classNames(styles.boundingBox, this.props.className)}
          rx={roundedX}
          ry={roundedY}
          x={position.x}
          y={position.y}
          width={position.width}
          height={position.height}
        />
      )
    }
    return null
  }

  registerRef = (name: string) => (el: Node) => {
    // $FlowFixMe
    this[name] = el
  }

  updateBoundingBox = () => {
    const position = this.calculateBoundingBox()

    if (position && !isEqual(position, this.state.position)) {
      this.setState({ position })
    }
  }

  calculateBoundingBox = (): ?SVGRect => {
    const nodes = this.group ? [...this.group.childNodes] : []
    if (nodes.length === 0) return undefined

    // $FlowFixMe
    const getBoundingBox = (el: SVGLocatable): SVGRect => el.getBBox()

    // $FlowFixMe
    const position = nodes.reduce(
      // $FlowFixMe
      (result: SVGRect, current: SVGLocatable): SVGRect => {
        // $FlowFixMe
        if (current === this.box) return result

        const box = getBoundingBox(current)
        const newX = Math.min(result.x, box.x)
        const newY = Math.min(result.y, box.y)

        return {
          x: newX,
          y: newY,
          width: newX + Math.max(result.x + result.width, box.x + box.width),
          height: newY + Math.max(result.y + result.height, box.y + box.height)
        }
      },
      getBoundingBox(nodes.pop())
    )

    const { paddingX, paddingY } = this.props

    return {
      x: position.x - paddingX,
      y: position.y - paddingY,
      width: position.width + paddingX * 2,
      height: position.height + paddingY * 2
    }
  }
}
