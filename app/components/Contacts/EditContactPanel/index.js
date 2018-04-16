// @flow
import { compose, withProps, withState } from 'recompose'
import { connect } from 'react-redux'
import { trim } from 'lodash'

import EditContactPanel from './EditContactPanel'
import { updateAddress } from '../../../modules/addressBook'

const mapDispatchToProps = (dispatch, props) => ({
  onSave: (name, address) => {
    props.onSave && props.onSave()
    return dispatch(updateAddress(props.oldName, trim(name), trim(address)))
  }
})

export default compose(
  withProps(({ name }) => ({ oldName: name })),
  connect(null, mapDispatchToProps),
  withState('name', 'setName', ({ name }) => name),
  withState('address', 'setAddress', ({ address }) => address)
)(EditContactPanel)
