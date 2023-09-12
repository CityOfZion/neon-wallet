// @flow
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Home from './Home'
import { showModal } from '../../modules/modal'
import withSettingsContext from '../../hocs/withSettingsContext'

const actionCreators = {
  showModal,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withSettingsContext,
)(Home)
