// @flow

import React, { Component } from 'react'

type Props = {
  children: React$Node,
}

type State = {
  hasError: boolean,
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  // static getDerivedStateFromError(error: Error) {
  //   console.log('getDerivedStateFromError')
  //   // Update state so the next render will show the fallback UI.
  //   return { hasError: true }
  // }

  componentDidCatch(error: Error, info: any) {
    // You can also log the error to an error reporting service
    console.warn({ error, info })
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return <h1>Oops something went wrong...</h1>
    }

    return this.props.children
  }
}
