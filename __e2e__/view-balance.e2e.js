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

test.serial('should login success', async t => {
  // Go to login page
  await app.client.click('a[href="/login-private-key"]>div.linkBox')

  // Enter Wif
  await app.client.setValue('#loginPage input', 'KxB52D1FGe5xBn6YeezNwj7grhkHZxq7bv2tmaCPoT4rxApMwMvU')

  // Click on login btn
  await app.client.click('#loginPage button')

  // Switch to TestNet
  const currentNetName = await app.client.getText('#network .netName')
  if (currentNetName === 'MainNet') {
    await app.client.click('#network .netName')
  }

  // Show exact public address
  t.is(await app.client.getText('#accountInfo .address'), 'ASJQLBnhAs6fSgBv2R7KtRZjC8A9fAmcNW')
})

test.serial('should show correct balance', async t => {
  await app.client.waitUntilTextExists('#balance .amountNeo', '1', 60000)
  t.is(await app.client.getText('#balance .amountNeo'), '1')
  t.is(await app.client.getText('#balance .amountGas'), '2.0000')
})

test.serial('should show correct transaction list', async t => {
  await app.client.waitUntilTextExists('#transactionList li:first-child .txid', '57da6b7a1074c8508796549c19fdb2a8', 60000)
  const transactions = await app.client.getText('#transactionList li .txid')
  t.is(transactions[0], '57da6b7a1074c8508796549c19fdb2a8')
  t.is(transactions[1], '4bb9b6e0a6ef46c42dd6a1f11326fb0c')
})

test.serial('should logout success', async t => {
  await app.client.click('#logout')
  t.truthy(await app.client.$('#home'))
})
