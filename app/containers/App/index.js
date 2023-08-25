// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'

import authActions from '../../actions/authActions'
import withLoginRedirect from '../../hocs/auth/withLoginRedirect'
import withLogoutRedirect from '../../hocs/auth/withLogoutRedirect'
import withLogoutReset from '../../hocs/auth/withLogoutReset'
import withAuthData from '../../hocs/withAuthData'
import { checkVersion } from '../../modules/metadata'
import {
  showErrorNotification,
  showInfoNotification,
  hideNotification,
} from '../../modules/notifications'

import App from './App'
import nftGalleryActions from '../../actions/nftGalleryActions'

const actionCreators = {
  checkVersion,
  showErrorNotification,
  showInfoNotification,
  hideNotification,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default compose(
  // Old way of fetching data, need to refactor this out...
  connect(
    null,
    mapDispatchToProps,
  ),

  // Provide authenticated state so dashboard knows what layout to use.
  withAuthData(),

  // Navigate to the home or dashboard when the user logs in or out.
  withLoginRedirect,
  withLogoutRedirect,

  // Remove stale data from store on logout
  withLogoutReset(authActions),
  // withLogoutReset(accountActions),
  // withLogoutReset(n3AccountsActions),
  withLogoutReset(nftGalleryActions),
)(App)
