// @flow
const INPUTS = {
  inputSelectPlaceholder: 'Auswählen',
  inputPasswordPlaceholder: 'Passwort',
  inputEncryptedPlaceholder: 'Verschlüsselter Key',
  authPrivateKeyPlaceholder: 'Gib hier deinen privaten Key ein',
  authWatchPlaceholder: 'Gib hier deinen privaten Key ein',
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
  dashboardTokenBalancesPrice: 'PRICE',
  dashboardTokenBalancesHoldings: 'HOLDINGS',
  settingsLanguageLabel: 'LANGUAGE',
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
    '{transferCount, number} {transferCount, plural, one {Recipient} other {Transfers}}',
  completeExclaim: 'Complete!',
  sendQRExplanation:
    // eslint-disable-next-line
    "So you've been given a QR code? Click capture and hold it up to your camera.",
  captureQR: 'Capture',
  captureQRCaps: 'CAPTURE',

  networkConfigTooltipUpdateSettings: 'Update Settings',
  networkConfigTooltipPublicKey: 'PUBLIC KEY:',
  networkConfigTooltipAddress: 'ADDRESS:',
}

const AUTH = {
  authLogin: 'Log-in',
  authSaved: 'GESPEICHERT',
  authPrivate: 'PRIVATER',
  authEncrypted: 'VERSCHLÜSSELTER',
  authWatch: 'ANZEIGEN',
  authLedger: 'LEDGER',
  authCreateWallet: ' Wallet erstellen',
  authImportWallet: 'Wallet importieren',
  authScanQRButton: 'QR scannen',
  authLoginButton: 'Log-in',
  authLedgerFirstStep: 'Ledger verbinden und freischalten',
  authLedgerSecondStep: 'Öffne die NEO-App auf deinem Gerät',
  authLedgerAddressLabel: 'ÖFFENTLICHE ADRESSE',
}

const WALLET_CREATION = {
  createANewWallet: 'Neue Wallet erstellen',
  walletCreationInstruction: 'Details eingeben',
  walletCreationWalletNameLabel: 'WALLET NAME',
  walletCreationWalletNamePlaceholder: 'Wallet Name',
  walletCreationWalletPasswordLabel: 'PASSPHRASE',
  walletCreationWalletPasswordPlaceholder: 'Passwort',
  walletCreationWalletPasswordConfirmLabel: 'CONFIRM PASSPHRASE',
  walletCreationWalletPasswordConfirmPlaceholder: 'Passwort bestätigen',
  walletCreationButton: 'Wallet erstellen',
  walletCreatedHeader: 'Wallet erstellt!',
  walletCreatedDisclaimer:
    '<b>Notiere diese Angaben!</b> Wenn du sie verlierst, verlierst du auch den Zugriff auf deine Assets.',
  privateKeyLabel: 'PRIVATER KEY',
  encryptedKeyLabel: 'VERSCHLÜSSELTER KEY',
  addressLabel: 'ÖFFENTLICHE ADRESSE',
  splitKeyLabel: 'TEILT KEY',
  recoverWalletLabel: 'WALLET WIEDERHERSTELLEN',
  print: 'Drucken',
  generateQrCodes: 'QR-Code generieren',
  copyCodeImage: 'QR-Code kopieren',
}

const DASHBOARD = {
  dashboardBalancePanelLabel: 'Token-Balances',
  dashboardAssetsPanelLabel: 'System-Assets',
  dashboardAssetsTotal: 'TOTAL',
  dashboardMarketDataLabel: 'Marktdaten',
  dashboardValueLabel: 'Gesamtwert Wallet',
  dashboardAddressLabel: 'Adresse:',
  dashboardPriceNotAvailable: 'N/A',
  dashboardGasClaimButton: '{amount} GAS claimen',
  dashboardManageWallets: 'Wallets verwalten',
  dashboardRefresh: 'Aktualisieren',
  dashboardTokenBalancesToken: 'Token',
  dashboardMarketData1Day: '1 TAG',
  dashboardMarketData1Week: '1 WOCHE',
  dashboardMarketData1Month: '1 MONAT',
}

const SIDEBAR = {
  sidebarWallet: 'Wallet',
  sidebarActivity: 'Aktivität',
  sidebarSend: 'Senden',
  sidebarReceive: 'Empfangen',
  sidebarContacts: 'Contacts',
  sidebarTokenSale: 'Token-Sale',
  sidebarNews: 'News',
  sidebarSettings: 'Einstellungen',
  sidebarLogout: 'Log-out',
  sidebarCurrentBlock: 'AKTUELLER BLOCK',
}

