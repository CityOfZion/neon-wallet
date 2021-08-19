// @flow
import { createActions } from 'spunky'

export const ID = 'migration'

type Props = {
  name: string,
}

export default createActions(ID, ({ name }: Props = {}) => () => name)
