import NeonLedger, {
  legacySignWithLedger,
  getPublicKeys,
  getDeviceInfo
} from './neonLedger'

export default NeonLedger
export const ledgerNanoSCreateSignatureAsync = legacySignWithLedger
export { getDeviceInfo, getPublicKeys }
export const CURRENT_VERSION = 0
