// @flow
const INPUTS = {
  inputSelectPlaceholder: '선택',
  inputPasswordPlaceholder: '비밀번호',
  inputEncryptedPlaceholder: '암호화 키',
  authPrivateKeyPlaceholder: '프라이빗 키를 입력해주세요',
  authWatchPlaceholder: 'NEO 주소를 입력해주세요',
}

const VARIOUS_MISSING_TRANSLATIONS = {
  'auth.cancel': 'Cancel',
  'auth.ledger.connectLedger':
    'Connect and unlock your <strong>Ledger device</strong>',
  'auth.ledger.navigateToNeoApp':
    'Navigate to the <strong>NEO app</strong> on your device',
  'auth.ledger.retry': 'Retry?',
  'auth.ledger.fetchAddress': 'Fetch additional addresses',
  publicAddress: 'Public Address',
  'auth.import.recoveryInstructions':
    'Upload a JSON wallet recovery file here to add your accounts to Neon. This option is also available on the Settings page.',
  importFile: 'Import File',
}

const AUTH = {
  authLogin: '로그인',
  authSaved: '저장됨',
  authPrivate: '개인',
  authEncrypted: '암호화됨',
  authWatch: '보기',
  authLedger: '원장',
  authCreateWallet: '월렛 만들기',
  authImportWallet: '월렛 불러오기',
  authScanQRButton: 'QR코드 스캔',
  authLoginButton: '로그인',
  authLedgerFirstStep: '연결 후 원장 기기를 잠금 해제 해주세요',
  authLedgerSecondStep: 'NEO 앱을 기기로 이동합니다',
  authLedgerAddressLabel: '퍼블릭 주소',
}

const WALLET_CREATION = {
  createANewWallet: '신규 월렛 생성',
  walletCreationInstruction: '세부 정보 입력',
  walletCreationWalletNameLabel: '월렛 이름',
  walletCreationWalletNamePlaceholder: '월렛 이름',
  walletCreationWalletPasswordLabel: '패스프레이즈',
  walletCreationWalletPasswordPlaceholder: '비밀번호',
  walletCreationWalletPasswordConfirmLabel: '비밀번호 확인',
  walletCreationWalletPasswordConfirmPlaceholder: '비밀번호 확인',
  walletCreationButton: 'Create Wallet',
  walletCreatedHeader: 'Wallet Created!',
  walletCreatedDisclaimer:
    '<b>Save these details!</b> If you lose these credentials, you lose access to your assets.',
  privateKeyLabel: 'PRIVATE KEY',
  encryptedKeyLabel: 'ENCRYPTED KEY',
  addressLabel: 'PUBLIC ADDRESS',
  splitKeyLabel: 'SPLIT KEY',
  recoverWalletLabel: 'RECOVER WALLET',
  print: 'Print',
  generateQrCodes: 'Generate QR Codes',
  copyCodeImage: 'Copy Code Image',
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
  requestAssetYourQRHeader: 'Your QR Code',
  requestAssetsPaymentDetails: 'PAYMENT REQUEST DETAILS',
  requestAssetsYourQRLabel: 'YOUR QR CODE',
  requestAssetsRefLabel: 'REFERENCE',
  requestAssetsAddressLabel: 'ADDRESS',
  requestAssetsAmountLabel: 'AMOUNT',
  requestAssetsAssetLabel: 'ASSET',
}

const TRANSACTION_FEE = {
  transactionFeeQuestion: 'PRIORITIZE YOUR TRANSACTION WITH A FEE?',
  fast: 'Fast',
  faster: 'Faster',
  fastest: 'Fastest',
  sendWithFee: 'Send {itemCount, plural, one {asset} other {assets}} With Fee',
  sendWithOutFee:
    'Send {itemCount, plural, one {asset} other {assets}} Without Fee',
  asset: 'Asset',
  assets: 'Assets',
}

