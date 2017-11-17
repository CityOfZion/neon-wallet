// @flow
import { connect } from 'react-redux'
import PriceDisplay from './PriceDisplay'
import { getNeoPrice, getGasPrice } from '../../modules/wallet'

const mapStateToProps = (state) => ({
  neoPrice: getNeoPrice(state),
  gasPrice: getGasPrice(state)
})

export default connect(mapStateToProps)(PriceDisplay)
