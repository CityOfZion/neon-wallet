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
  // // Check that the default network is MainNet
  await app.client
    .getValue('#current-network')
    .catch(error =>
      t.is(
        error.message,
        'An element could not be located on the page using the given search parameters ("#current-network").',
      ),
    )
  // click activity tab
  await app.client.click('#history')
  await app.client.waitUntilWindowLoaded(10000)

  // click send tab
  await app.client.click('#send')
  await app.client.waitUntilWindowLoaded(10000)

  // click receive tab
  await app.client.click('#receive')
  await app.client.waitUntilWindowLoaded(10000)

  // click contacts tab
  await app.client.click('#contacts')
  await app.client.waitUntilWindowLoaded(10000)

  // click token sale tab
  await app.client.click('#tokensale')
  await app.client.waitUntilWindowLoaded(10000)

  // click settings tab
  await app.client.click('#settings')
  await app.client.waitUntilWindowLoaded(10000)

  //click logout
  //await app.client.click('#logout')
  //await app.client.waitUntilWindowLoaded(10000)
})