const MANAGE_WALLETS = {
  manageWalletsLabel: 'Wallets verwalten',
  manageWalletsImport: 'Importieren',
  manageWalletsCreate: 'Erstellen',
  manageWalletsEdit: 'Bearbeiten',
  manageWalletsEditWallet: 'Wallet bearbeiten',
  manageWalletsEditWalletInstructions: 'Details ändern',
  manageWalletsEditWalletNameLabel: 'WALLET NAME',
  manageWalletsEditWalletNamePlaceholder: 'Wallet Name',
  manageWalletsEditWalletAddressLabel: 'WALLET ADDRESSE',
  manageWalletsEditWalletSave: 'Änderungen speichern',
}

const ACTIVITY = {
  activityAddAddress: 'Hinzufügen',
  activityViewTx: 'Anzeigen',
  activityPageLabel: 'Alle Aktivitäten',
  activityExport: 'Exportieren',
}

const RECEIVE = {
  recieveSelectMethod: 'Einzahlungsmethode auswählen',
  receiveAssetsAddressLabel: 'Deine öffentliche Adresse',
  receivePageLabel: 'Assets empfangen',
  receiveYourAddressTabLabel: 'DEINE ADRESSE',
  receiveCopyCodeButton: 'QR-Code kopieren',
  receiveDisclaimer:
    'Sende nur Assets, die <b>kompatibel mit der NEO-Blockchain sind (NEO, GAS, etc.)</b>. Das Senden anderer Assets wird zu einem unwiderruflichen Verlust führen.',
  receiveRequestTabAssets: 'ASSETS ANFORDERN',
  recieveWhyUseQRLabel: 'Warum einen QR-Code verwenden?',
  receiveQRExplanation:
    ' <p>Hast du jemals durch einen fehler in der Wallet-Adresse Assets verloren?</p><p>Dieses Problem tritt bedenklich oft auf.</p> <p>Wir bei COZ möchten sicherstellten, dass Zahlungen dich auch korrekt erreichen. Daher kannst du hier einen QR-Code erstellen, um Assets anzufordern, die dann auch mit Sicherheit an die richtige Adresse geschickt werden.</p><p>Jeder Code, den du generierst, enthält deine öffentliche Wallet-Adresse, den Betrag und einen wählbaren Text als Referenz - alles von dir eingestellt.</p>',
}

const REQUEST_ASSETS = {
  requestAssetLabel: 'ASSET',
  requestAssetAmountLabel: 'Betrag',
  requestAssetAmount: 'BETRAG',
  requestAssetDepositLabel: 'IN DIESES WALLET EINZAHLEN',
  requestAssetRefLabel: 'REFERENZ',
  requestAssetRefPlaceholder: 'Notiz hinzufügen...',
  requestAssetQRButton: 'QR-Code generieren',
  requestAssetYourQRHeader: 'Dein QR-Code',
  requestAssetsPaymentDetails: 'PZAHLUNGSDETAILS ANFORDERN',
  requestAssetsYourQRLabel: 'DEIN QR-CODE',
  requestAssetsRefLabel: 'REFERENZ',
  requestAssetsAddressLabel: 'ADDRESSE',
  requestAssetsAmountLabel: 'BETRAG',
  requestAssetsAssetLabel: 'ASSET',
}

const TRANSACTION_FEE = {
  transactionFeeQuestion: 'TRANSAKTION GEBÜHRENPFLICHTIG PRIORISIEREN?',
  fast: 'Schnell',
  faster: 'Schneller',
  fastest: 'Am schnellsten',
  sendWithFee:
    'Sende {itemCount, plural, one {Anlagegut} other {Vermögenswerte}} mit Gebühr',
  sendWithoutFee:
    'Sende {itemCount, plural, one {Anlagegut} other {Vermögenswerte}} ohne Gebühr',
  asset: 'Anlagegut',
  assets: 'Vermögenswerte',
}

const SEND = {
  sendPageLabel: 'Assets senden',
  sendImport: 'Importieren',
  sendEnterQRCode: 'QR-Code eingeben',
  sendAdd: 'Empfänger hinzufügen',
  sendAssetLabel: 'ASSET',
  sendAmountLabel: 'BETRAG',
  sendAddressLabel: 'EMPFANGSADRESSE',
  sendAddressPlaceholder: 'Wallet hinzufügen oder Kontakt auswählen',
  sendTranfer: 'TRANSFER',
  sendMaxAmount: 'MAX',
  sendTransferPlural: 'TRANSFERS',
  sendAsset: 'asset',
  sendAssets: 'assets',
  sendRecipient: 'Empfänger',
  sendRecipients: 'Empfänger',
  sendAssetCapital: 'Asset',
  sendAssetsCapital: 'Assets',
  sendRecipientCapital: 'Empfänger',
  sendRecipientsCapital: 'Empfänger',
  sendCompleteNotification:
    'Transaktion ausstehend! Deine Balance wird automatisch aktualisiert, sobald die Blockchain die Verarbeitung abgeschlossen hat.',
  sendSelectAssets:
    'Wähle Assets {transferCount, number} von {maxNumberOfRecipients, number} Empfängern',
  sendTransferMessage:
    '{transferCount, number} {transferCount, plural, one {sendTransfer} other {sendTransferPlural}} ausstehend',
  sendBroadcasting: 'Transaktion wird im Netzwerk übertragen...',
  sendDisclaimer:
    'Bitte überprüfe die Angaben und stelle sicher, dass alles korrekt ist, um den Verlust von Assets zu vermeiden.',
  sendActivityLink:
    'Wähle den Reiter Aktivitäten, um den Status deiner Transaktion einzusehen.',
  sendCompletion:
    'Abgeschlossen! {transferCount, number} {transferCount, plural, one {sendAsset} other {sendAssets}} nach {transferCount, plural, one {sendRecipient} other {sendRecipients}}',
}

