// @flow
import { compose, withProps } from 'recompose'
import { connect } from 'react-redux'
import { trim } from 'lodash'

import AddContactPanel from './AddContactPanel'
import { saveAddress } from '../../../modules/addressBook'

const mapDispatchToProps = (dispatch, props) => ({
  onSave: (name, address) => {
    props.onSave && props.onSave()
    return dispatch(saveAddress(trim(name), trim(address)))
  }
})

export default compose(
  withProps(({ name }) => ({ oldName: name })),
  connect(null, mapDispatchToProps)
)(AddContactPanel)
