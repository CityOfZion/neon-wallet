const LedgerNode = require('@ledgerhq/hw-transport-node-hid-noevents').default
// import LedgerNode from '@ledgerhq/hw-transport-node-hid-noevents'

enum StatusWord {
  OK = 0x9000,
}

enum Command {
  GET_APP_NAME = 0x00,
  GET_VERSION = 0x01,
  SIGN_TX = 0x02,
  GET_PUBLIC_KEY = 0x04,
}

const DEFAULT_STATUSLIST = [StatusWord.OK]

export const MESSAGES = {
  NOT_SUPPORTED: 'Your computer does not support the ledger',
  APP_CLOSED: 'Navigate to the NEO3 app on your Ledger device',
}

export const getHexPublicKey = async () => {
  const supported = await LedgerNode.isSupported()
  if (!supported) {
    throw new Error(MESSAGES.NOT_SUPPORTED)
  }

  const ledger = await LedgerNode.open()

  const appNameResponse = await ledger.send(0x80, Command.GET_APP_NAME, 0x00, 0x00, undefined, DEFAULT_STATUSLIST)
  const version = appNameResponse.toString('ascii')
  const appName = version.substring(0, version.length - 2)
  console.log('Appname: ' + appName)
  if (appName !== 'NEO N3' && appName !== 'NEO -DN3') {
    throw new Error(MESSAGES.APP_CLOSED)
  }

  try {
    const to8BitHex = (num: number): string => {
      const hex = num.toString(16)
      return '0'.repeat(8 - hex.length) + hex
    }

    const BIP44 = (address = 0, change = 0, account = 0): string => {
      const accountHex = to8BitHex(account + 0x80000000)
      const changeHex = to8BitHex(change)
      const addressHex = to8BitHex(address)
      return '8000002C' + '80000378' + accountHex + changeHex + addressHex
    }

    const response2 = await ledger.send(
      0x80,
      Command.GET_PUBLIC_KEY,
      0x00,
      0x0,
      Buffer.from(BIP44(0), 'hex'),
      DEFAULT_STATUSLIST
    )
    return response2.toString('hex').substring(0, 130)
  } finally {
    await ledger.close()
  }
}
