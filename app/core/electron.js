import { shell } from 'electron'

export const openExternal = (srcLink) => {
  shell.openExternal(srcLink)
}
