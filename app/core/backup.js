// @flow
import fs from 'fs'
import { getStorage } from './storage'

export async function backupAccounts(
  path: string,
  chain: string,
  callbackSuccess?: () => void,
  callbackError?: (errorMsg: string) => void,
) {
  const keyStorage = chain === 'neo2' ? 'userWallet' : 'n3UserWallet'
  const accounts = await getStorage(keyStorage)
  fs.writeFile(path, JSON.stringify(accounts), errorWriting => {
    if (errorWriting && callbackError) {
      callbackError(errorWriting.message)
    } else if (callbackSuccess) {
      callbackSuccess()
    }
  })
}
