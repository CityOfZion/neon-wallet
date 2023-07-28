// @flow

import { compose } from 'recompose'
import { withData } from 'spunky'

import LogoWithTooltipAndBlockHeight from './LogoWithTooltipAndBlockHeight'

import { blockHeightActions } from '../../actions/blockHeightActions'

const mapBlockHeightDataToProps = (count: Number) => ({
  count,
})

export default compose(withData(blockHeightActions, mapBlockHeightDataToProps))(
  LogoWithTooltipAndBlockHeight,
)
