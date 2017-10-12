// @flow
import { shell } from 'electron'

export const openExternal = (srcLink: string) => {
  shell.openExternal(srcLink)
}
