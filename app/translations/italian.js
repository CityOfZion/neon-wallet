// @flow
const INPUTS = {
  inputSelectPlaceholder: 'Selezionare',
  inputPasswordPlaceholder: `Parola d'ordine`,
  inputEncryptedPlaceholder: 'Chiave crittografata',
  authPrivateKeyPlaceholder: 'Inserisci qui la tua chiave privata',
  authWatchPlaceholder: 'Inserisci qui un indirizzo NEO',
}

const MISCELLANEOUS = {
  'auth.cancel': 'Annulla',
  'auth.ledger.connectLedger':
    'Connetti e sblocca il tuo <strong> dispositivo di contabilità generale </strong>',
  'auth.ledger.navigateToNeoApp':
    'Passa alla <strong> app NEO </strong> sul tuo dispositivo',
  'auth.ledger.retry': 'Riprova??',
  'auth.ledger.fetchAddress': 'Ottieni altri indirizzi',
  publicAddress: 'Indirizzo pubblico',
  'auth.import.recoveryInstructions':
    'Carica qui un file di recupero del portafoglio JSON per aggiungere i tuoi account a Neon. Questa opzione è disponibile anche nella pagina Impostazioni.',
  importFile: 'Importare file',
  dashboardTokenBalancesPrice: 'PREZZO',
  dashboardTokenBalancesHoldings: 'HOLDINGS',
  settingsLanguageLabel: 'LINGUAGGIO',
  addToken: 'Aggiungi token',
  contactsPageLabel: 'Gestisci contatti',
  newContact: 'Nuovo contatto',
  deleteLabel: 'Elimina',

  addToContacts: 'Aggiungi ai contatti',
  contactName: 'Nome',
  enterAContactName: 'Inserisci il nome del contatto...',
  enterAWalletAddress: `Inserisci l'indirizzo del portafoglio...`,
  contactWalletAddress: 'Indirizzo del portafoglio',
  editAContact: 'Modifica un contatto',
  modifyDetails: 'Modifica dettagli',
  removeContact: 'Rimuovi il contatto',
  saveContactButtonText: 'Salva contatto',

  editContactDisclaimer: `Esamina e assicurati di aver inserito correttamente l'indirizzo per evitare la perdita di fondi`,
  addAContact: 'Aggiungi un contatto',
  addContactDetails: 'Aggiungi dettagli di contatto',
  confirmRemoveContact: 'Conferma la rimozione del contatto',
  modalActionConfirm: 'Confermare',
  modalActionCancel: 'Annulla',
  newsPageLabel: 'notizia',
  networkSettingsLabel: 'Impostazioni di rete',

  walletManagerNoLocalInfo:
    'Sembra che tu non abbia informazioni sul portafoglio salvate localmente...',

  walletManagerRemoveWallet: 'Rimuovi portafoglio',

  selectAssets: 'Seleziona risorse',
  priorityTransfer: 'Priorità',

  editRecipients: 'Modifica destinatari',
  confirmAndSend: 'Conferma e invia',
  fee: 'tassa:',
  sendMoreAssets: 'Invia più risorse',
  transactionId: 'ID transazione:',
  numberofTransactionsPending:
    '{transferCount, number} {transferCount, plural, one {Trasferimento} other {trasferimenti}} in sospeso',
  assetRecipients:
    'Asset {transferCount, plural, one {Destinatario} other {Destinatari}}',
  confirmation: 'Confirmation',
  confirmationRecipient:
    '{transferCount, number} {transferCount, plural, one {Destinatario} other {Destinatari}}',
  completeExclaim: 'Completare!',
  sendQRExplanation:
    // eslint-disable-next-line
    'Quindi ti è stato dato un codice QR? Fai clic su cattura e tienilo premuto fino alla fotocamera.',
  captureQR: 'Catturare',
  captureQRCaps: 'CATTURARE',

  networkConfigTooltipUpdateSettings: 'Aggiorna impostazioni',
  networkConfigTooltipPublicKey: 'CHIAVE PUBBLICA:',
  networkConfigTooltipAddress: 'INDIRIZZO:',
  networkConfigTooltipVotedNode: 'VOTO PER:',
  networkConfigTooltipQuickVote: 'Quickvote',

  noOptionsMessage: 'Nessuna opzione',
  isLoadingMessage: 'Caricamento in corso...',

  nothingToSeeHere: 'Niente da vedere quì!',
  noAvailableAssetsToSend: 'Nessuna risorsa disponibile da inviare',
  sendErrorLabel: 'Errore!',
  automaticNodeSelectionTooltip:
    'Consenti a NEON di scegliere automaticamente un nodo',
  depositAssets:
    'Deposita risorse <b> compatibili con la blockchain NEO </b> utilizzando il tuo indirizzo:',
  copyAddressTooltip: `Copia l'indirizzo del portafoglio`,
  walletQrCodes: 'Codici QR del portafoglio',
  noClaimableGas: `L'indirizzo non ha alcun GAS rivendicabile`,
  claimTimeDisclaimer: 'Puoi richiedere GAS una volta ogni 5 minuti',
  claimFeeDisclaimerN3:
    'La richiesta di GAS richiede almeno 0,01120527 GAS per le commissioni di transazione',
  claimFeeGreater:
    'Il GAS rivendicabile è inferiore alle commissioni di transazione',
  claimUnavailableInWatch:
    'I reclami GAS non sono disponibili in modalità Orologio',
  takeMeBack: 'Portami indietro',
  splitKeyWalletInstructions: `L'opzione di importazione Chiave divisa consente agli utenti di creare un nuovo account NEO combinando la chiave privata di un account esistente con una chiave privata separata.`,
  splitKeyWalletNamePlaceholder:
    'Inserisci il nome del tuo nuovo portafoglio con chiave divisa...',
  chooseAccount: 'Scegli un account esistente',
  nextStep: 'Passo successivo',
  previousStep: 'Passo precedente',
  privateKey: 'Chiave privata',
}

