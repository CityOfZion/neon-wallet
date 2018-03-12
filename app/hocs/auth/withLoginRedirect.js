// @flow
import withRedirect from './withRedirect'
import didLogin from '../helpers/didLogin'
import { ROUTES } from '../../core/constants'

export default withRedirect(ROUTES.DASHBOARD, didLogin)
