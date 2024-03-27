// @flow
const INPUTS = {
  inputSelectPlaceholder: 'Selecteer',
  inputPasswordPlaceholder: 'Wachtwoord',
  inputEncryptedPlaceholder: 'Beveiligde Sleutel',
  authPrivateKeyPlaceholder: 'Voer je private key hier in',
  authWatchPlaceholder: 'Vul hier een NEO adres in',
}

const MISCELLANEOUS = {
  'auth.cancel': 'Annuleren',
  'auth.ledger.connectLedger':
    'Verbind en ontgrendel je <strong>Ledger-apparaat</strong>',
  'auth.ledger.navigateToNeoApp':
    'Navigeer naar de <strong>NEO-app</strong> op je apparaat',
  'auth.ledger.retry': 'Opnieuw proberen?',
  'auth.ledger.fetchAddress': 'Haal extra adressen op',
  publicAddress: 'Publiek adres',
  'auth.import.recoveryInstructions':
    'Upload hier een JSON-wallet-herstelbestand om je accounts aan Neon toe te voegen. Deze optie is ook beschikbaar op de pagina Instellingen.',
  importFile: 'Bestand importeren',
  dashboardTokenBalancesPrice: 'PRIJS',
  dashboardTokenBalancesHoldings: 'AANTAL',
  settingsLanguageLabel: 'TAAL',
  addToken: 'Token Toevoegen',
  contactsPageLabel: 'Contacten Beheren',
  newContact: 'Nieuw Contact',
  deleteLabel: 'Verwijderen',

  addToContacts: 'Toevoegen aan contacten',
  contactName: 'Naam',
  enterAContactName: 'Voer naam in',
  enterAWalletAddress: 'Voer wallet adres in',
  contactWalletAddress: 'Wallet adres',
  editAContact: 'Pas een contact aan',
  modifyDetails: 'Details aanpassen',
  removeContact: 'Verwijder contact',
  saveContactButtonText: 'Sla contact op',

  editContactDisclaimer:
    'Controleer of je het adres correct hebt ingevoerd om ervoor te zorgen dat je geen bezit verliest',
  addAContact: 'Voeg een contact toe',
  addContactDetails: 'Voeg contact-details toe',
  confirmRemoveContact: 'Bevestig het verwijderen van contact',
  modalActionConfirm: 'Akkoord',
  modalActionCancel: 'Annuleren',
  newsPageLabel: 'Niews',
  networkSettingsLabel: 'Netwerk Instellingen',

  walletManagerNoLocalInfo:
    'Het lijkt erop dat je geen wallet-informatie lokaal hebt opgeslagen',

  walletManagerRemoveWallet: 'Wallet verwijderen',

  selectAssets: 'Selecteer assets',
  priorityTransfer: 'Prioriteitstransactie',

  editRecipients: 'Pas ontvanger aan',
  confirmAndSend: 'Bevestigen en verzenden',
  fee: 'Vergoeding:',
  sendMoreAssets: 'Verstuur meer assets',
  transactionId: 'Transactie ID:',
  numberofTransactionsPending:
    '{transferCount, number} {transferCount, plural, one {Transactie} other {Transacties}} in afwachting',
  assetRecipients:
    'Asset {transferCount, plural, one {Ontvanger} other {Ontvangers}}',
  confirmation: 'Confirmation',
  confirmationRecipient:
    '{transferCount, number} {transferCount, plural, one {Ontvanger} other {Ontvangers}}',
  completeExclaim: 'Bevestigd!',
  sendQRExplanation:
    // eslint-disable-next-line
    'Dus je hebt een QR-code gekregen? Klik op Foto nemen en hou de QR-Code voor je camera.',
  captureQR: 'Foto nemen',
  captureQRCaps: 'FOTO NEMEN',

  networkConfigTooltipUpdateSettings: 'Instelling bijwerken',
  networkConfigTooltipPublicKey: 'PUBLIC KEY:',
  networkConfigTooltipAddress: 'ADRES:',
  networkConfigTooltipVotedNode: 'STEM UITGEBRACHT VOOR:',
  networkConfigTooltipQuickVote: 'Quickvote',

  noOptionsMessage: 'Geen opties',
  isLoadingMessage: 'Bezig met laden...',

  nothingToSeeHere: 'Niks te zien hier!',

  noAvailableAssetsToSend: 'Geen assets aanwezig om te verzenden',
  sendErrorLabel: 'Fout!',
  automaticNodeSelectionTooltip:
    'Sta NEON toe automatisch een node te selecteren',

  depositAssets:
    'Stort assets <b> compatibel met de NEO-blockchain </b> met als adres:',
  copyAddressTooltip: 'Kopieer wallet adres',
  walletQrCodes: 'Wallet QR-Code',

  noClaimableGas: 'Adres heeft geen claimbaar GAS',
  claimTimeDisclaimer: 'Je kunt GAS elke 5 minuten claimen',
  claimFeeDisclaimerN3:
    'Het claimen van GAS vereist minimaal 0,01120527 GAS voor transactiekosten',
  claimFeeGreater: 'Claimable GAS is minder dan transactiekosten',
  claimUnavailableInWatch:
    'GAS claims zijn niet beschikbaar in Alleen-lezen Mode',
  takeMeBack: 'Terug',

  splitKeyWalletInstructions:
    'Met de importoptie Gesplitste Sleutel kunnen gebruikers een nieuw NEO-account aanmaken door de private key van een bestaand account te combineren met een aparte private key.',
  splitKeyWalletNamePlaceholder:
    'Voer je nieuwe Gesplitste Sleutel wallet naam in...',
  chooseAccount: 'Kies een bestaande account',
  nextStep: 'Volgende stap',
  previousStep: 'Vorige stap',
  privateKey: 'Private key',
}

