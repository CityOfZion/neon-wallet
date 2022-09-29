// @flow
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import {
  getEncryptedWIF,
  resetEncryptedWIF,
} from '../../../modules/generateEncryptedWIF'
import EncryptSuccess from './EncryptSuccess'

const mapStateToProps = (state: Object) => ({
  encryptedWIF: getEncryptedWIF(state),
})

const actionCreators = {
  resetEncryptedWIF,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(EncryptSuccess)
