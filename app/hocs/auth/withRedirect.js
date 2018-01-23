// @flow
import React from 'react'
import { omit } from 'lodash'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'

import withData from '../api/withData'
import accountActions from '../../actions/accountActions'

type Props = {
  [key: string]: string,
  history: {
    push: Function
  }
}

type Options = {
  propName?: string
}

export default function withRedirect (
  route: string,
  strategy: Function,
  { propName = '__address__' }: Options = {}
) {
  const mapAccountDataToProps = (account) => ({
    [propName]: account && account.address
  })

  return (Component: Class<React.Component<*>>) => {
    class WrappedComponent extends React.Component<Props> {
      componentWillReceiveProps (nextProps) {
        if (strategy(this.props[propName], nextProps[propName])) {
          this.props.history.push(route)
        }
      }

      render () {
        const passDownProps = omit(this.props, propName)
        return <Component {...passDownProps} />
      }
    }

    return compose(
      withRouter,
      withData(accountActions, mapAccountDataToProps)
    )(WrappedComponent)
  }
}
