// @flow
import { api } from 'neon-js'

import createApiActions from '../util/api/createApiActions'

type Props = {
  net: string
}

export default createApiActions('ENDPOINT', ({ net }: Props = {}) => (state: Object) => {
  return api.neonDB.getAPIEndpoint(net)
})
