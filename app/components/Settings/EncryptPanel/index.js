// @flow
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import withChainData from '../../../hocs/withChainData'
import {
  getEncryptedWIF,
  resetEncryptedWIF,
} from '../../../modules/generateEncryptedWIF'
import EncryptPanel from './EncryptPanel'

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
  withChainData(),
)(EncryptPanel)
