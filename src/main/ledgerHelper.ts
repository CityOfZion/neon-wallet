// const n3ledger = require('@cityofzion/neon-ledger')
const LedgerNode = require('@ledgerhq/hw-transport-node-hid-noevents').default
// const TransportNodeHidNoEvents = require('@ledgerhq/hw-transport-node-hid-noevents')
// import n3ledger from '@cityofzion/neon-ledger'
// import * as n3ledger from '@cityofzion/neon-ledger'
// import LedgerNode from '@ledgerhq/hw-transport-node-hid-noevents'
// import LedgerNode from '@ledgerhq/hw-transport-node-hid'

export enum StatusWord {
    OK = 0x9000,
    DENY = 0x6985,
    WRONG_P1P2 = 0x6a86,
    WRONG_DATA_LENGTH = 0x6a87,
    INS_NOT_SUPPORTED = 0x6d00,
    CLA_NOT_SUPPORTED = 0x6e00,
    APP_CLOSED = 0x6e01,
    WRONG_RESPONSE_LENGTH = 0xb000,
    WRONG_TX_LENGTH = 0xb001,
    TX_PARSING_FAIL = 0xb002,
    TX_USER_CONFIRMATION_FAIL = 0xb003,
    BAD_STATE = 0xb004,
    SIGN_FAIL = 0xb005,
    BIP44_BAD_PURPOSE = 0xb100,
    BIP44_BAD_COIN_TYPE = 0xb101,
    BIP44_ACCOUNT_NOT_HARDENED = 0xb102,
    BIP44_BAD_ACCOUNT = 0xb103,
    BIP44_BAD_CHANGE = 0xb104,
    BIP44_BAD_ADDRESS = 0xb105,
    MAGIC_PARSING_FAIL = 0xb106,
    DISPLAY_SYSTEM_FEE_FAIL = 0xb107,
    DISPLAY_NETWORK_FEE_FAIL = 0xb108,
    DISPLAY_TOTAL_FEE_FAIL = 0xb109,
    DISPLAY_TOKEN_TRANSFER_AMOUNT_FAIL = 0xb10a,
    CONVERT_TO_ADDRESS_FAIL = 0xb200,
}

const MSG_TOO_BIG = 0x6d08
const APP_CLOSED = 0x6e00
const APP_CLOSED_V2 = 0x6e01
const TX_DENIED = 0x6985
const TX_PARSE_ERR = 0x6d07

enum Command {
    GET_APP_NAME = 0x00,
    GET_VERSION = 0x01,
    SIGN_TX = 0x02,
    GET_PUBLIC_KEY = 0x04,
}

const DEFAULT_STATUSLIST = [StatusWord.OK]

export const MESSAGES = {
    NOT_SUPPORTED: 'Your computer does not support the ledger',
    NOT_CONNECTED: 'Connect and unlock your Ledger device',
    APP_CLOSED: 'Navigate to the NEO3 app on your Ledger device',
    MSG_TOO_BIG: 'Your transaction is too big for the Ledger to sign',
    TX_DENIED: 'You have denied the transaction on your ledger',
    TX_PARSE_ERR: 'Error parsing transaction. Make sure your NEO3 Ledger app version is up to date',
}

const evalTransportError2 = (error: any) => {
    const err = error
    switch (err.statusCode) {
        case APP_CLOSED:
        case APP_CLOSED_V2:
            err.message = MESSAGES.APP_CLOSED
            break
        case MSG_TOO_BIG:
            err.message = MESSAGES.MSG_TOO_BIG
            break
        case TX_DENIED:
            err.message = MESSAGES.TX_DENIED
            break
        case TX_PARSE_ERR:
            err.message = MESSAGES.TX_PARSE_ERR
            break
        default:
    }
    return err
}

export default class NeonLedger3 {
    path: string

    device: any

    constructor(path: string) {
        this.path = path
    }
    static to8BitHex(num: number): string {
        const hex = num.toString(16)
        return '0'.repeat(8 - hex.length) + hex
    }

    static BIP44(address = 0, change = 0, account = 0): string {
        const accountHex = this.to8BitHex(account + 0x80000000)
        const changeHex = this.to8BitHex(change)
        const addressHex = this.to8BitHex(address)
        return '8000002C' + '80000378' + accountHex + changeHex + addressHex
    }

