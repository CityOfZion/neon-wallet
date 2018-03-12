// @flow
import { compose, withProps } from 'recompose'

import withData from './api/withData'
import networkActions from '../actions/networkActions'
import { getNetworkById } from '../core/deprecated'

export default function withNetworkData (key: string = 'networkId') {
  const mapNetworkDataToProps = (networkId) => ({ [key]: networkId })

  return compose(
    withData(networkActions, mapNetworkDataToProps),

    // TODO: refactor this out by updating network state to use new action implementation
    withProps((props) => ({ net: getNetworkById(props.networkId) }))
  )
}
