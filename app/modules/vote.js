// @flow
import { api } from 'neon-js'

import {
  showErrorNotification,
  showInfoNotification,
  showSuccessNotification
} from './notifications'
import {
  getNetwork,
  getAddress
} from '../core/deprecated'

export const setupVote = (candidateKeys: CandidateKeys = []) => async (
  dispatch: DispatchType,
  getState: GetStateType
): Promise<*> => {
  if (!Array.isArray(candidateKeys)) {
    throw new Error('candidateKeys must be an array.')
  }

  const state = getState()
  const address = getAddress(state)
  const net = getNetwork(state)

  dispatch(
    showInfoNotification({ message: 'Casting vote...', autoDismiss: 0 })
  )

  try {
    const response = await api.setupVote({
      net,
      account: address,
      candidateKeys
    })
    if (response) {
      return dispatch(showSuccessNotification({
        message: 'Your vote was recorded by the network.'
      }))
    }
  } catch (err) {
    console.error(err)
    return dispatch(showErrorNotification({
      message: 'The transaction failed. Please try voting again later.'
    }))
  }
}