    static async init() {
        const supported = await LedgerNode.isSupported()
        if (!supported) {
            throw new Error(MESSAGES.NOT_SUPPORTED)
        }

        console.log('antes testessssss')
        const testessss = await LedgerNode.open()
        console.log('postestessssss')
        console.log(testessss)
        console.log('aaaaa')

        const response = await testessss.send(0x80, Command.GET_APP_NAME, 0x00, 0x00, undefined, DEFAULT_STATUSLIST)
        console.log(response)
        console.log('bbbbb')
        const version = response.toString('ascii')
        const result = version.substring(0, version.length - 2) // take of status word
        console.log(result)
        console.log('ccccc')

        const response2 = await testessss.send(
            0x80,
            Command.GET_PUBLIC_KEY,
            0x00,
            0x0,
            Buffer.from(this.BIP44(0), 'hex'),
            DEFAULT_STATUSLIST
        )
        console.log(response2)
        const pbk = response2.toString('hex').substring(0, 130)
        console.log(pbk)
        console.log('dddd')

        // console.log('antesList')
        // const paths = await NeonLedger3.list()
        // console.log(paths)
        // const path =
        //     'IOService:/AppleACPIPlatformExpert/PCI0@0/AppleACPIPCI/XHC1@14/XHC1@14000000/HS03@14300000/USB2.0 Hub             @14300000/AppleUSB20Hub@14300000/AppleUSB20HubPort@14310000/Nano S@14310000/Nano S@0/AppleUserUSBHostHIDDevice'
        // // if (!paths || paths.length === 0) throw new Error(MESSAGES.NOT_CONNECTED)
        // if (path) {
        //     console.log('paths')
        //     const ledger = new NeonLedger3(path)
        //     console.log('antesOpen')
        //     await ledger.open()
        //     console.log('depoisOpen')
        //     const appName = await ledger.getAppName()
        //     console.log(appName)
        //     if (appName !== 'NEO N3' && appName !== 'NEO -DN3') {
        //         throw new Error(MESSAGES.APP_CLOSED)
        //     }
        //     return ledger
        // }
        // return null
    }

    static async list(): Promise<string[] | null> {
        return LedgerNode.list()
    }

    async open(): Promise<NeonLedger3> {
        try {
            console.log('open')
            console.log(LedgerNode)
            this.device = await LedgerNode.open(this.path)
            console.log('posopen')
            return this
        } catch (err) {
            console.log('err')
            console.log(err)
            throw evalTransportError2(err)
        }
    }

    async getAppName(): Promise<string | null> {
        try {
            console.log('getAppName')
            // const response = await this.device.send(0x80, Command.GET_APP_NAME, 0x00, 0x00, undefined, DEFAULT_STATUSLIST)
            // console.log(response)
            // const version = response.toString('ascii')
            // return version.substring(0, version.length - 2) // take of status word
            return 'NEO N3'
            // return await n3ledger.getAppName(this.device)
        } catch (e) {
            console.log('error getAppName')
            console.log(e)
            return null
        }
    }

    async getPublicKey(acct: number = 0): Promise<{ account: number; key: string }> {
        try {
            console.log('getPublicKey')
            // const key = await n3ledger.getPublicKey(this.device, n3ledger.BIP44(acct))
            const key = 'key'
            return { account: acct, key }
        } catch (err) {
            console.log('err getPublicKey')
            console.log(err)
            throw evalTransportError2(err)
        }
    }

    getDeviceInfo() {
        try {
            console.log('getDeviceInfo')
            return this.device.device.getDeviceInfo()
        } catch (err) {
            console.log('err getDeviceInfo')
            console.log(err)
            throw evalTransportError2(err)
        }
    }

    close(): Promise<void> {
        if (this.device) return this.device.close()
        return Promise.resolve()
    }
}

export const getStartInfo = async () => {
    const ledger = await NeonLedger3.init()
    if (!ledger) {
        return
    }

    try {
        const [deviceInfo, publicKey] = await Promise.all([ledger.getDeviceInfo(), ledger.getPublicKey()])
        return { deviceInfo, publicKey }
    } finally {
        await ledger.close()
    }
}

export const openLedger = async (path: string) => {
    return await LedgerNode.open(path)
}
