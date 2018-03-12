// @flow
import { type Actions } from '../../values/api'
import withResponsiveAction, { type ShouldPerform } from './withResponsiveAction'

export default function withReload (actions: Actions, shouldReload: ShouldPerform, options: Object = {}): Function {
  return withResponsiveAction(actions, 'request', shouldReload, options)
}
