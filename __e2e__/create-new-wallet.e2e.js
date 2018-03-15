import { Application } from 'spectron'
import path from 'path'
import test from 'ava'

let electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron')
if (process.platform === 'win32') {
  electronPath += '.cmd'
}
const appPath = path.join(__dirname, '..')

const app = new Application({
  path: electronPath,
  args: [appPath]
})

test.before(async () => {
  await app.start()
  await app.client.waitUntilWindowLoaded()
})

test.after(async () => {
  if (app && app.isRunning()) {
    await app.stop()
  }
})

function timeout (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

test.serial('should create new wallet', async t => {
  // Go to create wallet page
  await app.client.waitForVisible('a[href="/create"]>div.linkBox')
  await app.client.click('a[href="/create"]>div.linkBox')

  // Enter passphrase twice
  await app.client.setValue('#newWallet form div:nth-child(1) input', 'test')
  await app.client.setValue('#newWallet form div:nth-child(2) input', 'test')

  // Click on generate keys button
  await app.client.click('#newWallet button[type="submit"]')

  // Verify that wallet key list is shown
  await app.client.waitForVisible('#newWallet .keyList')
  t.true(await app.client.isVisible('#newWallet .keyList'))
})

test.serial('should show wallet passphrase', async t => {
  t.true(await app.client.isVisible('#newWallet .keyListItem:nth-child(1) .key'))
  const passphraseText = await app.client.getText('#newWallet .keyListItem:nth-child(1) .key');
  t.truthy(passphraseText.length)
})

test.serial('should show wallet public address', async t => {
  t.true(await app.client.isVisible('#newWallet .keyListItem:nth-child(3) .key'))
  const publicAddressText = await app.client.getText('#newWallet .keyListItem:nth-child(3) .key');
  t.truthy(publicAddressText.length)
})

test.serial('should show wallet encrypted key', async t => {
  t.true(await app.client.isVisible('#newWallet .keyListItem:nth-child(4) .key'))
  const encryptedKeyText = await app.client.getText('#newWallet .keyListItem:nth-child(4) .key');
  t.truthy(encryptedKeyText.length)
})

test.serial('should show wallet private key', async t => {
  t.true(await app.client.isVisible('#newWallet .keyListItem:nth-child(5) .key'))
  const privateKeyText = await app.client.getText('#newWallet .keyListItem:nth-child(5) .key');
  t.truthy(privateKeyText.length)
})