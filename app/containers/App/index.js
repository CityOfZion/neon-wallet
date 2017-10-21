// @flow
import { connect } from 'react-redux'
import App from './App'

const mapStateToProps = (state: Object) => ({
  status: state.transactions.success,
  statusMessage: state.transactions.message
})

export default connect(mapStateToProps)(App)
