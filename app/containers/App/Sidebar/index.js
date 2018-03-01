// @flow
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'

import Sidebar from './Sidebar'
import pricesActions from '../../../actions/pricesActions'
import withData from '../../../hocs/api/withData'
import withCurrencyData from '../../../hocs/withCurrencyData'
import { showModal } from '../../../modules/modal'
import { MODAL_TYPES } from '../../../core/constants'

const mapPricesDataToProps = ({ NEO, GAS }) => ({
  neoPrice: NEO,
  gasPrice: GAS
})

const mapDispatchToProps = (dispatch, props) => ({
  showSendModal: () => dispatch(showModal(MODAL_TYPES.SEND)),
  showTokenSaleModal: () => dispatch(showModal(MODAL_TYPES.ICO))
})

export default compose(
  withRouter, // allow `NavLink` components to re-render when the window location changes
  withData(pricesActions, mapPricesDataToProps),
  withCurrencyData('currencyCode'),
  connect(null, mapDispatchToProps)
)(Sidebar)
