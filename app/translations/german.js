// @flow
const INPUTS = {
  inputSelectPlaceholder: 'Auswählen',
  inputPasswordPlaceholder: 'Passwort',
  inputEncryptedPlaceholder: 'Verschlüsselter Key',
  authPrivateKeyPlaceholder: 'Gib hier deinen privaten Key ein',
  authWatchPlaceholder: 'Gib hier deinen privaten Key ein',
}

const MISCELLANEOUS = {
  'auth.cancel': 'Stornieren',
  'auth.ledger.connectLedger':
    'Verbinden und entsperren Sie Ihr <strong>Ledger-Gerät</strong>',
  'auth.ledger.navigateToNeoApp':
    'Navigieren Sie auf Ihrem Gerät zur <strong> NEO-App </ strong>',
  'auth.ledger.retry': 'Wiederholen?',
  'auth.ledger.fetchAddress': 'Zusätzliche Adressen abrufen',
  publicAddress: 'Öffentliche Adresse',
  'auth.import.recoveryInstructions':
    'Laden Sie hier eine JSON-Wallet-Wiederherstellungsdatei hoch, um Ihre Konten zu Neon hinzuzufügen. Diese Option ist auch auf der Seite Einstellungen verfügbar.',
  importFile: 'Datei importieren',
  dashboardTokenBalancesPrice: 'PREIS',
  dashboardTokenBalancesHoldings: 'HOLDINGS',
  settingsLanguageLabel: 'SPRACHE',
  addToken: 'Token hinzufügen',
  contactsPageLabel: 'Kontakte verwalten',
  newContact: 'Neuer Kontakt',
  deleteLabel: 'Löschen',

  addToContacts: 'Zu den Kontakten hinzufügen',
  contactName: 'Name',
  enterAContactName: 'Kontaktname eingeben...',
  enterAWalletAddress: 'Brieftaschenadresse eingeben...',
  contactWalletAddress: 'Brieftaschenadresse',
  editAContact: 'Bearbeiten Sie einen Kontakt',
  modifyDetails: 'Details ändern',
  removeContact: 'Kontakt entfernen',
  saveContactButtonText: 'Kontakt speichern',

  editContactDisclaimer:
    'Bitte überprüfen Sie und stellen Sie sicher, dass Sie die Adresse korrekt eingegeben haben, um einen Verlust von Geldern zu vermeiden',
  addAContact: 'Einen Kontakt hinzufügen',
  addContactDetails: 'Kontaktdaten hinzufügen',
  confirmRemoveContact: 'Bitte bestätigen Sie das Entfernen des Kontakts',
  modalActionConfirm: 'Bestätigen',
  modalActionCancel: 'Stornieren',
  newsPageLabel: 'Nachrichten',
  networkSettingsLabel: 'Netzwerkeinstellungen',

  walletManagerNoLocalInfo:
    'Es sieht so aus, als hätten Sie keine lokal gespeicherten Brieftascheninformationen...',

  walletManagerRemoveWallet: 'Brieftasche entfernen',

  selectAssets: 'Wählen Sie Assets',
  priorityTransfer: 'Priorität',

  editRecipients: 'Empfänger bearbeiten',
  confirmAndSend: 'Bestätigen und senden',
  fee: 'Gebühr:',
  sendMoreAssets: 'Senden Sie weitere Assets',
  transactionId: 'Transaktions-ID:',
  numberofTransactionsPending:
    '{transferCount, number} {transferCount, plural, one {Übertragung} other {Überweisungen}} ausstehend',
  assetRecipients:
    'Anlagegut {transferCount, plural, one {Empfänger} other {Empfänger}}',
  confirmation: 'Bestätigung',
  confirmationRecipient:
    '{transferCount, number} {transferCount, plural, one {Empfänger} other {Empfänger}}',
  completeExclaim: 'Komplett!',
  sendQRExplanation:
    // eslint-disable-next-line
    'Sie haben also einen QR-Code erhalten? Klicken Sie auf Aufnahme und halten Sie es an Ihre Kamera.',
  captureQR: 'Erfassung',
  captureQRCaps: 'ERFASSUNG',

  networkConfigTooltipUpdateSettings: 'Update Einstellungen',
  networkConfigTooltipPublicKey: 'ÖFFENTLICHER SCHLÜSSEL:',
  networkConfigTooltipAddress: 'ADRESSE:',
  networkConfigTooltipVotedNode: 'ABSTIMMUNG FÜR:',
  networkConfigTooltipQuickVote: 'Quickvote',

  noOptionsMessage: 'Keine Optionen',
  isLoadingMessage: 'Wird geladen...',

  nothingToSeeHere: 'Es gibt hier nichts zu sehen!',
  noAvailableAssetsToSend: 'Keine verfügbaren Assets zum Senden',
  sendErrorLabel: 'Error!',
  automaticNodeSelectionTooltip:
    'Erlauben Sie NEON, einen Knoten automatisch auszuwählen',
  depositAssets:
    'Hinterlegen Sie Vermögenswerte, die <b> mit der NEO-Blockchain </ b> kompatibel sind, unter Verwendung Ihrer Adresse:',
  copyAddressTooltip: 'Brieftaschenadresse kopieren',
  walletQrCodes: 'Brieftaschen-QR-Codes',
  noClaimableGas: 'Die Adresse hat kein beanspruchbares GAS',
  claimTimeDisclaimer: 'Sie können GAS alle 5 Minuten anfordern',
  claimFeeDisclaimerN3:
    'Die Inanspruchnahme von GAS erfordert mindestens 0,01120527 GAS für Transaktionsgebühren',
  claimFeeGreater:
    'Anspruchsberechtigte GAS sind geringer als Transaktionsgebühren',
  claimUnavailableInWatch:
    'GAS-Ansprüche sind im Überwachungsmodus nicht verfügbar',
  takeMeBack: 'Nimm mich zurück',

  splitKeyWalletInstructions:
    'Mit der Importoption "Geteilter Schlüssel" können Benutzer ein neues NEO-Konto erstellen, indem sie den privaten Schlüssel eines vorhandenen Kontos mit einem separaten privaten Schlüssel kombinieren.',
  splitKeyWalletNamePlaceholder:
    'Geben Sie Ihren neuen Namen für die Brieftasche mit geteiltem Schlüssel ein...',
  chooseAccount: 'Wählen Sie ein bestehendes Konto',
  nextStep: 'Nächster Schritt',
  previousStep: 'Vorheriger Schritt',
  privateKey: 'Privat Schlüssel',
}

