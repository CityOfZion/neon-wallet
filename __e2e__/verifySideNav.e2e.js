import { Application } from 'spectron'
import path from 'path'
import test from 'ava'

let electronPath = path.join(
  __dirname,
  '..',
  'node_modules',
  '.bin',
  'electron',
)
if (process.platform === 'win32') {
  electronPath += '.cmd'
}
const appPath = path.join(__dirname, '..')

const app = new Application({
  path: electronPath,
  args: [appPath],
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

test.serial('should login successfully', async t => {
  // Go to login page
  await app.client.waitUntilTextExists('#home', 'Login', 60000)
  await app.client.click('#react-tabs-2')
  // await app.client.click('div[aria-label="Private Key"]')

  // // Enter Wif
  await app.client.setValue(
    'input[type="password"]',
    'KxB52D1FGe5xBn6YeezNwj7grhkHZxq7bv2tmaCPoT4rxApMwMvU',
  )
  // Click on login btn
  await app.client.click('#loginButton')
  await app.client.waitUntilTextExists('//span', 'Manage Wallets')
  t.pass()
})

test.serial('Activity page clicked', async t => {
  // click activity tab
  await app.client.click('#history')
  await app.client.waitUntilTextExists('//h3', 'All Activity')
  t.pass()
})
test.serial('Send tab clicked', async t => {
  // click send tab
  await app.client.click('#send')
  await app.client.waitUntilTextExists('//h3', 'Send Assets')
  t.pass()
})

test.serial('Receive tab clicked', async t => {
  // click receive tab
  await app.client.click('#receive')
  await app.client.waitUntilTextExists('//h3', 'Receive Assets')
  t.pass()
})
test.serial('Contacts tab clicked', async t => {
  // click contacts tab
  await app.client.click('#contacts')
  await app.client.waitUntilTextExists('//h3', 'Manage Contacts')
  t.pass()
})
test.serial('Token sale tab clicked', async t => {
  // click token sale tab
  await app.client.click('#tokensale')
  await app.client.waitUntilTextExists('//h3', 'Token Sale')
  t.pass()
})
test.serial('News tab clicked', async t => {
  // click token sale tab
  await app.client.click('#News')
  await app.client.waitUntilTextExists('//h3', 'News')
  t.pass()
})
test.serial('Settings tab clicked', async t => {
  // click settings tab
  await app.client.click('#settings')
  await app.client.waitUntilTextExists('//h3', 'Settings')
  await app.browserWindow.isVisible('//h3[text()=\'Settings\']')
  t.pass()
})
test.serial('Logout button clicked', async t => {
  //click logout
  await app.client.click('#logout')
  await app.client.waitUntilTextExists('//span', 'Create Wallet')
  t.pass()

})