const ERRORS = {
  'errors.contact.nameNull': 'Il nome non può essere nullo.',
  'errors.contact.nameLength': 'Il nome è troppo lungo',
  'errors.contact.nameDupe': 'Hai già un account salvato con quel nome.',
  'errors.contact.invalidAddress': `L'indirizzo non è valido`,
  'errors.contact.contactExists': `Hai già un contatto con quell'indirizzo.`,
  'errors.password.length': `La passphrase deve contenere almeno {PASS_MIN_LENGTH, number} caratteri`,
  'errors.password.match': 'Le passphrase devono corrispondere',
  'errors.request.fractional': `Non puoi richiedere {asset} frazionario.`,
  'errors.request.validDecimals': `Puoi richiedere solo {asset} fino a {validDecimals, number} decimali.`,
  'errors.request.max': `Non puoi richiedere più di 100.000.000 di {asset}.`,
  'errors.request.min': `Non puoi richiedere 0 {asset}.`,
  'errors.network.general': 'Oops! Qualcosa è andato storto.',
  'errors.encrypt.valid': 'La chiave privata non è valida',

  'errors.send.balance': `Non hai abbastanza saldo per inviare {total} {asset}.`,
  'errors.send.network': 'Si è verificato un errore di rete',
  'errors.send.number': `L'importo deve essere un numero.`,
  'errors.send.fraction': 'Non è possibile inviare importi frazionari di NEO.',
  'errors.send.negative': `Non puoi inviare importi negativi di {asset}.`,
  'errors.send.zero': `Impossibile inviare 0 {asset}.`,
  'errors.send.decimal': `Puoi inviare solo {asset} fino a {decimalCount, number} decimali.`,
  'errors.send.invalidAddress': 'Devi specificare un indirizzo NEO valido.',
  'errors.send.invalidN3Address':
    'Devi specificare un indirizzo NEO N3 valido.',
  'errors.send.blackListed': `L'indirizzo è nella lista nera. Questo è un indirizzo di phishing noto.`,
}