const ERRORS = {
  'errors.contact.nameNull': 'Der Name darf nicht null sein.',
  'errors.contact.nameLength': 'Name ist zu lang.',
  'errors.contact.nameDupe':
    'Sie haben bereits ein Konto mit diesem Namen gespeichert.',
  'errors.contact.invalidAddress': 'Adresse ist ungültig.',
  'errors.contact.contactExists':
    'Sie haben bereits einen Kontakt mit dieser Adresse.',
  'errors.password.length': `Die Passphrase muss mindestens {PASS_MIN_LENGTH, number} Zeichen enthalten`,
  'errors.password.match': 'Passphrasen müssen übereinstimmen',
  'errors.request.fractional': `Sie können kein gebrochenes {asset} anfordern.`,
  'errors.request.validDecimals': `Sie können nur {asset} bis zu {validDecimals, number} Dezimalstellen anfordern.`,
  'errors.request.max': `Sie können nicht mehr als 100.000.000 {asset} anfordern.`,
  'errors.request.min': `Sie können 0 {asset} nicht anfordern.`,
  'errors.network.general': 'Hoppla! Etwas ist schief gelaufen.',
  'errors.encrypt.valid': 'Der private Schlüssel ist ungültig',

  'errors.send.network': 'Ein Netzwerkfehler ist aufgetreten',
  'errors.send.balance': `Sie haben nicht genug Guthaben, um {total} {asset} zu senden.`,
  'errors.send.number': 'Der Betrag muss eine Zahl sein.',
  'errors.send.fraction': 'Sie können keine Teilbeträge von NEO senden.',
  'errors.send.negative': `Sie können keine negativen Beträge von {asset} senden.`,
  'errors.send.zero': `Kann 0 {asset} nicht senden.`,
  'errors.send.decimal': `Sie können {asset} nur bis zu {decimalCount, number} Dezimalstellen senden.`,
  'errors.send.invalidAddress': 'Sie müssen eine gültige NEO-Adresse angeben.',
  'errors.send.invalidN3Address':
    'Sie müssen eine gültige NEO N3-Adresse angeben.',
  'errors.send.blackListed':
    'Die Adresse ist auf der schwarzen Liste. Dies ist eine bekannte Phishing-Adresse.',
}

