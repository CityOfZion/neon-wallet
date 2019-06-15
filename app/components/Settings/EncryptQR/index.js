// @flow

import { connect } from 'react-redux'
import { getEncryptedWIF } from '../../../modules/generateEncryptedWIF'
import EncryptQR from './EncryptQR'

const mapStateToProps = (state: Object) => ({
  encryptedWIF: getEncryptedWIF(state),
})

export default connect(
  mapStateToProps,
  (dispatch: Dispatch) => ({ dispatch }),
)(EncryptQR)
