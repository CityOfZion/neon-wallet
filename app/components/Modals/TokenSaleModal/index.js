// @flow
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { pick, omit, values, keyBy } from 'lodash-es'
import { withData } from 'spunky'

import TokenSaleModal from './TokenSaleModal'
import balancesActions from '../../../actions/balancesActions'
import withAuthData from '../../../hocs/withAuthData'
import withNetworkData from '../../../hocs/withNetworkData'
import { showModal } from '../../../modules/modal'
import { participateInSale } from '../../../modules/sale'
import { MODAL_TYPES } from '../../../core/constants'

const mapDispatchToProps = (dispatch, props) => ({
  participateInSale: (...args) => dispatch(participateInSale(...args)),
  showTokensModal: () => dispatch(showModal(MODAL_TYPES.TOKEN))
})

const mapBalancesDataToProps = balances => ({
  assetBalances: pick(balances, 'NEO', 'GAS'),
  tokenBalances: keyBy(values(omit(balances, 'NEO', 'GAS')), 'symbol')
})

export default compose(
  withAuthData(),
  withNetworkData(),
  withData(balancesActions, mapBalancesDataToProps),
  connect(
    null,
    mapDispatchToProps
  )
)(TokenSaleModal)