const SEND = {
  sendPageLabel: 'Send Assets',
  sendImport: 'Import',
  sendEnterQRCode: 'Enter QR Code',
  sendAdd: 'Add Recipient',
  sendAssetLabel: 'ASSET',
  sendAmountLabel: 'AMOUNT',
  sendAddressLabel: 'RECIPIENT ADDRESS',
  sendAddressPlaceholder: 'Add wallet or select contact',
  sendTranfer: 'TRANSFER',
  sendMaxAmount: 'MAX',
  sendTransferPlural: 'TRANSFERS',
  sendAsset: 'asset',
  sendAssets: 'assets',
  sendRecipient: 'recipient',
  sendRecipients: 'recipients',
  sendAssetCapital: 'Asset',
  sendAssetsCapital: 'Assets',
  sendRecipientCapital: 'Recipient',
  sendRecipientsCapital: 'Recipients',
  sendCompleteNotification:
    'Transaction pending! Your balance will automatically update when the blockchain has processed it.',
  sendSelectAssets:
    'Select Assets {transferCount, number} of {25, number} Recipients',
  sendTransferMessage:
    '{transferCount, number} {transferCount, plural, one {sendTransfer} other {sendTransferPlural}} pending',
  sendBroadcasting: 'Broadcasting transaction to network...',
  sendDisclaimer:
    'Please review and ensure that you have entered the correct details to avoid loss of funds.',
  sendActivityLink:
    'Check the activity tab to see the status of your transaction.',
  sendCompletion:
    'Complete! {transferCount, number} {transferCount, plural, one {sendAsset} other {sendAssets}} to {transferCount, plural, one {sendRecipient} other {sendRecipients}}',
}

const SETTINGS = {
  settingsNetworkConfigLabel: 'NETWORK CONFIGURATION',
  settingCurrencyLabel: 'CURRENCY',
  settingsThemeLabel: 'THEME',
  settingsSoundLabel: 'SOUND',
  settingsEncryptLink: 'ENCRYPT A KEY',
  recoverWallet: 'RECOVER WALLET',
  settingsRecoverWalletLink: 'IMPORT',
  settingsBackUpLinkLabel: 'BACKUP WALLET',
  settingsBackUpLink: 'EXPORT',
  settingsManageLabel: 'Manage your neon wallet',
  settingsCommunity: 'Cummonity Support',
  settingsDonationLink:
    'Created by CoZ. Donations: Adr3XjZ5QDzVJrWvzmsTTchpLRRGSzgS5A',
}

const NETWORK_SETTINGS = {
  networkSettingsInstructions:
    'Manage all network settings related to how Neon interacts with the blockchain',
  networkSettingsNodeSelectLabel: 'NODE SELECTION',
  networkSettingsExplorerLabel: 'BLOCK EXPLORER',
  networkSettingsCurrentLabel: 'CURRENT NETWORK',
  networkSettingsAutomatic: 'AUTOMATIC',
}

const NODE_SELECTION = {
  nodeSelectPanelHeader: 'Node Selection',
  nodeSelectionInstructions:
    'If you’re experiencing performance issues, try selecting a custom node below',
  nodeSelectSelectAutomatically: 'Select automatically',
  nodeSelectInfo: 'Top {nodeCount, number} nodes listed',
  nodeSelectBlockHeight: 'Block Height',
}

const ENCRYPT_KEY = {
  encryptPanelHeader: 'Encrypt a key',
  encryptInstructions: 'Choose a passphrase to encrypt an existing key',
  encryptStep1Label: '1) ENTER THE PRIVATE KEY YOU WANT TO ENCRYPT',
  encryptStep1Placeholder: 'Enter key',
  encryptStep2Label: '2) CREATE A PASSPHRASE',
  encryptStep2Placeholder: 'Enter Passphrase',
  encryptStep3Label: '3) CONFIM YOUR PASSPHRASE',
  encryptStep3Placeholder: 'Confirm Passphrase',
  encryptButton: 'Generate Encrypted Key',
}

const TOKEN_SALE = {
  tokenSalePageHeader: 'Participate in Token Sale',
  tokenSaleDisclaimer1:
    'Please read and acknowledge these statements to continue',
  tokenSaleDiclaimer2:
    'I understand that submitting NEO or GAS multiple times may result in a loss of funds or a delayed refund depending on the policy of the ICO company.',
  tokenSaleDisclaimer3:
    'I understand that some sales may only accept NEO or GAS, and I have verified which is accepted.',
  tokenSaleDisclaimer4:
    'I understand that if I send NEO or GAS to a token sale that has already ended, I will lose my NEO/GAS and will not be refunded.',
  tokenSaleDiclaimer5:
    // eslint-disable-next-line
    "I understand that City of Zion (CoZ) is not responsible for my usage of this feature, and I have consulted this software's licenses.",
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
  ...TRANSACTION_FEE,
  ...SEND,
  ...SETTINGS,
  ...NETWORK_SETTINGS,
  ...NODE_SELECTION,
  ...ENCRYPT_KEY,
  ...TOKEN_SALE,
  ...VARIOUS_MISSING_TRANSLATIONS,
}
