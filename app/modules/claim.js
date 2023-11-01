// @flow
import { api, type Claims } from '@cityofzion/neon-js-legacy'
import { api as apiLatest, rpc } from '@cityofzion/neon-js-legacy-latest'
import {
  api as n3Api,
  wallet as n3Wallet,
  rpc as n3Rpc,
} from '@cityofzion/neon-js'
import { map, reduce } from 'lodash-es'

import {
  showErrorNotification,
  showSuccessNotification,
  showInfoNotification,
} from './notifications'
import {
  getNetwork,
  getWIF,
  getAddress,
  getSigningFunction,
  getPublicKey,
  getIsHardwareLogin,
  getNEO,
} from '../core/deprecated'
import { toBigNumber, toNumber } from '../core/math'
import { ASSETS } from '../core/constants'
import { FIVE_MINUTES_MS } from '../core/time'
import poll from '../util/poll'
import { getNode, getRPCEndpoint } from '../actions/nodeStorageActions'
import { getSettings } from '../actions/settingsActions'

// Constants
export const DISABLE_CLAIM = 'DISABLE_CLAIM'
const POLL_ATTEMPTS = 30
const POLL_FREQUENCY = 4000

// Actions
export function disableClaim(disableClaimButton: boolean) {
  return {
    type: DISABLE_CLAIM,
    payload: { disableClaimButton },
  }
}

const fetchClaims = async ({ net, address }) => {
  let endpoint = await getNode(net)
  if (!endpoint) {
    endpoint = await getRPCEndpoint(net)
  }
  const { claims } = await apiLatest.neoCli.getClaims(endpoint, address)
  return map(claims, 'claim')
}

const calculateClaimableAmount = (claims: Claims) =>
  reduce(claims, (sum, claim) => claim.plus(sum), 0).toString()

const getClaimableAmount = async ({ net, address }) => {
  const claims = await fetchClaims({ net, address })
  return calculateClaimableAmount(claims)
}

const updateClaimableAmount = async ({
  net,
  address,
  publicKey,
  privateKey,
  signingFunction,
  balance,
}) => {
  const { response } = await api.sendAsset(
    {
      net,
      address,
      publicKey,
      privateKey,
      signingFunction,
      intents: api.makeIntent({ [ASSETS.NEO]: toNumber(balance) }, address),
    },
    api.neoscan,
  )

  if (!response.result || !response.txid) {
    throw new Error('Rejected by RPC server.')
  }

  return response
}

const pollForUpdatedClaimableAmount = async ({ net, address, txid }) =>
  poll(
    async () => {
      // watch the sendAsset txid until it has been published
      const client = new rpc.RPCClient('https://mainnet2.neo2.coz.io:443')
      await client.getRawTransaction(txid)

      // get the new claimable amount
      return getClaimableAmount({ net, address })
    },
    { attempts: POLL_ATTEMPTS, frequency: POLL_FREQUENCY },
  )

const getUpdatedClaimableAmount = async ({
  net,
  address,
  balance,
  publicKey,
  privateKey,
  signingFunction,
}) => {
  const claimableAmount = await getClaimableAmount({ net, address })

  if (toBigNumber(balance).eq(0)) {
    return claimableAmount
  }
  const { txid } = await updateClaimableAmount({
    net,
    address,
    balance,
    publicKey,
    privateKey,
    signingFunction,
  })
  return pollForUpdatedClaimableAmount({ net, address, txid })
}

