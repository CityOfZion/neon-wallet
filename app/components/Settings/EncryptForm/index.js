import { compose, withProps } from 'recompose'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import EncryptForm from './EncryptForm'
import { setEncryptedWIF } from '../../../modules/generateEncryptedWIF'
import { validatePassphraseLength } from '../../../core/wallet'
import withSettingsContext from '../../../hocs/withSettingsContext'

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
  withProps({
    validatePassphraseLength,
  }),
)(withSettingsContext(EncryptForm))