const ERRORS = {
  'errors.contact.nameNull': 'Naam kan niet leeg zijn.',
  'errors.contact.nameLength': 'Naam is te lang.',
  'errors.contact.nameDupe': 'Je hebt al een account opgeslagen met die naam.',
  'errors.contact.invalidAddress': 'Adres is niet geldig.',
  'errors.contact.contactExists': 'Je hebt als een contact met deze naam.',

  'errors.password.length': `Wachtwoord moet tenminste {PASS_MIN_LENGTH, number} tekens bevatten.`,
  'errors.password.match': 'Wachtwoorden moeten overeen komen.',
  'errors.request.fractional': `Je kunt niet een gedeelte van {asset} opvragen.`,
  'errors.request.validDecimals': `Je kunt {asset} tot maximaal {validDecimals, number} aanvragen.`,
  'errors.request.max': `Je kunt niet meer dan 100.000.000 {asset} aanvragen.`,
  'errors.request.min': `Je kunt niet 0 {asset} aanvragen.`,
  'errors.network.general': 'Oops! Iets ging verkeerd.',
  'errors.encrypt.valid': 'De private sleutel is niet geldig.',

  'errors.send.balance': `Je hebt niet genoeg in je wallet om {total} {asset} te verzenden.`,
  'errors.send.network': 'Een netwerk probleem is opgetreden.',
  'errors.send.number': 'Aantal moet nummeriek zijn.',
  'errors.send.fraction': 'Je knt geen gedeelte van een NEO verzenden.',
  'errors.send.negative': `Je kunt geen negatieve aantallen {asset} verzenden`,
  'errors.send.zero': `Je kunt geen 0 {asset} verzenden.`,
  'errors.send.decimal': `Je kunt {asset} tot maximaal {decimalCount, number} verzenden.`,
  'errors.send.invalidAddress': 'Je moet een geldig NEO adres invoeren..',
  'errors.send.invalidN3Address': 'Je moet een geldig NEO N3 adres invoeren..',
  'errors.send.blackListed':
    'Adres is geblacklist, dit is een bekend phising adres.',
}

