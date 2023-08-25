// @flow

import { compose } from 'recompose'

import LogoWithTooltipAndBlockHeight from './LogoWithTooltipAndBlockHeight'
import withNetworkData from '../../hocs/withNetworkData'

export default compose(withNetworkData()(LogoWithTooltipAndBlockHeight))