const NOTIFICATIONS = {
  'notifications.success.receivedBlockchainInfo':
    'Ricevute le ultime informazioni sulla blockchain.',
  'notifications.success.accountSaved': 'Account salvato!',
  'notifications.success.updatedWalletName':
    'Nome del portafoglio aggiornato con successo.',
  'notifications.failure.blockchainInfoFailure':
    'Impossibile recuperare le informazioni sulla blockchain.',
}

const AUTH = {
  authLogin: 'Accesso',
  authSaved: 'SALVATO',
  authPrivate: 'PRIVATO',
  authEncrypted: 'CRIPTATO',
  authWatch: 'OROLOGIO',
  authLedger: 'LEDGER',
  authCreateWallet: 'Crea portafoglio',
  authImportWallet: 'Importa portafoglio',
  authMigrateWallets: "Migrare i portafogli",
  authScanQRButton: 'Scansiona QR',
  authLoginButton: 'Accesso',
  authLedgerFirstStep: 'Connetti e sblocca il tuo dispositivo Ledger',
  authLedgerSecondStep: `Vai all'app NEO sul tuo dispositivo`,
  authLedgerAddressLabel: 'INDIRIZZO PUBBLICO',
}

const WALLET_CREATION = {
  createANewWallet: 'Crea nuovo portafoglio',
  walletCreationInstruction: 'Inserisci i dettagli',
  walletCreationWalletNameLabel: 'NOME PORTAFOGLIO',
  walletCreationWalletNamePlaceholder: 'Nome del portafoglio',
  walletCreationWalletPasswordLabel: `FRASE D'ACCESSO`,
  walletCreationWalletPasswordPlaceholder: `Parola d'ordine`,
  walletCreationWalletPasswordConfirmLabel: 'CONFIRM PASSPHRASE',
  walletCreationWalletPasswordConfirmPlaceholder: 'conferma Password',
  walletCreationButton: 'Crea portafoglio',
  walletCreatedHeader: 'Portafoglio creato!',
  walletImportedHeader: 'Portafoglio importato!',
  walletCreatedDisclaimer: `<b> Salva questi dettagli! </b> Se perdi queste credenziali, perdi l'accesso alle tue risorse.`,
  privateKeyLabel: 'CHIAVE PRIVATA',
  encryptedKeyLabel: 'TASTO CRIPTATO',
  addressLabel: 'INDIRIZZO PUBBLICO',
  splitKeyLabel: 'SPLIT KEY',
  recoverWalletLabel: 'RECOVER WALLET',
  print: 'Stampa',
  generateQrCodes: 'Genera codici QR',
  copyCodeImage: 'Copia immagine codice',
}

const DASHBOARD = {
  dashboardBalancePanelLabel: 'Saldi token',
  dashboardAssetsPanelLabel: 'Risorse di sistema',
  dashboardAssetsTotal: 'TOTALE',
  dashboardMarketDataLabel: 'Dati di mercato',
  dashboardValueLabel: 'Valore totale del portafoglio',
  dashboardAddressLabel: 'Indirizzo:',
  dashboardPriceNotAvailable: 'N/A',
  dashboardGasClaimButton: 'Richiedi {amount} GAS',
  dashboardManageWallets: 'Gestisci portafogli',
  dashboardRefresh: 'ricaricare',
  dashboardTokenBalancesToken: 'Gettone',
  dashboardMarketData1Day: '1 GIORNO',
  dashboardMarketData1Week: '1 SETTIMANA',
  dashboardMarketData1Month: '1 MESE',
}

const SIDEBAR = {
  sidebarWallet: 'Portafoglio',
  sidebarActivity: 'Attività',
  sidebarSend: 'Spedire',
  sidebarReceive: 'Ricevere',
  sidebarContacts: 'Contatti',
  sidebarTokenSale: 'Vendita di token',
  sidebarNews: 'notizia',
  sidebarSettings: 'Impostazioni',
  sidebarLogout: 'Disconnettersi',
  sidebarCurrentBlock: 'BLOCCO CORRENTE',
}

