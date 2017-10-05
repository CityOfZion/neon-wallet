import { remote } from 'electron';

const SELECTOR_TITLE = 'Select wallet JSON file'

const selectWallet = () => {
  return new Promise((resolve, reject) => {
    remote.dialog.showOpenDialog({
      title: SELECTOR_TITLE,
      properties: [
        'openFile',
        'multiSelections'
      ]
    }, (filepath) => {
      resolve(filepath)
    })
  })
}

export default selectWallet;