const NOTIFICATIONS = {
  'notifications.success.receivedBlockchainInfo':
    'Laatste blockchain informatie opgevraagd.',
  'notifications.success.accountSaved': 'Account opgeslagen!',
  'notifications.success.updatedWalletName': 'Wallet naam opgeslagen..',
  'notifications.failure.blockchainInfoFailure':
    'Het is niet gelukt om blockchain informatie op te halen.',
}

const AUTH = {
  authLogin: 'Inloggen',
  authSaved: 'OPGESLAGEN',
  authPrivate: 'PRIVATE KEY',
  authEncrypted: 'VERSLEUTELD',
  authWatch: 'ALLEEN LEZEN',
  authLedger: 'LEDGER',
  authCreateWallet: 'Maak wallet',
  authImportWallet: 'Importeer wallet',
  authMigrateWallets: "Portefeuilles migreren",
  authScanQRButton: 'Scan QR-Code',
  authLoginButton: 'Inloggen',
  authLedgerFirstStep: 'Verbind en ontgrendel je Ledger-apparaat',
  authLedgerSecondStep: 'Navigeer naar de NEO-app op je apparaat',
  authLedgerAddressLabel: 'PUBLIEK ADRES',
}

const WALLET_CREATION = {
  createANewWallet: 'Maak nieuwe wallet',
  walletCreationInstruction: 'Voer details in',
  walletCreationWalletNameLabel: 'WALLET NAAM',
  walletCreationWalletNamePlaceholder: 'Wallet naam',
  walletCreationWalletPasswordLabel: 'Wachtwoord',
  walletCreationWalletPasswordPlaceholder: 'Wachtwoord',
  walletCreationWalletPasswordConfirmLabel: 'Herhaal wachtwoord',
  walletCreationWalletPasswordConfirmPlaceholder: 'Wachtwoord nogmaals',
  walletCreationButton: 'Maak wallet',
  walletCreatedHeader: 'Wallet aangemaakt!',
  walletImportedHeader: 'Wallet aangemaakt!',
  walletCreatedDisclaimer:
    '<b>Bewaar deze details!</b> Als je deze inloggegevens kwijtraakt, heb je geen toegang meer tot je assets.',
  privateKeyLabel: 'PRIVATE KEY',
  encryptedKeyLabel: 'BEVEILIGDE SLEUTEL',
  addressLabel: 'PUBLIEK ADRES',
  splitKeyLabel: 'GESPLITSTE SLEUTEL',
  recoverWalletLabel: 'HERSTEL WALLET',
  print: 'Print',
  generateQrCodes: 'Genereer QR-Codes',
  copyCodeImage: 'Kopieer Code Image',
}

const DASHBOARD = {
  dashboardBalancePanelLabel: 'Token overzicht',
  dashboardAssetsPanelLabel: 'Systeem assets',
  dashboardAssetsTotal: 'TOTAAL',
  dashboardMarketDataLabel: 'Marktdata',
  dashboardValueLabel: 'Totale walletwaarde',
  dashboardAddressLabel: 'Adres:',
  dashboardPriceNotAvailable: 'N.v.t.',
  dashboardGasClaimButton: 'Claim {amount} GAS',
  dashboardManageWallets: 'Beheer wallets',
  dashboardRefresh: 'Verversen',
  dashboardTokenBalancesToken: 'Token',
  dashboardMarketData1Day: '1 DAG',
  dashboardMarketData1Week: '1 WEEK',
  dashboardMarketData1Month: '1 MAAND',
}

const SIDEBAR = {
  sidebarWallet: 'Wallet',
  sidebarActivity: 'Activiteit',
  sidebarSend: 'Verzenden',
  sidebarReceive: 'Ontvangen',
  sidebarContacts: 'Contacten',
  sidebarTokenSale: 'Token Verkoop',
  sidebarNews: 'Nieuws',
  sidebarSettings: 'Instellingen',
  sidebarLogout: 'Uitloggen',
  sidebarCurrentBlock: 'HUIDIG BLOK',
}