const NOTIFICATIONS = {
  'notifications.success.receivedBlockchainInfo':
    'Erhalten Sie die neuesten Blockchain-Informationen.',
  'notifications.success.accountSaved': 'Konto gespeichert!',
  'notifications.success.updatedWalletName':
    'Erfolgreich aktualisierter Brieftaschenname.',
  'notifications.failure.blockchainInfoFailure':
    'Fehler beim Abrufen der Blockchain-Informationen.',
}

const AUTH = {
  authLogin: 'Log-in',
  authSaved: 'GESPEICHERT',
  authPrivate: 'WIF',
  authEncrypted: 'NEP-2',
  authWatch: 'ANZEIGEN',
  authLedger: 'LEDGER',
  authCreateWallet: ' Wallet erstellen',
  authImportWallet: 'Wallet importieren',
  authMigrateWallets: "Wallets migrieren",
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
  walletImportedHeader: 'Brieftasche importiert!',
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
  sidebarContacts: 'Kontakte',
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

const MIGRATE_WALLETS_NEON3 = {
  migrateWalletsNeon3AltImage: "Hintergrundbild für Wallet-Migration",
  migrateWalletNeon3Title: "Möchten Sie Ihr NEON 2-Wallet auf NEON 3 migrieren?",
  migrateWalletNeon3Description: "Durch die Migration Ihres Wallets erhalten Sie Zugriff auf eine breitere Palette unterstützter Assets und eine schlankere, verbesserte Benutzererfahrung, die das Management Ihrer Assets zum Kinderspiel macht!",
  migrateWalletNeon3Button: "Jetzt migrieren!",
};

const MIGRATE_WALLETS_NEON3_STEPS = {
  migrateWalletsNeon3Steps1: "Holen Sie sich NEON 3",
  migrateWalletsNeon3Steps2: "Exportieren Sie Ihre NEON 2-Konten",
  migrateWalletsNeon3Steps3: "Öffnen Sie NEON 3",

  migrateWalletsNeon3Step1Title: "Holen Sie sich NEON 3",
  migrateWalletsNeon3Step1Description: "Beginnen Sie, indem Sie die neueste NEON-Version herunterladen und Ihr erstes Wallet erstellen:",
  migrateWalletsNeon3Step1DownloadButton: "NEON 3 herunterladen",
  migrateWalletsNeon3Step1NextStep: "Sobald NEON 3 auf Ihrem Gerät installiert ist, gehen Sie zum nächsten Schritt über.",
  migrateWalletsNeon3Step1ButtonLabel: "Weiter",

  migrateWalletsNeon3Step2Title: "Exportieren Sie Ihre NEON 2-Konten",
  migrateWalletsNeon3Step2Description: "Exportieren Sie die NEON 2-Migrationsdatei auf Ihren Computer. Diese Datei verwenden Sie, um Ihr Wallet in NEON 3 zu migrieren.",
  migrateWalletsNeon3InputLabel: "Wo möchten Sie Ihre Migrationsdatei speichern?",
  migrateWalletsNeon3Step2BrowseButton: "Durchsuchen...",
  migrateWalletsNeon3Step2NextStep: "Wenn Sie einen Speicherort für Ihre Migrationsdatei festgelegt haben, gehen Sie zum nächsten Schritt über.",
  migrateWalletsNeon3Step2ButtonLabel: "Weiter",

  migrateWalletsNeon3Step3Title: "Öffnen Sie NEON 3",
  migrateWalletsNeon3Step3Description: "Sie sind fast da!",
  migrateWalletsNeon3Step3Description2: "Um den Migrationsprozess abzuschließen, öffnen Sie NEON 3 und befolgen Sie die Anweisungen.",
  migrateWalletsNeon3Step3AltImage: "Hintergrundbild für Wallet-Migration",
};


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
