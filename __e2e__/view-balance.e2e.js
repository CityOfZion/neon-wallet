import { Application } from 'spectron'
import path from 'path'
import test from 'ava'

let electronPath = path.join(
  __dirname,
  '..',
  'node_modules',
  '.bin',
  'electron'
)
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

<<<<<<< HEAD
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

test.serial('should login successfully and switch networks', async t => {
  // Go to login page
  await app.client.waitUntilTextExists('#home', 'Login', 60000)
  await app.client.click('input[value="Saved Wallet"]')
  await app.client.click('div[aria-label="Private Key"]')

  // Enter Wif
  await app.client.setValue(
    'input[type="password"]',
=======
test.serial('should login successfully and switch networks', async t => {
  // Go to login page
  await app.client.waitUntilTextExists(
    '.linkBox',
    'Login using a private key',
    60000
  )
  await app.client.click('a[href="/login-private-key"]>div.linkBox')

  // Enter Wif
  await app.client.setValue(
    '#loginPage input',
>>>>>>> be3d2cb... squashed release 0.2.7 into one commit
    'KxB52D1FGe5xBn6YeezNwj7grhkHZxq7bv2tmaCPoT4rxApMwMvU'
  )

  // Click on login btn
  await app.client.click('#loginButton')

  // Check that the default network is MainNet
  t.is(await app.client.getValue('#network .networkSelector'), '1')

  // Check that MainNet data has loaded
  await app.client.waitUntilTextExists('#amountNeo', '0', 60000)

  await app.client.$('#network .networkSelector').selectByValue('2')
  t.is(await app.client.getValue('#network .networkSelector'), '2')
})

test.serial('should show correct balance', async t => {
  await app.client.waitUntilTextExists('#amountNeo', '1', 60000)
  t.is(await app.client.getText('#amountNeo'), '1')
  t.is(await app.client.getText('#amountGas'), '2.0000')
})

test.serial('should show correct transaction list', async t => {
<<<<<<< HEAD
  await app.client.click('#history')
  await app.client.waitUntilTextExists(
    '#transactionList li:nth-child(2) .txid',
    '57da6b7a1074c8508796549c19fdb2a8',
    60000
  )
  const transactions = await app.client.getText('#transactionList li .txid')
  t.is(transactions[0], '4bb9b6e0a6ef46c42dd6a1f11326fb0c')
  t.is(transactions[1], '57da6b7a1074c8508796549c19fdb2a8')
=======
  const txids = [
    '1e4b97e3b2b9c48bedbed1d6c219f82f',
    '94d3d3816dd7dc6a6a677cb06df9138a',
    '1d3608cd40a0d97d8b74cf1796a9706c',
    '57da6b7a1074c8508796549c19fdb2a8',
    '4bb9b6e0a6ef46c42dd6a1f11326fb0c'
  ]

  await app.client.waitUntilTextExists(
    '#transactionList li .txid',
    txids[0],
    60000
  )
  const transactions = await app.client.getText('#transactionList li .txid')

  transactions.forEach(txid => {
    t.truthy(txids.includes(txid))
  })
>>>>>>> be3d2cb... squashed release 0.2.7 into one commit
})

test.serial('should logout successfully', async t => {
  await app.client.click('#logout')
  t.truthy(await app.client.$('#home'))
})
