// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose, withProps } from 'recompose'
import { wallet } from '@cityofzion/neon-js'
import { validatePassphraseLength } from '../../core/wallet'
import { generateNewEncryptedWIF } from '../../modules/generateEncryptedWIF'
import Encrypt from './Encrypt'
import withChainData from '../../hocs/withChainData'

const actionCreators = {
  generateNewEncryptedWIF,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withChainData(),
  withProps({
    validatePassphraseLength,
  }),
)(Encrypt)
