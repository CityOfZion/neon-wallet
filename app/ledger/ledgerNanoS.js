import NeonLedger, { legacySignWithLedger, getPublicKey, getDeviceInfo } from './neonLedger'

export default NeonLedger
export const ledgerNanoSCreateSignatureAsync = legacySignWithLedger
export { getPublicKey, getDeviceInfo }
export const CURRENT_VERSION = 0

// export * from './legacyledgerNanoS.js'
