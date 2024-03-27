// @flow
const INPUTS = {
  inputSelectPlaceholder: 'Select',
  inputPasswordPlaceholder: 'Password',
  inputEncryptedPlaceholder: 'Encrypted Key',
  authPrivateKeyPlaceholder: 'Enter your private key here',
  authWatchPlaceholder: 'Enter a NEO address here',
}

const MISCELLANEOUS = {
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
  dashboardTokenBalancesPrice: 'PRICE',
  dashboardTokenBalancesHoldings: 'HOLDINGS',
  settingsLanguageLabel: 'Language',
  addToken: 'Add Token',
  contactsPageLabel: 'Manage Contacts',
  newContact: 'New Contact',
  deleteLabel: 'Delete',

  addToContacts: 'Add to contacts',
  contactName: 'Name',
  enterAContactName: 'Enter Contact Name...',
  enterAWalletAddress: 'Enter Wallet Address...',
  contactWalletAddress: 'Wallet Address',
  editAContact: 'Edit A Contact',
  modifyDetails: 'Modify Details',
  removeContact: 'Remove Contact',
  saveContactButtonText: 'Save Contact',

  editContactDisclaimer:
    'Please review and ensure that you have entered the address correctly to avoid loss of funds',
  addAContact: 'Add A Contact',
  addContactDetails: 'Add Contact Details',
  confirmRemoveContact: 'Please confirm removing contact',
  modalActionConfirm: 'Confirm',
  modalActionCancel: 'Cancel',
  newsPageLabel: 'News',
  networkSettingsLabel: 'Network Settings',

  walletManagerNoLocalInfo:
    'It looks like you have no wallet information saved locally...',

  walletManagerRemoveWallet: 'Remove Wallet',

  selectAssets: 'Select Assets',
  priorityTransfer: 'Priority Transfer',

  editRecipients: 'Edit Recipients',
  confirmAndSend: 'Confirm & Send',
  fee: 'Fee:',
  sendMoreAssets: 'Send More Assets',
  transactionId: 'Transaction ID:',
  numberofTransactionsPending:
    '{transferCount, number} {transferCount, plural, one {Transfer} other {Transfers}} pending',
  assetRecipients:
    'Asset {transferCount, plural, one {Recipient} other {Recipients}}',
  confirmation: 'Confirmation',
  confirmationRecipient:
    '{transferCount, number} {transferCount, plural, one {Recipient} other {Recipients}}',
  completeExclaim: 'Complete!',
  sendQRExplanation:
    // eslint-disable-next-line
    "So you've been given a QR code? Click capture and hold it up to your camera.",
  captureQR: 'Capture',
  captureQRCaps: 'CAPTURE',

  networkConfigTooltipUpdateSettings: 'Update Settings',
  networkConfigTooltipPublicKey: 'PUBLIC KEY:',
  networkConfigTooltipAddress: 'ADDRESS:',
  networkConfigTooltipVotedNode: 'VOTE CAST FOR:',
  networkConfigTooltipQuickVote: 'Quickvote',

  noOptionsMessage: 'No options',
  isLoadingMessage: 'Loading...',

  nothingToSeeHere: 'Nothing to see here!',

  noAvailableAssetsToSend: 'No available assets to send',
  sendErrorLabel: 'Error!',
  automaticNodeSelectionTooltip: 'Allow NEON to choose a node automatically',

  depositAssets:
    'Deposit assets <b> compatible  with the NEO blockchain </b> using your address:',
  copyAddressTooltip: 'Copy Wallet Address',
  walletQrCodes: 'Wallet QR Codes',

  noClaimableGas: 'Address has no claimable GAS',
  claimTimeDisclaimer: 'You can claim GAS once every 5 minutes',
  claimFeeDisclaimerN3:
    'Claiming GAS requires at least 0.01120527 GAS for transaction fees',
  claimFeeGreater: 'Claimable GAS is less than transaction fees',
  claimUnavailableInWatch: 'GAS claims are unavailable in Watch mode',
  takeMeBack: 'Take me back',

  splitKeyWalletInstructions:
    'The Split Key import option allows users to create a new NEO account by combining the private key of an existing account with a separate private key.',
  splitKeyWalletNamePlaceholder: 'Enter your new split key wallet name...',
  chooseAccount: 'Choose an Existing Account',
  nextStep: 'Next Step',
  previousStep: 'Previous Step',
  privateKey: 'Private Key',
}

const ERRORS = {
  'errors.contact.nameNull': "Name can't be null.",
  'errors.contact.nameLength': 'Name is too long.',
  'errors.contact.nameDupe':
    'You already have an account saved with that name.',
  'errors.contact.invalidAddress': 'Address is not valid.',
  'errors.contact.contactExists':
    'You already have a contact with that address.',

  'errors.password.length': `Passphrase must contain at least {PASS_MIN_LENGTH, number} characters.`,
  'errors.password.match': 'Passphrases must match.',
  'errors.request.fractional': `You canot request fractional {asset}.`,
  'errors.request.validDecimals': `You can only request {asset} up to {validDecimals, number} decimals.`,
  'errors.request.max': `You cannot request more than 100,000,000 {asset}.`,
  'errors.request.min': `You cannot request 0 {asset}.`,
  'errors.network.general': 'Oops! Something went wrong...',
  'errors.encrypt.valid': 'The private key is not valid.',

  'errors.send.balance': `You do not have enough balance to send {total} {asset}.`,
  'errors.send.network': 'A network error has occurred',
  'errors.send.number': 'Amount must be a number.',
  'errors.send.fraction': 'You cannot send fractional amounts of NEO.',
  'errors.send.negative': `You cannot send negative amounts of {asset}.`,
  'errors.send.zero': `Can not send 0 {asset}.`,
  'errors.send.decimal': `You can only send {asset} up to {decimalCount, number} decimals.`,
  'errors.send.invalidAddress': 'You need to specify a valid NEO address.',
  'errors.send.invalidN3Address': 'You need to specify a valid NEO N3 address.',
  'errors.send.blackListed':
    'Address is blacklisted. This is a known phishing address.',
}

