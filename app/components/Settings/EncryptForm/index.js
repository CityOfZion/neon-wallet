import { compose, withProps } from 'recompose'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import withChainData from '../../../hocs/withChainData'
import EncryptForm from './EncryptForm'
import { setEncryptedWIF } from '../../../modules/generateEncryptedWIF'
import { validatePassphraseLength } from '../../../core/wallet'

const actionCreators = {
  setEncryptedWIF,
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
)(EncryptForm)
