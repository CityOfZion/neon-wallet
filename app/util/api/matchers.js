// @flow
import { get } from 'lodash'
import { type ActionType, type ActionState } from '../../values/api'

export function actionTypeMatcher (type: ActionType): Function {
  return (actionState: ActionState): boolean => get(actionState, 'meta.type') === type
}

export function actionIdMatcher (id: string): Function {
  return (actionState: ActionState): boolean => get(actionState, 'meta.id') === id
}

export function actionMatcher (type: ActionType, id: string): Function {
  return (actionState: ActionState): boolean => {
    return actionTypeMatcher(type)(actionState) && actionIdMatcher(id)(actionState)
  }
}
