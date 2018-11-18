// @flow
import { api, wallet } from 'neon-js'

import {
  showErrorNotification,
  showInfoNotification,
  showSuccessNotification
} from './notifications'
import {
  getNetwork,
  getWIF
} from '../core/deprecated'

export const setupVote = (candidateKeys: CandidateKeys = []) => async (
  dispatch: DispatchType,
  getState: GetStateType
): Promise<*> => {
  if (!Array.isArray(candidateKeys)) {
    throw new Error('candidateKeys must be an array.')
  }

  const state = getState()
  const wif = getWIF(state)
  const net = getNetwork(state)

  dispatch(
    showInfoNotification({ message: 'Casting vote...', autoDismiss: 0 })
  )

  try {
    const response = await api.setupVote({
      net,
      account: new wallet.Account(wif),
      candidateKeys
    })
    if (response.result) {
      return dispatch(showSuccessNotification({
        message: 'Your vote was recorded by the network.'
      }))
    } else {
      throw new Error('The vote transaction went through but failed')
    }
  } catch (err) {
    console.error(err)
    return dispatch(showErrorNotification({
      message: 'The transaction failed. Please try voting again later.'
    }))
  }
}