const MANAGE_WALLETS = {
  manageWalletsLabel: 'Beheer wallets',
  manageWalletsImport: 'Importeren',
  manageWalletsCreate: 'Maak',
  manageWalletsEdit: 'Aanpassen',
  manageWalletsEditWallet: 'Pas wallet aan',
  manageWalletsEditWalletInstructions: 'Wijzig details',
  manageWalletsEditWalletNameLabel: 'WALLET NAAM',
  manageWalletsEditWalletNamePlaceholder: 'Wallet naam',
  manageWalletsEditWalletAddressLabel: 'WALLET ADRES',
  manageWalletsEditWalletSave: 'Wijzigingen opslaan',
}

const ACTIVITY = {
  activityAddAddress: 'Toevoegen',
  activityViewTx: 'Bekijken',
  activityPageLabel: 'Alle activiteiten',
  activityExport: 'Exporteren',
}

const RECEIVE = {
  recieveSelectMethod: 'Selecteer stortingsmethode',
  receiveAssetsAddressLabel: 'Jouw publieke adres',
  receivePageLabel: 'Ontvang assets',
  receiveYourAddressTabLabel: 'JOUW ADRES',
  receiveCopyCodeButton: 'Copy Code Afbeelding',
  receiveDisclaimer:
    'Stuur alleen assets die <b>compatibel zijn met de NEO-blockchain (NEO, GAS, etc.)</b>. Het verzenden van andere assets zal resulteren in permanent verlies.',
  receiveRequestTabAssets: 'VERZOEK ASSETS',
  recieveWhyUseQRLabel: 'Waarom een QR-Code gebruiken??',
  receiveQRExplanation:
    '<p>Ooit assets naar het verkeerde adres gestuurd vanwege een foutief karakter in het wallet-adres?</p><p>Zo niet, dan heb je mazzel - maar het gebeurt veel te vaak.</p><p>Hier bij CoZ willen we ervoor zorgen dat mensen die jou betalen, het juiste adres krijgen. Je kunt een QR-code genereren om assets aan te vragen, zodat ze jou kunnen helpen. </p> <p> Elke code die je genereert, bevat je openbare wallet-adres, een aantal en een referentie - allemaal door jou ingesteld. </p>',
}

const REQUEST_ASSETS = {
  requestAssetLabel: 'ASSET',
  requestAssetAmountLabel: 'Aantal',
  requestAssetAmount: 'AANTAL',
  requestAssetDepositLabel: 'SORT IN DEZE WALLET',
  requestAssetRefLabel: 'REFERENTIE',
  requestAssetRefPlaceholder: 'Voeg een notitie toe...',
  requestAssetQRButton: 'Genereer QR-Code',
  requestAssetYourQRHeader: 'Jou QR Code',
  requestAssetsPaymentDetails: 'BETAALVERZOEK DETAILS',
  requestAssetsYourQRLabel: 'Jouw QR-Code',
  requestAssetsRefLabel: 'REFERENTIE',
  requestAssetsAddressLabel: 'ADRES',
  requestAssetsAmountLabel: 'AANTAL',
  requestAssetsAssetLabel: 'ASSET',
}

const TRANSACTION_FEE = {
  transactionFeeQuestion: 'PRIORITEER JOUW TRANSACTIE MET EEN VERGOEDING?',
  fast: 'Snel',
  faster: 'Sneller',
  fastest: 'Snelst',
  sendWithFee:
    'Verstuur {itemCount, plural, one {asset} other {assets}} met vergoeding',
  sendWithoutFee:
    'Verstuur {itemCount, plural, one {asset} other {assets}} zonder vergoeding',
  Asset: 'Asset',
  assets: 'Assets',
}

