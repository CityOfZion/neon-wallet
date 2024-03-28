/* eslint-disable class-methods-use-this */
// @flow
import {
  TSession,
  TSessionProposal,
  Chain,
  Blockchain,
  AbstractWalletConnectNeonAdapter,
  WalletInfo,
  TInitOptions,
} from '@cityofzion/wallet-connect-sdk-wallet-react'
import * as NeonJs from '@cityofzion/neon-js'
import { MAIN_NETWORK_ID } from '../core/constants'
import store from '../store/configureStore'
import { getRPCEndpoint } from '../actions/nodeStorageActions'

type AccountInformation = {
  namespace: string,
  reference: string,
  address: string,
  chainId: string,
  blockchain: string,
}

export const networks: { [string]: Chain } = {
  Custom: 'private',
  MainNet: 'mainnet',
  TestNet: 'testnet',
}

export const networksIDSByNetworksLabel: { [string]: string } = {
  Custom: 'Custom',
  MainNet: '1',
  TestNet: '2',
}

const blockchainsByBlockchainServiceKey: { [string]: Blockchain } = {
  neo3: 'neo3',
}

export function getInformationFromSession(
  session: TSession,
): AccountInformation[] {
  const { accounts } = (Object.values(session.namespaces): any)[0]

  const accountsInfos = accounts.map(
    (account): AccountInformation => {
      const [namespace, reference, address] = account.split(':')

      const blockchain = Object.entries(blockchainsByBlockchainServiceKey).find(
        ([, value]) => value === namespace,
      )
      if (!blockchain) throw new Error('Blockchain not supported')

      return {
        address,
        namespace,
        reference,
        chainId: `${namespace}:${reference}`,
        blockchain: blockchain[0],
      }
    },
  )

  return accountsInfos
}

export function convertChain(network: string): Chain {
  return networks[network]
}

export function getNetworkFromProposal(
  proposal: TSessionProposal,
): {
  blockchain: string,
  network: string,
} {
  const { chains } = (Object.values(proposal.params.requiredNamespaces): any)[0]
  if (!chains) throw new Error('ChainId not found')

  const chainId = chains[0]

  const [proposalBlockchain, proposalNetwork] = (chainId.split(':'): [
    Blockchain,
    Chain,
  ])

  const blockchain = (Object.entries(blockchainsByBlockchainServiceKey): Array<
    [string, Blockchain],
  >).find(([, value]) => value === proposalBlockchain)
  if (!blockchain) throw new Error('Blockchain not supported')

  const network = (Object.entries(networks): [string, Chain][]).find(
    ([, value]) => value === proposalNetwork,
  )
  if (!network) throw new Error('Network not supported')

  return {
    blockchain: blockchain[0],
    network: network[0],
  }
}

export class WalletConnectNeonAdapter extends AbstractWalletConnectNeonAdapter {
  async getWalletInfo(): Promise<WalletInfo> {
    const {
      spunky: {
        auth: {
          data: { isHardwareLogin },
        },
      },
    } = store.getState()

    return {
      isLedger: isHardwareLogin ?? false,
    }
  }

  async getAccountString(): Promise<string> {
    const {
      spunky: {
        auth: {
          data: { publicKey, wif, isHardwareLogin },
        },
      },
    } = store.getState()

    if (!isHardwareLogin) {
      if (!wif) throw new Error('WIF not found')
      return wif
    }
    if (!publicKey) throw new Error('Public key not found')
    return publicKey
  }

  async getRPCUrl(): Promise<string> {
    const {
      spunky: { network },
    } = store.getState()
    const net = network?.data ?? MAIN_NETWORK_ID
    const convertedNet = Object.entries(networksIDSByNetworksLabel).find(
      ([, value]) => value === net,
    )
    if (!convertedNet) throw new Error('Network not supported')

    const rpcURL = await getRPCEndpoint(convertedNet[0])
    if (!rpcURL) throw new Error('RPC URL not found')

    return rpcURL
  }

  async getSigningCallback(): Promise<NeonJs.api.SigningFunction | void> {
    const {
      spunky: {
        auth: {
          data: { isHardwareLogin, signingFunction },
        },
      },
    } = store.getState()

    return isHardwareLogin ? signingFunction : undefined
  }
}

export const walletConnectOptions: TInitOptions = {
  clientOptions: {
    metadata: {
      name: 'Neon Wallet',
      description:
        'Create and organize wallets, or easily import your existing ones, to safely manage and transfer your assets across accounts with Neon’s slick interface.',
      url: 'https://coz.io/',
      icons: [
        'https://raw.githubusercontent.com/CityOfZion/visual-identity/develop/_CoZ%20Branding/_Logo/_Logo%20icon/_PNG%20200x178px/CoZ_Icon_DARKBLUE_200x178px.png',
      ],
    },
    projectId: '56de852a69580b46d61b53f7b3922ce1',
    relayUrl: 'wss://relay.walletconnect.com',
    logger: 'error',
  },
  blockchains: {
    neo3: {
      methods: [
        'invokeFunction',
        'testInvoke',
        'signMessage',
        'verifyMessage',
        'traverseIterator',
        'getWalletInfo',
        'getNetworkVersion',
        'decrypt',
        'encrypt',
        'decryptFromArray',
        'calculateFee',
        'signTransaction',
      ],
      autoAcceptMethods: [
        'testInvoke',
        'getWalletInfo',
        'getNetworkVersion',
        'traverseIterator',
        'calculateFee',
      ],
      adapter: new WalletConnectNeonAdapter(),
    },
  },
}