export const handleN3GasClaim = async ({
  FROM_ACCOUNT,
  dispatch,
  net,
  signingFunction,
  isHardwareClaim,
}: {
  FROM_ACCOUNT: {},
  dispatch: DispatchType,
  net: string,
  signingFunction: () => void,
  isHardwareClaim: boolean,
}) => {
  let endpoint = await getNode(net)
  if (!endpoint) {
    endpoint = await getRPCEndpoint(net)
  }

  const rpcClient = new n3Rpc.RPCClient(endpoint)
  const version = await rpcClient.execute(
    new n3Rpc.Query({
      method: 'getversion',
      params: [],
    }),
  )
  const networkMagic =
    version.protocol.network || version.network || version.magic || 860833102

  const CONFIG = {
    account: FROM_ACCOUNT,
    rpcAddress: endpoint,
    networkMagic,
  }
  const facade = await n3Api.NetworkFacade.fromConfig({
    node: endpoint,
  })

  if (isHardwareClaim) {
    dispatch(
      showInfoNotification({
        message: 'Please sign the transaction on your hardware device',
        autoDismiss: 0,
      }),
    )
  }

  const signingConfig = {
    signingCallback: isHardwareClaim
      ? signingFunction
      : n3Api.signWithAccount(CONFIG.account),
  }

  const results = await facade
    .claimGas(FROM_ACCOUNT, signingConfig)
    .catch(e => {
      console.error(e)
      dispatch(disableClaim(false))
      dispatch(
        showErrorNotification({
          message: 'Error claiming GAS please try again.',
        }),
      )
    })

  if (results) {
    dispatch(
      showSuccessNotification({
        message: 'Claim was successful! Your balance will update shortly.',
      }),
    )
  }
}

export const doGasClaim = () => async (
  dispatch: DispatchType,
  getState: GetStateType,
) => {
  const state = getState()
  const address = getAddress(state)
  const net = getNetwork(state)
  const balance = getNEO(state)
  const publicKey = getPublicKey(state)
  const privateKey = getWIF(state)
  const signingFunction = getSigningFunction(state)
  const isHardwareClaim = getIsHardwareLogin(state)
  const wif = getWIF(state)
  const { chain } = await getSettings()

  dispatch(disableClaim(true))

  if (chain === 'neo3') {
    const FROM_ACCOUNT = new n3Wallet.Account(isHardwareClaim ? publicKey : wif)
    return handleN3GasClaim({
      FROM_ACCOUNT,
      dispatch,
      net,
      signingFunction,
      isHardwareClaim,
    })
  }

  if (isHardwareClaim) {
    dispatch(
      showInfoNotification({
        message: 'Please sign transaction 1 of 2 on hardware device.',
      }),
    )
  } else {
    dispatch(showInfoNotification({ message: 'Calculating claimable GAS...' }))
  }

  // step 1: update available claims
  try {
    await getUpdatedClaimableAmount({
      net,
      address,
      balance,
      publicKey,
      privateKey,
      signingFunction,
    })
  } catch (err) {
    dispatch(disableClaim(false))
    dispatch(
      showErrorNotification({
        message: `Error calculating claimable GAS: ${err.message}`,
      }),
    )
    return
  }

  if (isHardwareClaim) {
    dispatch(
      showInfoNotification({
        message: 'Please sign transaction 2 of 2 on hardware device.',
      }),
    )
  } else {
    dispatch(showInfoNotification({ message: 'Claiming GAS...' }))
  }

  // step 2: send claim request
  try {
    let endpoint = await getNode(net)
    if (!endpoint) {
      endpoint = await getRPCEndpoint(net)
    }
    let claims = await apiLatest.neoCli.getClaims(endpoint, address)

    // estimated byte size under ledger limit
    if (isHardwareClaim) claims = claims.slice(0, 15)
    const { response } = await api.claimGas(
      { net, address, claims, publicKey, privateKey, signingFunction },
      api.neoscan,
    )

    if (!response.result) {
      throw new Error('Rejected by RPC server.')
    }
  } catch (err) {
    dispatch(disableClaim(false))
    dispatch(
      showErrorNotification({ message: `Claiming GAS failed: ${err.message}` }),
    )
    return
  }

  dispatch(
    showSuccessNotification({
      message: 'Claim was successful! Your balance will update shortly.',
    }),
  )
  setTimeout(() => dispatch(disableClaim(false)), FIVE_MINUTES_MS)
}

// State Getters
export const getDisableClaimButton = (state: Object) =>
  state.claim.disableClaimButton

const initialState = {
  disableClaimButton: false,
}

export default (state: Object = initialState, action: ReduxAction) => {
  switch (action.type) {
    // eslint-disable-next-line
    case DISABLE_CLAIM:
      // eslint-disable-next-line no-case-declarations
      const { disableClaimButton } = action.payload
      return {
        ...state,
        disableClaimButton,
      }
    default:
      return state
  }
}
