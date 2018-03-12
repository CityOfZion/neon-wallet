// @flow
import withRedirect from './withRedirect'
import didLogout from '../helpers/didLogout'
import { ROUTES } from '../../core/constants'

export default withRedirect(ROUTES.HOME, didLogout)
