// @flow
import Home from './Home'
import authActions from '../../actions/authActions'
import withLoadingProp from '../../hocs/withLoadingProp'
import pureStrategy from '../../hocs/helpers/pureStrategy'

export default withLoadingProp(authActions, { strategy: pureStrategy })(Home)