const SETTINGS = {
  settingsNetworkConfigLabel: 'NETZWERK-KONFIGURATION',
  settingCurrencyLabel: 'WÄHRUNG',
  settingsThemeLabel: 'THEME',
  settingsSoundLabel: 'SOUND',
  settingsEncryptLink: 'KEY VERSCHLÜSSELN',
  recoverWallet: 'WALLET WIEDERHERSTELLEN',
  settingsRecoverWalletLink: 'IMPORTIEREN',
  settingsBackUpLinkLabel: 'WALLET-BACKUP',
  settingsBackUpLink: 'EXPORTIEREN',
  settingsManageLabel: 'Neon Wallet verwalten',
  settingsCommunity: 'Community-Support',
  settingsDonationLink:
    'Entwickelt von COZ. Spenden: Adr3XjZ5QDzVJrWvzmsTTchpLRRGSzgS5A',
}

const NETWORK_SETTINGS = {
  networkSettingsInstructions:
    'Verwalte alle Netzwerkeinstellungen mit Bezug zur Interaktion der Neon Wallet mit der Blockchain',
  networkSettingsNodeSelectLabel: 'NODE-AUSWAHL',
  networkSettingsExplorerLabel: 'BLOCK EXPLORER',
  networkSettingsCurrentLabel: 'AKTUELLES NETZWERK',
  networkSettingsAutomatic: 'AUTOMATISCH',
}

const NODE_SELECTION = {
  nodeSelectPanelHeader: 'Node-Auswahl',
  nodeSelectionInstructions:
    'Versuche bei Performance-Problemen die Auswahl eines benutzerdefinierten Nodes weiter unten',
  nodeSelectSelectAutomatically: 'Automatisch auswählen',
  nodeSelectInfo: 'Top {nodeCount, number} Nodes gelistet',
  nodeSelectBlockHeight: 'Blockhöhe',
}

const ENCRYPT_KEY = {
  encryptPanelHeader: 'Key verschlüsseln',
  encryptInstructions:
    'Wähle eine Passphrase, um einen existierenden Key zu verschlüsseln',
  encryptStep1Label: '1) GIB DEN ZU VERSCHLÜSSELNDEN PRIVATEN KEY EIN',
  encryptStep1Placeholder: 'Key eingeben',
  encryptStep2Label: '2) PASSPHRASE ERSTELLEN',
  encryptStep2Placeholder: 'Passphrase eingeben',
  encryptStep3Label: '3) PASSPHRASE BESTÄTIGEN',
  encryptStep3Placeholder: 'Passphrase bestätigen',
  encryptButton: 'Verschlüsselten Key erstellen',
}

const TOKEN_SALE = {
  tokenSalePageHeader: 'An Token-Sales teilnehmen',
  tokenSaleDisclaimer1:
    'Bitte lies und bestätige diese Erklärung, um fortzufahren',
  tokenSaleDisclaimer2:
    'Ich verstehe, dass das mehrfache Senden von NEO oder GAS in einem Verlust der Assets oder einer verzögerten Rückzahlung resultieren kann, abhängig von den Bestimmungen des ausgebenden Unternehmens.',
  tokenSaleDisclaimer3:
    'Ich verstehe, dass einige Sales entweder NEO oder GAS akzeptieren und ich habe sichergestellt, welches Asset angenommen wird.',
  tokenSaleDisclaimer4:
    'Ich verstehe, dass das Senden von NEO oder GAS an einen Token-Sale, der bereits beendet ist, in einem unwiderruflichen Verlust meiner NEO/GAS-Tokens resultieren wird.',
  // eslint-disable-next-line
  tokenSaleDisclaimer5: `Ich verstehe, dass COZ nicht für meine Verwendung dieses Features verantwortlich ist und ich habe die Lizenzen dieser Software zur Kenntnis genommen.`,
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