const MANAGE_WALLETS = {
  manageWalletsLabel: 'Gestisci portafogli',
  manageWalletsImport: 'Importare',
  manageWalletsCreate: 'Creare',
  manageWalletsEdit: 'Modificare',
  manageWalletsEditWallet: 'Modifica portafoglio',
  manageWalletsEditWalletInstructions: 'Modifica dettagli',
  manageWalletsEditWalletNameLabel: 'NOME PORTAFOGLIO',
  manageWalletsEditWalletNamePlaceholder: 'Nome del portafoglio',
  manageWalletsEditWalletAddressLabel: 'INDIRIZZO DEL PORTAFOGLIO',
  manageWalletsEditWalletSave: 'Salvare le modifiche',
}

const ACTIVITY = {
  activityAddAddress: 'Inserisci',
  activityViewTx: 'Visualizza',
  activityPageLabel: 'Tutte le attività',
  activityExport: 'Esportare',
}

const RECEIVE = {
  recieveSelectMethod: 'Seleziona il metodo di deposito',
  receiveAssetsAddressLabel: 'Il tuo indirizzo pubblico',
  receivePageLabel: 'Ricevi attività',
  receiveYourAddressTabLabel: 'IL TUO INDIRIZZO',
  receiveCopyCodeButton: 'Copia immagine codice',
  receiveDisclaimer: `Invia solo risorse <b> compatibili con la blockchain NEO (NEO, GAS, ecc.) </b>. L'invio di altre attività comporterà una perdita permanente.`,
  receiveRequestTabAssets: 'RICHIEDI ATTIVITÀ',
  recieveWhyUseQRLabel: 'Perché usare un codice QR?',
  receiveQRExplanation: `<p> Hai mai inviato risorse all'indirizzo sbagliato a causa di un carattere errato nell'indirizzo del portafoglio? </p> <p> In caso contrario, sei fortunato, ma succede con una regolarità spaventosa. </p> <p> Qui a COZ , vogliamo garantire che le persone che ti pagano ottengano i tuoi dati giusti. Puoi generare un codice QR per richiedere risorse per aiutarle ad aiutarti. </p> <p> Ogni codice che genererai includerà il tuo indirizzo di portafoglio pubblico, un importo di risorsa e un riferimento - tutto impostato da te. </p>`,
}

const REQUEST_ASSETS = {
  requestAssetLabel: 'RISORSA',
  requestAssetAmountLabel: 'Quantità',
  requestAssetAmount: 'QUANTITÀ',
  requestAssetDepositLabel: 'DEPOSITO IN QUESTO PORTAFOGLIO',
  requestAssetRefLabel: 'RIFERIMENTO',
  requestAssetRefPlaceholder: 'Aggiungi una nota...',
  requestAssetQRButton: 'Genera codice QR',
  requestAssetYourQRHeader: 'Il tuo codice QR',
  requestAssetsPaymentDetails: 'DETTAGLI RICHIESTA DI PAGAMENTO',
  requestAssetsYourQRLabel: 'IL TUO CODICE QR',
  requestAssetsRefLabel: 'RIFERIMENTO',
  requestAssetsAddressLabel: 'INDIRIZZO',
  requestAssetsAmountLabel: 'QUANTITÀ',
  requestAssetsAssetLabel: 'RISORSA',
}

const TRANSACTION_FEE = {
  transactionFeeQuestion: 'PRIORITIZZARE LA TUA TRANSAZIONE CON UNA QUOTA?',
  fast: 'Veloce',
  faster: 'Più Veloce',
  fastest: 'più veloce',
  sendWithFee:
    'Invia {itemCount, plural, one {risorsa} other {risorse}} con commissione',
  sendWithoutFee:
    'Invia {itemCount, plural, one {risorsa} other {risorse}} senza commissioni',
  Asset: 'Risorsa',
  assets: 'Risorse',
}

