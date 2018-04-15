// @flow
import React from 'react'

import Button from '../Button'
import { ROUTES } from '../../core/constants'

type Props = {
  className: ?string,
  history: {
    push: Function
  }
}

export default class HomeButtonLink extends React.Component<Props> {
  render () {
    return <Button className={this.props.className} onClick={this.handleClick}>Home</Button>
  }

  handleClick = () => {
    this.props.history.push(ROUTES.HOME)
  }
}