const NOTIFICATIONS = {
  'notifications.success.receivedBlockchainInfo':
    'Received latest blockchain information.',
  'notifications.success.accountSaved': 'Account saved!',
  'notifications.success.updatedWalletName': 'Succesfully updated wallet name.',
  'notifications.failure.blockchainInfoFailure':
    'Failed to retrieve blockchain information.',
}

const AUTH = {
  authLogin: 'Login',
  authSaved: 'SAVED',
  authPrivate: 'PRIVATE',
  authEncrypted: 'ENCRYPTED',
  authWatch: 'WATCH',
  authLedger: 'LEDGER',
  authCreateWallet: 'Create Wallet',
  authImportWallet: 'Import Wallet',
  authMigrateWallets: "Migrate Wallets",
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
  walletImportedHeader: 'Wallet Created!',
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
  manageWalletsEditWalletInstructions: 'Modify Details',
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
  sendWithFee: 'Send {itemCount, plural, one {Asset} other {Assets}} With Fee',
  sendWithoutFee:
    'Send {itemCount, plural, one {Asset} other {Assets}} Without Fee',
  Asset: 'Assetasdasd',
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
    '{transferCount, number} of {maxNumberOfRecipients, number} Recipients',
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
  settingsNetworkConfigLabel: 'Network configuration',
  settingCurrencyLabel: 'Currency',
  settingsThemeLabel: 'Theme',
  settingsSoundLabel: 'Sound',
  settingsEncryptLink: 'Encrypt a key',
  recoverWallet: 'Recover wallet',
  settingsRecoverWalletLink: 'Import',
  settingsBackUpLinkLabel: 'Backup wallet',
  settingsBackUpLink: 'Export',
  settingsManageLabel: 'Manage your neon wallet',
  settingsCommunity: 'Community Support',
  settingsDonationLink: 'Created by CoZ. Donations:',
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
  tokenSaleDisclaimer2:
    'I understand that submitting NEO or GAS multiple times may result in a loss of funds or a delayed refund depending on the policy of the ICO company.',
  tokenSaleDisclaimer3:
    'I understand that some sales may only accept NEO or GAS, and I have verified which is accepted.',
  tokenSaleDisclaimer4:
    'I understand that if I send NEO or GAS to a token sale that has already ended, I will lose my NEO/GAS and will not be refunded.',
  // eslint-disable-next-line
  tokenSaleDisclaimer5: `I understand that City of Zion (CoZ) is not responsible for my usage of this feature, and I have consulted this software's licenses.`,
}

const MIGRATE_WALLETS_NEON3 = {
  migrateWalletsNeon3AltImage: "Migrate Wallets Background Image",
  migrateWalletNeon3Title: "Do you want to migrate your NEON 2 wallet to NEON 3?",
  migrateWalletNeon3Description: "Migrating your wallet will give you access to a broader range of supported assets, and a sleeker, improved user experience that will make the management of your assets a breeze!",
  migrateWalletNeon3Button: "Migrate Now!",
}

const MIGRATE_WALLETS_NEON3_STEPS = {
  migrateWalletsNeon3Steps1: 'Get NEON 3',
  migrateWalletsNeon3Steps2: 'Export your NEON 2 accounts',
  migrateWalletsNeon3Steps3: 'Open NEON 3',

  migrateWalletsNeon3Step1Title: "Get NEON 3",
  migrateWalletsNeon3Step1Description: "Start by downloading the latest NEON build and create your first wallet:",
  migrateWalletsNeon3Step1DownloadButton: "Download NEON 3",
  migrateWalletsNeon3Step1NextStep: "Once NEON 3 is installed on your device, move to the next step.",
  migrateWalletsNeon3Step1ButtonLabel: "Next",

  migrateWalletsNeon3Step2Title: "Export your NEON 2 accounts",
  migrateWalletsNeon3Step2Description: "Export the NEON 2 migration file to your computer. You’ll use this file to migrate your wallet into NEON 3.",
  migrateWalletsNeon3InputLabel: "Where would you like to save your migration file?",
  migrateWalletsNeon3Step2BrowseButton: "Browse...",
  migrateWalletsNeon3Step2NextStep: "When you’ve defined a location to save your migration file, move to the next step.",
  migrateWalletsNeon3Step2ButtonLabel: "Next",

  migrateWalletsNeon3Step3Title: "Open NEON 3",
  migrateWalletsNeon3Step3Description: "You’re almost there!",
  migrateWalletsNeon3Step3Description2: "In order to complete the migration process, open NEON 3 and follow the instructions.",
  migrateWalletsNeon3Step3AltImage: "Migrate Wallets Background Image",

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
  ...MISCELLANEOUS,
  ...ERRORS,
  ...NOTIFICATIONS,
  ...MIGRATE_WALLETS_NEON3,
  ...MIGRATE_WALLETS_NEON3_STEPS
}
