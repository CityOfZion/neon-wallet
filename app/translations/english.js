// @flow
const INPUTS = {
  inputSelectPlaceholder: 'Select',
  inputPasswordPlaceholder: 'Password',
  inputEncryptedPlaceholder: 'Encrypted Key',
  authPrivateKeyPlaceholder: 'Enter your private key here',
  authWatchPlaceholder: 'Enter a NEO address here',
}

const AUTH = {
  authLogin: 'Login',
  authSaved: 'SAVED',
  authPrivate: 'PRIVATE',
  authEncrypted: 'ENCRYPTED',
  authWatch: 'WATCH',
  authLedger: 'LEDGER',
  authCreateWallet: 'Create Wallet',
  authImportWallet: 'Import Walet',
  authScanQRButton: 'Scan QR',
  authLoginButton: 'Login',
  authLedgerFirstStep: 'Connect and unlock your Ledger device',
  authLedgerSecondStep: 'Navigate to the NEO app on your device',
  authLedgerAddressLabel: 'PUBLIC ADDRESS',
}

const WALLET_CREATION = {
  createANewWallet: 'Create New Wallet',
  walletCreationInstruction: 'Enter Details',
  walletCreationWalletNameLabel: 'WALLET NAME',
  walletCreationWalletNamePlaceholder: 'Wallet Name',
  walletCreationWalletPasswordLabel: 'PASSPHRASE',
  walletCreationWalletPasswordPlaceholder: 'Password',
  walletCreationWalletPasswordConfirmLabel: 'CONFIRM PASSPHRASE',
  walletCreationWalletPasswordConfirmPlaceholder: 'Confirm Password',
  walletCreationButton: 'Create Wallet',
  walletCreatedHeader: 'Wallet Created!',
  walletCreatedDisclaimer:
    '<b>Save these details!</b> If you lose these credentials, you lose access to your assets.',
  walletCreatedPrivateKeyLabel: 'PRIVATE KEY',
  walletCreatedEncryptedKeyLabel: 'ENCRYPTED KEY',
  walletCreatedAddressLabelL: 'PUBLIC ADDRESS',
  walletCreatedPrintButton: 'Print',
  walletCreatedQRButton: 'Generate QR Codes',
  walletCreatedCopyQR: 'Copy Code Image',
}

const DASHBOARD = {
  dashboardBalancePanelLabel: 'Token Balances',
  dashboardAssetsPanelLabel: 'System Assets',
  dashboardAssetsTotal: 'TOTAL',
  dashboardMarketDataLabel: 'Market Data',
  dashboardValueLabel: 'Total Wallet Value',
  dashboardAddressLabel: 'Address:',
  dashboardPriceNotAvailable: 'N/A',
  dashboardGasClaimButton: 'Claim {amount} GAS',
  dashboardManageWallets: 'Manage Wallets',
  dashboardRefresh: 'Refresh',
  dashboardTokenBalancesToken: 'Token',
  dashboardMarketData1Day: '1 DAY',
  dashboardMarketData1Week: '1 WEEK',
  dashboardMarketData1Month: '1 MONTH',
}

const SIDEBAR = {
  sidebarWallet: 'Wallet',
  sidebarActivity: 'Activity',
  sidebarSend: 'Send',
  sidebarReceive: 'Receive',
  sidebarContacts: 'Contacts',
  sidebarTokenSale: 'Token Sale',
  sidebarNews: 'News',
  sidebarSettings: 'Settings',
  sidebarLogout: 'Logout',
  sidebarCurrentBlock: 'CURRENT BLOCK',
}

const MANAGE_WALLETS = {
  manageWalletsLabel: 'Manage Wallets',
  manageWalletsImport: 'Import',
  manageWalletsCreate: 'Create',
  manageWalletsEdit: 'Edit',
  manageWalletsEditWallet: 'Edit Wallet',
  manageWalletsEditWalletInstructions: 'Moddify Details',
  manageWalletsEditWalletNameLabel: 'WALLET NAME',
  manageWalletsEditWalletNamePlaceholder: 'Wallet Name',
  manageWalletsEditWalletAddressLabel: 'WALLET ADDRESS',
  manageWalletsEditWalletSave: 'Save Changes',
}

const ACTIVITY = {
  activityAddAddress: 'Add',
  activityViewTx: 'View',
  activityPageLabel: 'All Activity',
  activityExport: 'Export',
}

const RECEIVE = {
  recieveSelectMethod: 'Select Deposit Method',
  receiveAssetsAddressLabel: 'Your Public Address',
  receivePageLabel: 'Receive Assets',
  receiveYourAddressTabLabel: 'YOUR ADDRESS',
  receiveCopyCodeButton: 'Copy Code Image',
  receiveDisclaimer:
    'Only send assets that are <b>compatible with the NEO blockchain (NEO, GAS, etc.)</b>. Sending other assets will result in permanent loss.',
  receiveRequestTabAssets: 'REQUEST ASSETS',
  recieveWhyUseQRLabel: 'Why use a QR code?',
  receiveQRExplanation:
    '<p>Ever sent assets to the wrong address because of an errant character in the wallet address?</p><p>If not, lucky you - but it happens with frightening regularity.</p>  <p>Here at CoZ, we want to ensure people that pay you get your details right. You can generate a QR code for requesting assets to help them help you.</p><p>Every code you generate will include your public wallet address, an asset amount and a reference - all set by you.</p>',
}

const REQUEST_ASSETS = {
  requestAssetLabel: 'ASSET',
  requestAssetAmountLabel: 'Amount',
  requestAssetAmount: 'AMOUNT',
  requestAssetDepositLabel: 'DEPOSIT INTO THIS WALLET',
  requestAssetRefLabel: 'REFERENCE',
  requestAssetRefPlaceholder: 'Add a note...',
  requestAssetQRButton: 'Generate QR Code',
}

export default {
  ...AUTH,
  ...INPUTS,
  ...WALLET_CREATION,
  ...DASHBOARD,
  ...SIDEBAR,
  ...MANAGE_WALLETS,
  ...ACTIVITY,
  ...RECEIVE,
  ...REQUEST_ASSETS,
}
