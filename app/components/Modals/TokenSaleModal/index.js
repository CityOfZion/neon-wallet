// @flow
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { pick, omit, values, keyBy } from 'lodash'

import TokenSaleModal from './TokenSaleModal'
import balancesActions from '../../../actions/balancesActions'
import withData from '../../../hocs/api/withData'
import withAuthData from '../../../hocs/withAuthData'
import withNetworkData from '../../../hocs/withNetworkData'
import { showModal } from '../../../modules/modal'
import { participateInSale, oldParticipateInSale } from '../../../modules/sale'
import { MODAL_TYPES } from '../../../core/constants'

const mapDispatchToProps = (dispatch, props) => ({
  participateInSale: (...args) => dispatch(participateInSale(...args)),
  oldParticipateInSale: (...args) => dispatch(oldParticipateInSale(...args)),
  showTokensModal: () => dispatch(showModal(MODAL_TYPES.TOKEN))
})

const mapBalancesDataToProps = (balances) => ({
  assetBalances: pick(balances, 'NEO', 'GAS'),
  tokenBalances: keyBy(values(omit(balances, 'NEO', 'GAS')), 'symbol')
})

export default compose(
  withAuthData(),
  withNetworkData(),
  withData(balancesActions, mapBalancesDataToProps),
  connect(null, mapDispatchToProps)
)(TokenSaleModal)