const SEND = {
  sendPageLabel: 'Verstuur assets',
  sendImport: 'Importeren',
  sendEnterQRCode: 'Voer QR-Code in',
  sendAdd: 'Voeg ontvanger toe',
  sendAssetLabel: 'ASSET',
  sendAmountLabel: 'AANTAL',
  sendAddressLabel: 'ONTVANGER ADRES',
  sendAddressPlaceholder: 'Voeg wallet toe of selecteer contact',
  sendTranfer: 'TRANSACTIE',
  sendMaxAmount: 'MAX',
  sendTransferPlural: 'TRANSACTIES',
  sendAsset: 'asset',
  sendAssets: 'assets',
  sendRecipient: 'ontvanger',
  sendRecipients: 'ontvangers',
  sendAssetCapital: 'Asset',
  sendAssetsCapital: 'Assets',
  sendRecipientCapital: 'ONTVANGER',
  sendRecipientsCapital: 'ONTVANGERS',
  sendCompleteNotification:
    'Transactie in behandeling! Je saldo wordt automatisch bijgewerkt zodra de blockchain het heeft verwerkt.',
  sendSelectAssets:
    '{transferCount, number} van {maxNumberOfRecipients, number} Ontvangers',
  sendTransferMessage:
    '{transferCount, number} {transferCount, plural, one {sendTransfer} other {sendTransferPlural}} in afwachting',
  sendBroadcasting: 'Transactie uitzenden naar netwerk...',
  sendDisclaimer:
    'Controleer en zorg ervoor dat je de juiste gegevens hebt ingevoerd om verlies van assets te voorkomen.',
  sendActivityLink:
    'Kijk op het tabblad Activiteit om de status van je transactie te zien.',

  sendCompletion:
    'Voltooid! {transferCount, number} {transferCount, plural, one {sendAsset} other {sendAssets}} naar {transferCount, plural, one {sendRecipient} other {sendRecipients}}',
}

const SETTINGS = {
  settingsNetworkConfigLabel: 'NETWERK CONFIGURATIE',
  settingCurrencyLabel: 'VALUTA',
  settingsThemeLabel: 'THEMA',
  settingsSoundLabel: 'GELUID',
  settingsEncryptLink: 'BEVEILIG EEN SLEUTEL',
  recoverWallet: 'HERSTEL WALLET',
  settingsRecoverWalletLink: 'IMPORTEREN',
  settingsBackUpLinkLabel: 'BACKUP WALLET',
  settingsBackUpLink: 'EXPORTEREN',
  settingsManageLabel: 'Beheer je Neon wallet',
  settingsCommunity: 'Community ondersteuning',
  settingsDonationLink: 'Gemaakt door CoZ. Donaties:',
}

const NETWORK_SETTINGS = {
  networkSettingsInstructions:
    'Beheer alle netwerkinstellingen met betrekking tot de interactie tussen Neon en de blockchain',
  networkSettingsNodeSelectLabel: 'NODE SELECTIE',
  networkSettingsExplorerLabel: 'BLOK VERKENNER',
  networkSettingsCurrentLabel: 'HUIDIG NETWERK',
  networkSettingsAutomatic: 'AUTOMATISCH',
}

const NODE_SELECTION = {
  nodeSelectPanelHeader: 'Node Selectie',
  nodeSelectionInstructions:
    'Als je prestatieproblemen ondervindt, selecteer je hieronder een aangepaste node',
  nodeSelectSelectAutomatically: 'Selecteer automatisch',
  nodeSelectInfo: 'Top {nodeCount, number} nodes getoont',
  nodeSelectBlockHeight: 'Blok hoogte',
}

const ENCRYPT_KEY = {
  encryptPanelHeader: 'Beveilig een sleutel',
  encryptInstructions:
    'Kies een wachtwoord om een bestaande sleutel te beveiligen',
  encryptStep1Label: '1) VOER DE PRIVATE KEY IN DIE JE WILT BEVEILIGEN',
  encryptStep1Placeholder: 'Voer private key in',
  encryptStep2Label: '2) VERZIN WACHTWOORD',
  encryptStep2Placeholder: 'Voer wachtwoord in',
  encryptStep3Label: '3) NOGMAALS JE WACHTWOORD',
  encryptStep3Placeholder: 'Voer je wachtwoord in',
  encryptButton: 'Genereer beveiligde sleutel',
}

