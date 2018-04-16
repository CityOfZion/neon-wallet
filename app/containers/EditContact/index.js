// @flow
import { compose, withProps, type MapStateToProps } from 'recompose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import EditContact from './EditContact'

import { getAddresses } from '../../modules/addressBook'

const mapNameToProps = (props) => ({
  name: decodeURIComponent(props.match.params.name)
})

const mapStateToProps: MapStateToProps<*, *, *> = (state: Object, ownProps: Object) => ({
  address: getAddresses(state)[ownProps.name]
})

export default compose(
  withRouter,
  withProps(mapNameToProps),
  connect(mapStateToProps)
)(EditContact)
