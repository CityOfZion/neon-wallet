// @flow
import create from 'zustand'

import { wallet } from '@cityofzion/neon-js-legacy'
import { wallet as n3Wallet } from '@cityofzion/neon-js'
import { noop } from 'lodash-es'
import dns from 'dns'

import { bindArgsFromN } from '../util/bindHelpers'
import { resetBalanceState } from './balancesActions'

import { upgradeNEP6AddAddresses } from '../core/account'
import { validatePassphraseLength } from '../core/wallet'
import { legacySignWithLedger } from '../ledger/neonLedger'
import { signWithLedger } from '../ledger/n3NeonLedger'
import { getSettings } from '../context/settings/SettingsContext'

type WifLoginProps = {
  wif: string,
}

type WatchOnlyLoginProps = {
  address: string,
  chain: string,
}

type LedgerLoginProps = {
  publicKey: string,
  signingFunction: Function,
  account: number,
}

type Nep2LoginProps = {
  passphrase: string,
  encryptedWIF: string,
  chain: string,
}

type AccountType = ?{
  address: string,
  wif?: string,
  publicKey?: string,
  signingFunction?: Function,
  isHardwareLogin: boolean,
  isWatchOnly?: boolean,
  hasInternetConnectivity: boolean,
  encryptedWIF?: string,
}

export const checkForInternetConnectivity = (): Promise<boolean> =>
  new Promise(resolve => {
    dns.resolve('google.com', 'A', err => {
      if (err) {
        return resolve(false)
      }
      return resolve(true)
    })
  })

async function loginWithWif({ wif }) {
  if (!wallet.isWIF(wif) && !wallet.isPrivateKey(wif)) {
    throw new Error('Invalid private key entered')
  }
  const account = new wallet.Account(wif)
  const hasInternetConnectivity = await checkForInternetConnectivity()
  return {
    wif: account.WIF,
    publicKey: account.publicKey,
    address: account.address,
    isHardwareLogin: false,
    hasInternetConnectivity,
  }
}

async function loginWithN3Wif({ wif }) {
  if (!n3Wallet.isWIF(wif) && !n3Wallet.isPrivateKey(wif)) {
    throw new Error('Invalid private key entered')
  }
  const account = new n3Wallet.Account(wif)
  const hasInternetConnectivity = await checkForInternetConnectivity()
  return {
    wif: account.WIF,
    publicKey: account.publicKey,
    address: account.address,
    isHardwareLogin: false,
    hasInternetConnectivity,
  }
}

async function loginWatchOnly({ address, chain }) {
  if (chain === 'neo3') {
    if (!n3Wallet.isAddress(address)) {
      throw new Error('Invalid public key entered')
    }
    // TODO: offline signing flow for n3 totally unsupported
    // const hasInternetConnectivity = await checkForInternetConnectivity()
    const hasInternetConnectivity = true
    return {
      address,
      isHardwareLogin: false,
      isWatchOnly: true,
      hasInternetConnectivity,
    }
  }
  if (!wallet.isAddress(address)) {
    throw new Error('Invalid public key entered')
  }
  const hasInternetConnectivity = await checkForInternetConnectivity()
  return {
    address,
    isHardwareLogin: false,
    isWatchOnly: true,
    hasInternetConnectivity,
  }
}

export async function nep2Login({ passphrase, encryptedWIF, chain }) {
  if (chain === 'neo3') {
    if (!validatePassphraseLength(passphrase)) {
      throw new Error('Passphrase too short')
    }

    if (!n3Wallet.isNEP2(encryptedWIF)) {
      throw new Error('Invalid encrypted key entered')
    }

    const wif = await n3Wallet.decrypt(encryptedWIF, passphrase)
    const account = new n3Wallet.Account(wif)

    // TODO: offline signing flow for n3 totally unsupported
    // const hasInternetConnectivity = await checkForInternetConnectivity()
    const hasInternetConnectivity = true

    return {
      wif: account.WIF,
      publicKey: account.publicKey,
      address: account.address,
      isHardwareLogin: false,
      hasInternetConnectivity,
      encryptedWIF,
    }
  }

  if (!validatePassphraseLength(passphrase)) {
    throw new Error('Passphrase too short')
  }

  if (!wallet.isNEP2(encryptedWIF)) {
    throw new Error('Invalid encrypted key entered')
  }

  const wif = await wallet.decryptAsync(encryptedWIF, passphrase)
  const account = new wallet.Account(wif)

  // await upgradeNEP6AddAddresses(encryptedWIF, wif)

  const hasInternetConnectivity = await checkForInternetConnectivity()

  return {
    wif: account.WIF,
    publicKey: account.publicKey,
    address: account.address,
    isHardwareLogin: false,
    hasInternetConnectivity,
    encryptedWIF,
  }
}

export async function ledgerLogin({ publicKey, account }) {
  const { chain } = await getSettings()
  const wlt = chain === 'neo3' ? n3Wallet : wallet
  const publicKeyEncoded = wlt.getPublicKeyEncoded(publicKey)
  const walletAccount = new wlt.Account(publicKeyEncoded)
  const hasInternetConnectivity = await checkForInternetConnectivity()
  const signFunc = chain === 'neo3' ? signWithLedger : legacySignWithLedger
  return {
    publicKey,
    address: walletAccount.address,
    signingFunction: bindArgsFromN(signFunc, 3, account),
    isHardwareLogin: true,
    hasInternetConnectivity,
  }
}

const useAuthStore = create(set => ({
  account: null,
  login: async loginProps => {},
  n3Login: async loginProps => {},
  logout: () => {
    // Your logout logic here
  },
}))

export const useAuth = () => {
  const { account, login, logout } = useAuthStore()
  return { account, login, logout }
}