const TOKEN_SALE = {
  tokenSalePageHeader: 'Doe mee in Tokenverkoop',
  tokenSaleDisclaimer1: 'Lees en bevestig deze verklaringen om door te gaan',
  tokenSaleDisclaimer2:
    'Ik begrijp dat het meerdere keren indienen van NEO of GAS kan leiden tot verlies van assets of tot een vertraagde terugbetaling kan leiden, afhankelijk van het beleid van het ICO-bedrijf.',
  tokenSaleDisclaimer3:
    'Ik begrijp dat sommige verkopen alleen NEO of GAS accepteren, en ik heb gecontroleerd welke wordt geaccepteerd.',
  tokenSaleDisclaimer4:
    'Ik begrijp dat als ik NEO of GAS stuur naar een tokenverkoop die al is afgelopen, ik mijn NEO / GAS zal verliezen en niet zal worden terugbetaald.',
  // eslint-disable-next-line
  tokenSaleDisclaimer5: `Ik begrijp dat City of Zion (CoZ) niet verantwoordelijk is voor het gebruik van deze functie, en ik de licenties van deze software heb geraadpleegd.`,
}

const MIGRATE_WALLETS_NEON3 = {
  migrateWalletsNeon3AltImage: "Achtergrondafbeelding portefeuilles migreren",
  migrateWalletNeon3Title: "Wilt u uw NEON 2-portefeuille migreren naar NEON 3?",
  migrateWalletNeon3Description: "Door uw portefeuille te migreren, krijgt u toegang tot een breder scala aan ondersteunde activa en een gestroomlijnde, verbeterde gebruikerservaring die het beheer van uw activa een fluitje van een cent zal maken!",
  migrateWalletNeon3Button: "Nu migreren!",
}

const MIGRATE_WALLETS_NEON3_STEPS = {
  migrateWalletsNeon3Steps1: 'Ontvang NEON 3',
  migrateWalletsNeon3Steps2: 'Exporteer uw NEON 2-accounts',
  migrateWalletsNeon3Steps3: 'Open NEON 3',

  migrateWalletsNeon3Step1Title: "Ontvang NEON 3",
  migrateWalletsNeon3Step1Description: "Begin met het downloaden van de nieuwste NEON-build en maak uw eerste portefeuille:",
  migrateWalletsNeon3Step1DownloadButton: "Download NEON 3",
  migrateWalletsNeon3Step1NextStep: "Zodra NEON 3 is geïnstalleerd op uw apparaat, ga naar de volgende stap.",
  migrateWalletsNeon3Step1ButtonLabel: "Volgende",

  migrateWalletsNeon3Step2Title: "Exporteer uw NEON 2-accounts",
  migrateWalletsNeon3Step2Description: "Exporteer het NEON 2-migratiebestand naar uw computer. U zult dit bestand gebruiken om uw portefeuille naar NEON 3 te migreren.",
  migrateWalletsNeon3InputLabel: "Waar wilt u uw migratiebestand opslaan?",
  migrateWalletsNeon3Step2BrowseButton: "Bladeren...",
  migrateWalletsNeon3Step2NextStep: "Wanneer u een locatie heeft gedefinieerd om uw migratiebestand op te slaan, ga naar de volgende stap.",
  migrateWalletsNeon3Step2ButtonLabel: "Volgende",

  migrateWalletsNeon3Step3Title: "Open NEON 3",
  migrateWalletsNeon3Step3Description: "U bent er bijna!",
  migrateWalletsNeon3Step3Description2: "Om het migratieproces te voltooien, opent u NEON 3 en volgt u de instructies.",
  migrateWalletsNeon3Step3AltImage: "Achtergrondafbeelding portefeuilles migreren",
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
