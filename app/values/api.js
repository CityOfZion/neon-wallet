// @flow
type RequestType = 'REQ/REQUEST' | 'REQ/RETRY' | 'REQ/CANCEL' | 'REQ/SUCCESS' | 'REQ/FAILURE' | 'REQ/RESET'
type BatchType = 'BATCH/REQUEST' | 'BATCH/RETRY' | 'BATCH/CANCEL' | 'BATCH/SUCCESS' | 'BATCH/FAILURE' | 'BATCH/RESET'
export type ActionType = RequestType | BatchType

export const ACTION_REQUEST: RequestType = 'REQ/REQUEST'
export const ACTION_RETRY: RequestType = 'REQ/RETRY'
export const ACTION_CANCEL: RequestType = 'REQ/CANCEL'
export const ACTION_SUCCESS: RequestType = 'REQ/SUCCESS'
export const ACTION_FAILURE: RequestType = 'REQ/FAILURE'
export const ACTION_RESET: RequestType = 'REQ/RESET'

export const BATCH_REQUEST: BatchType = 'BATCH/REQUEST'
export const BATCH_RETRY: BatchType = 'BATCH/RETRY'
export const BATCH_CANCEL: BatchType = 'BATCH/CANCEL'
export const BATCH_SUCCESS: BatchType = 'BATCH/SUCCESS'
export const BATCH_FAILURE: BatchType = 'BATCH/FAILURE'
export const BATCH_RESET: BatchType = 'BATCH/RESET'

export type Data = Object | null
export type Error = string | null
export type Payload = any

export type ActionTypeMap = {
  REQUEST: string,
  RETRY: string,
  CANCEL: string,
  SUCCESS: string,
  FAILURE: string,
  RESET: string
}

export type Actions = {
  id: string,
  request: Function,
  retry: Function,
  cancel: Function,
  reset: Function,
  actionTypes: ActionTypeMap
}

export type ActionMeta = {
  id: string,
  type: ActionType
}

export type RequestMapping = {
  [key: string]: ActionState // eslint-disable-line no-use-before-define
}

export type ActionState = {
  type: string,
  meta: ActionMeta,
  payload?: Payload
}

export type ActionStateMap = {
  [key: string]: ActionState
}
