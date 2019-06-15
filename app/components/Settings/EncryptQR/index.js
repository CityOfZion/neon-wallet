// @flow

import { connect } from 'react-redux'
import { compose } from 'recompose'
import { getEncryptedWIF } from '../../../modules/generateEncryptedWIF'

import EncryptQR from './EncryptQR'

const mapStateToProps = (state: Object) => ({
  encryptedWIF: getEncryptedWIF(state),
})

export default compose(connect(mapStateToProps))(EncryptQR)
