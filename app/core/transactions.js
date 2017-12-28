// @flow
import { ASSETS } from './constants'

export const getTransactionInfo = (currentBalance: Array<HistoryBalanceType>, lastBalance: Array<HistoryBalanceType>) => {
  let type = 'NEO'
  let amountSent = 0

  let currentGas
  let curerntNeo
  currentBalance.map(({ asset, amount }) => {
    if (ASSETS.NEO === asset) {
      currentNeo = amount
    } else {
      currentGas = amount
    }
  })

  let lastGas
  let lastNeo
  lastBalance.map(({ asset, amount }) => {
    if (ASSETS.NEO === asset) {
      lastNeo = amount
    } else {
      lastGas = amount
    }
  })

  if (lastNeo && currentNeo && lastNeo !== currentNeo) {
    amountSent = currentNeo - lastNeo
  } else if (lastGas && currentGas && lastGas !== currentGas) {
    type = 'GAS'
    amountSent = currentGas - lastGas
  }
  return [type, amountSent]
}
