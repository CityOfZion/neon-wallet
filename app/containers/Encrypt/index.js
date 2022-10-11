// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import {
  getEncryptedWIF,
  resetEncryptedWIF,
} from '../../modules/generateEncryptedWIF'
import Encrypt from './Encrypt'

const actionCreators = {
  resetEncryptedWIF,
}

const mapStateToProps = state => ({
  encryptedWIF: getEncryptedWIF(state),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Encrypt)
