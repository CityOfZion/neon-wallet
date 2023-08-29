// @flow
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Home from './Home'
import authActions from '../../actions/authActions'
import withLoadingProp from '../../hocs/withLoadingProp'
import pureStrategy from '../../hocs/helpers/pureStrategy'
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
  withLoadingProp(authActions, { strategy: pureStrategy }),
  withSettingsContext,
)(Home)