const SEND = {
  sendPageLabel: 'Invia risorse',
  sendImport: 'Importare',
  sendEnterQRCode: 'Inserisci il codice QR',
  sendAdd: 'Aggiungere il destinatario',
  sendAssetLabel: 'RISORSA',
  sendAmountLabel: 'QUANTITÀ',
  sendAddressLabel: 'INDIRIZZO DEL DESTINATARIO',
  sendAddressPlaceholder: 'Aggiungi portafoglio o seleziona contatto',
  sendTranfer: 'TRASFERIMENTO',
  sendMaxAmount: 'MAX',
  sendTransferPlural: 'TRASFERIMENTI',
  sendAsset: 'risorsa',
  sendAssets: 'risorse',
  sendRecipient: 'destinatario',
  sendRecipients: 'destinatari',
  sendAssetCapital: 'Risorsa',
  sendAssetsCapital: 'Risorse',
  sendRecipientCapital: 'Destinatario',
  sendRecipientsCapital: 'destinatari',
  sendCompleteNotification:
    'Transazione in sospeso! Il tuo saldo si aggiornerà automaticamente quando la blockchain lo ha elaborato.',
  sendSelectAssets:
    '{transferCount, number} of {maxNumberOfRecipients, number} Destinatari',
  sendTransferMessage:
    '{transferCount, number} {transferCount, plural, one {sendTransfer} other {sendTransferPlural}} in sospeso',

  sendBroadcasting: 'Trasmissione della transazione alla rete...',
  sendDisclaimer:
    'Esamina e assicurati di aver inserito i dettagli corretti per evitare la perdita di fondi.',
  sendActivityLink:
    'Controlla la scheda attività per vedere lo stato della tua transazione.',
  sendCompletion:
    'Completare! {transferCount, number} {transferCount, plural, one {sendAsset} other {sendAssets}} a {transferCount, plural, one {sendRecipient} other {sendRecipients}}',
}

const SETTINGS = {
  settingsNetworkConfigLabel: 'CONFIGURAZIONE DELLA RETE',
  settingCurrencyLabel: 'MONETA',
  settingsThemeLabel: 'TEMA',
  settingsSoundLabel: 'SUONO',
  settingsEncryptLink: 'ENCRYPT A KEY',
  recoverWallet: 'PORTAFOGLIO RECUPERO',
  settingsRecoverWalletLink: 'IMPORTARE',
  settingsBackUpLinkLabel: 'PORTAFOGLIO DI BACKUP',
  settingsBackUpLink: 'ESPORTARE',
  settingsManageLabel: 'Gestisci il tuo portafoglio Neon',
  settingsCommunity: 'Supporto comunitario',
  settingsDonationLink:
    'Creato da COZ. Donazioni: Adr3XjZ5QDzVJrWvzmsTTchpLRRGSzgS5A',
}

const NETWORK_SETTINGS = {
  networkSettingsInstructions:
    'Gestisci tutte le impostazioni di rete relative al modo in cui Neon Wallet interagisce con la blockchain',
  networkSettingsNodeSelectLabel: 'SELEZIONE DEL NODO',
  networkSettingsExplorerLabel: 'ESPLORATORE DI BLOCCHI',
  networkSettingsCurrentLabel: 'RETE ATTUALE',
  networkSettingsAutomatic: 'AUTOMATICO',
}

const NODE_SELECTION = {
  nodeSelectPanelHeader: 'Selezione del nodo',
  nodeSelectionInstructions:
    'Se riscontri problemi di prestazioni, prova a selezionare un nodo personalizzato di seguito',
  nodeSelectSelectAutomatically: 'Seleziona automaticamente',
  nodeSelectInfo: 'Top {nodeCount, number} nodi elencati',
  nodeSelectBlockHeight: 'Altezza del blocco',
}

const ENCRYPT_KEY = {
  encryptPanelHeader: 'Crittografa una chiave',
  encryptInstructions:
    'Scegli una passphrase per crittografare una chiave esistente',
  encryptStep1Label: '1) INSERISCI IL TASTO PRIVATO CHE VUOI ISCRITTO',
  encryptStep1Placeholder: 'Tasto Invio',
  encryptStep2Label: '2) CREA UNA PASSPHRASE',
  encryptStep2Placeholder: 'Inserisci Passphrase',
  encryptStep3Label: '3) CONFERMA LA TUA PASSPHRASE',
  encryptStep3Placeholder: 'Conferma passphrase',
  encryptButton: 'Genera chiave crittografata',
}

const TOKEN_SALE = {
  tokenSalePageHeader: 'Partecipa alla vendita di token',
  tokenSaleDisclaimer1:
    'Si prega di leggere e riconoscere queste dichiarazioni per continuare',
  tokenSaleDisclaimer2: `Comprendo che l'invio di NEO o GAS più volte può comportare una perdita di fondi o un rimborso ritardato a seconda della politica della società ICO.`,
  tokenSaleDisclaimer3:
    'Comprendo che alcune vendite possono accettare solo NEO o GAS e ho verificato quale è accettato.',
  tokenSaleDisclaimer4:
    'Comprendo che se invio NEO o GAS a una vendita di token già terminata, perderò il mio NEO / GAS e non verrà rimborsato.',
  // eslint-disable-next-line
  tokenSaleDisclaimer5: `Comprendo che COZ non è responsabile per il mio utilizzo di questa funzione e ho consultato le licenze di questo software.`,
}

const MIGRATE_WALLETS_NEON3 = {
  migrateWalletsNeon3AltImage: "Immagine di sfondo per la migrazione dei portafogli",
  migrateWalletNeon3Title: "Vuoi migrare il tuo portafoglio NEON 2 su NEON 3?",
  migrateWalletNeon3Description: "Migrando il tuo portafoglio avrai accesso a una gamma più ampia di asset supportati e a un'esperienza utente più fluida e migliorata che renderà la gestione dei tuoi asset un gioco da ragazzi!",
  migrateWalletNeon3Button: "Migra ora!",
};

const MIGRATE_WALLETS_NEON3_STEPS = {
  migrateWalletsNeon3Steps1: "Ottieni NEON 3",
  migrateWalletsNeon3Steps2: "Esporta i tuoi account NEON 2",
  migrateWalletsNeon3Steps3: "Apri NEON 3",

  migrateWalletsNeon3Step1Title: "Ottieni NEON 3",
  migrateWalletsNeon3Step1Description: "Inizia scaricando l'ultima versione di NEON e creando il tuo primo portafoglio:",
  migrateWalletsNeon3Step1DownloadButton: "Scarica NEON 3",
  migrateWalletsNeon3Step1NextStep: "Una volta installato NEON 3 sul tuo dispositivo, passa al passaggio successivo.",
  migrateWalletsNeon3Step1ButtonLabel: "Avanti",

  migrateWalletsNeon3Step2Title: "Esporta i tuoi account NEON 2",
  migrateWalletsNeon3Step2Description: "Esporta il file di migrazione NEON 2 sul tuo computer. Utilizzerai questo file per migrare il tuo portafoglio su NEON 3.",
  migrateWalletsNeon3InputLabel: "Dove desideri salvare il tuo file di migrazione?",
  migrateWalletsNeon3Step2BrowseButton: "Sfoglia...",
  migrateWalletsNeon3Step2NextStep: "Una volta definita una posizione per salvare il tuo file di migrazione, passa al passaggio successivo.",
  migrateWalletsNeon3Step2ButtonLabel: "Avanti",

  migrateWalletsNeon3Step3Title: "Apri NEON 3",
  migrateWalletsNeon3Step3Description: "Ci sei quasi!",
  migrateWalletsNeon3Step3Description2: "Per completare il processo di migrazione, apri NEON 3 e segui le istruzioni.",
  migrateWalletsNeon3Step3AltImage: "Immagine di sfondo per la migrazione dei portafogli",
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
