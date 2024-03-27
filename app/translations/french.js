const INPUTS = {
  inputSelectPlaceholder: 'Sélectionner',
  inputPasswordPlaceholder: 'Mot de passe',
  inputEncryptedPlaceholder: 'Clé chiffrée',
  authPrivateKeyPlaceholder: 'Entrer votre clé privée ici',
  authWatchPlaceholder: 'Entrer une adresse NEO ici',
}

const MISCELLANEOUS = {
  'auth.cancel': 'Annuler',
  'auth.ledger.connectLedger':
    'Connecter et déverouiller votre <strong>Ledger</strong>',
  'auth.ledger.navigateToNeoApp': `Sélectionner <strong>l'application NEO</strong> sur votre périphérique`,
  'auth.ledger.retry': 'Réessayer?',
  'auth.ledger.fetchAddress': 'Récupérer adresses additionnelles',
  publicAddress: 'Adresse Publique',
  'auth.import.recoveryInstructions':
    'Uploader un portefeuille sauvegardé au format JSON ici pour ajouter vos comptes à Neon. Cette option est aussi disponible dans la page des Paramètres.',
  importFile: 'Importer Fichier',
  dashboardTokenBalancesPrice: 'PRIX',
  dashboardTokenBalancesHoldings: 'ACTIFS',
  settingsLanguageLabel: 'LANGUE',
  addToken: 'Ajouter Jeton',
  contactsPageLabel: 'Gérer Contacts',
  newContact: 'Nouveau Contact',
  deleteLabel: 'Supprimer',

  addToContacts: 'Ajouter aux contacts',
  contactName: 'Nom',
  enterAContactName: 'Entrer le nom du contact...',
  enterAWalletAddress: `Entrer l'adresse du portefeuille...`,
  contactWalletAddress: 'Adresse du portefeuille',
  editAContact: 'Editer Contact',
  modifyDetails: 'Modifier Détails',
  removeContact: 'Supprimer Contact',
  saveContactButtonText: 'Sauvegarder Contact',

  editContactDisclaimer: `Vérifier et assurez-vous que vous avez entré l'adresse correctement pour éviter de risquer une perte de fonds`,
  addAContact: 'Ajouter un Contact',
  addContactDetails: 'Ajouter des détails à un contact',
  confirmRemoveContact: 'Confirmer la suppression du contact',
  modalActionConfirm: 'Confirmer',
  modalActionCancel: 'Annuler',
  newsPageLabel: 'Actualités',
  networkSettingsLabel: 'Paramètres réseau',

  walletManagerNoLocalInfo: `Il semble que vous n'ayez pas d'information de portefeuille sauvegardé localement...`,

  walletManagerRemoveWallet: 'Supprimer portefeuille',

  selectAssets: 'Sélectionner Actifs',
  priorityTransfer: 'Priorité',

  editRecipients: 'Editer Destinataires',
  confirmAndSend: 'Confirmer & Envoyer',
  fee: 'Frais:',
  sendMoreAssets: `Envoyer plus d'actifs`,
  transactionId: 'ID de transaction:',
  numberofTransactionsPending:
    '{transferCount, number} {transferCount, plural, one {Transfert} other {Transferts}} pending',
  assetRecipients:
    'Asset {transferCount, plural, one {Destinataire} other {Destinataires}}',
  confirmation: 'Confirmation',
  confirmationRecipient:
    '{transferCount, number} {transferCount, plural, one {Recipient} other {Transfers}}',
  completeExclaim: 'Terminé!',
  sendQRExplanation:
    // eslint-disable-next-line
    'On vous a donné un code QR? Cliquer sur capturer et tener le en façe de la caméra.',
  captureQR: 'Capturer',
  captureQRCaps: 'CAPTURER',

  networkConfigTooltipUpdateSettings: 'Mise à jour',
  networkConfigTooltipPublicKey: 'CLÉ PUBLIQUE:',
  networkConfigTooltipAddress: 'ADRESSE:',
  networkConfigTooltipVotedNode: 'VOTER POUR :',
  networkConfigTooltipQuickVote: 'Quickvote',

  noOptionsMessage: 'Aucune option',
  isLoadingMessage: 'Chargement...',

  nothingToSeeHere: 'Rien à voir ici!',
  noAvailableAssetsToSend: 'Aucun élément disponible à envoyer',
  sendErrorLabel: 'Erreur!',
  automaticNodeSelectionTooltip:
    'Autoriser NEON à choisir un nœud automatiquement',
  depositAssets:
    'Déposez des actifs <b> compatibles avec la blockchain NEO </b> en utilisant votre adresse:',
  copyAddressTooltip: `Copier l'adresse du portefeuille`,
  walletQrCodes: 'Codes QR pour portefeuille',
  noClaimableGas: `L'adresse n'a pas de GAS réclamable`,
  claimTimeDisclaimer:
    'Vous pouvez réclamer le GAS une fois toutes les 5 minutes',
  claimFeeDisclaimerN3:
    'La demande de GAS nécessite au moins 0,01120527 GAS pour les frais de transaction',
  claimFeeGreater: 'Le GAS réclamable est inférieur aux frais de transaction',
  claimUnavailableInWatch: `Les réclamations GAS ne sont pas disponibles en mode montre`,
  takeMeBack: 'Reprends moi',
  splitKeyWalletInstructions: `L'option d'importation Split Key permet aux utilisateurs de créer un nouveau compte NEO en combinant la clé privée d'un compte existant avec une clé privée distincte.`,
  splitKeyWalletNamePlaceholder:
    'Saisissez le nouveau nom de votre portefeuille à clé partagée...',
  chooseAccount: 'Choisissez un compte existant',
  nextStep: `L'étape suivante`,
  previousStep: `Étape précédente`,
  privateKey: 'Clé privée',
}

const ERRORS = {
  'errors.contact.nameNull': 'Le nom ne peut pas être nul.',
  'errors.contact.nameLength': 'Le nom est trop long.',
  'errors.contact.nameDupe': 'Vous avez déjà un compte enregistré avec ce nom.',
  'errors.contact.invalidAddress': `L'adresse n'est pas valide.`,
  'errors.contact.contactExists':
    'Vous avez déjà un contact avec cette adresse.',
  'errors.password.length': `La phrase secrète doit contenir au moins {PASS_MIN_LENGTH, number} caractères`,
  'errors.password.match': 'Les mots de passe doivent correspondre',
  'errors.request.fractional': `Vous ne pouvez pas demander un {asset} fractionné.`,
  'errors.request.validDecimals': `Vous ne pouvez demander que {asset} jusqu'à {validDecimals, number} décimales.`,
  'errors.request.max': `Vous ne pouvez pas demander plus de 100 000 000 {élément}.`,
  'errors.request.min': `Vous ne pouvez pas demander 0 {asset}.`,
  'errors.network.general': 'Oops! Quelque chose a mal tourné.',
  'errors.encrypt.valid': `La clé privée n'est pas valide`,

  'errors.send.network': `Une erreur réseau s'est produite`,
  'errors.send.balance': `Vous n'avez pas suffisamment de solde pour envoyer {total} {asset}.`,
  'errors.send.number': 'Le montant doit être un nombre.',
  'errors.send.fraction': 'Vous ne pouvez pas envoyer de fractions de NEO.',
  'errors.send.negative': `Vous ne pouvez pas envoyer de montants négatifs de {asset}.`,
  'errors.send.zero': `Impossible d'envoyer 0 {asset}.`,
  'errors.send.decimal': `Vous ne pouvez envoyer que {asset} jusqu'à {decimalCount, number} décimales.`,
  'errors.send.invalidAddress': 'Vous devez spécifier une adresse NEO valide.',
  'errors.send.invalidN3Address':
    'Vous devez spécifier une adresse NEO N3 valide.',
  'errors.send.blackListed': `L'adresse est sur liste noire. Il s'agit d'une adresse de phishing connue.`,
}

const NOTIFICATIONS = {
  'notifications.success.receivedBlockchainInfo':
    'Reçu les dernières informations sur la blockchain.',
  'notifications.success.accountSaved': 'Compte enregistré!',
  'notifications.success.updatedWalletName':
    'Nom du portefeuille mis à jour avec succès.',
  'notifications.failure.blockchainInfoFailure':
    'Échec de la récupération des informations de la chaîne de blocs.',
}

const AUTH = {
  authLogin: 'Connexion',
  authSaved: 'SAUVÉ',
  authPrivate: 'CLÉ PRIVÉE',
  authEncrypted: 'CLÉ CHIFFRÉE',
  authWatch: 'VISUALISER',
  authLedger: 'LEDGER',
  authCreateWallet: 'Créer portefeuille',
  authImportWallet: 'Importer portefeuille',
  authMigrateWallets: "Migrer les portefeuilles",
  authScanQRButton: 'Scanner code QR',
  authLoginButton: 'Connexion',
  authLedgerFirstStep: 'Connecter et déverouiller votre Ledger',
  authLedgerSecondStep: 'Sélectionner l`application NEO sur votre périphérique',
  authLedgerAddressLabel: 'ADRESSE PUBLIQUE',
}

const WALLET_CREATION = {
  createANewWallet: 'Créer nouveau portefeuille',
  walletCreationInstruction: 'Entrer détails',
  walletCreationWalletNameLabel: 'NOM DU PORTEFEUILLE',
  walletCreationWalletNamePlaceholder: 'Nom du portefeuille',
  walletCreationWalletPasswordLabel: 'Phrase secrète',
  walletCreationWalletPasswordPlaceholder: 'Mot de passe',
  walletCreationWalletPasswordConfirmLabel: 'Confirmer mot de passe',
  walletCreationWalletPasswordConfirmPlaceholder: 'Confirmer mot de passe',
  walletCreationButton: 'Créer portefeuille',
  walletCreatedHeader: 'Portefeuille créé!',
  walletImportedHeader: 'Portefeuille importé!',
  walletCreatedDisclaimer:
    '<b>Sauvegarder ces détails !</b> Si vous perdez ces identifiants, vous perdrez l`accès à vos actifs.',
  privateKeyLabel: 'CLÉ PRIVÉE',
  encryptedKeyLabel: 'CLÉ CHIFFRÉE',
  addressLabel: 'ADRESSE PUBLIQUE',
  splitKeyLabel: 'DIVISÉ CLÉ',
  recoverWalletLabel: 'RÉCUPÉRATION',
  print: 'Imprimer',
  generateQrCodes: 'Générer codes QR',
  copyCodeImage: 'Copier le code QR',
}

const DASHBOARD = {
  dashboardBalancePanelLabel: 'Solde de jetons',
  dashboardAssetsPanelLabel: 'Actifs systèmes',
  dashboardAssetsTotal: 'TOTAL',
  dashboardMarketDataLabel: 'Données du marché',
  dashboardValueLabel: 'Valeur totale du portefeuille',
  dashboardAddressLabel: 'Adresse:',
  dashboardPriceNotAvailable: 'N/A',
  dashboardGasClaimButton: 'Réclamer {amount} GAS',
  dashboardManageWallets: 'Gérer portefeuilles',
  dashboardRefresh: 'Rafraîchir',
  dashboardTokenBalancesToken: 'Jeton',
  dashboardMarketData1Day: '1 JOUR',
  dashboardMarketData1Week: '1 SEMAINE',
  dashboardMarketData1Month: '1 MOIS',
}

const SIDEBAR = {
  sidebarWallet: 'Portefeuille',
  sidebarActivity: 'Activité',
  sidebarSend: 'Envoyer',
  sidebarReceive: 'Recevoir',
  sidebarContacts: 'Contacts',
  sidebarTokenSale: 'Vente de jetons',
  sidebarNews: 'Actualités',
  sidebarSettings: 'Paramètres',
  sidebarLogout: 'Déconnexion',
  sidebarCurrentBlock: 'BLOC ACTUEL',
}

const MANAGE_WALLETS = {
  manageWalletsLabel: 'Gérer portefeuilles',
  manageWalletsImport: 'Importer',
  manageWalletsCreate: 'Créer',
  manageWalletsEdit: 'Éditer',
  manageWalletsEditWallet: 'Éditer portefeuille',
  manageWalletsEditWalletInstructions: 'Modifier détails',
  manageWalletsEditWalletNameLabel: 'NOM DU PORTEFEUILLE',
  manageWalletsEditWalletNamePlaceholder: 'Nom du portefeuille',
  manageWalletsEditWalletAddressLabel: 'ADRESSE DU PORTEFEUILLE',
  manageWalletsEditWalletSave: 'Sauvegarder changements',
}

const ACTIVITY = {
  activityAddAddress: 'Ajouter',
  activityViewTx: 'Voir',
  activityPageLabel: 'Toute les activités',
  activityExport: 'Exporter',
}

const RECEIVE = {
  recieveSelectMethod: 'Sélectionner la méthode de dépôt',
  receiveAssetsAddressLabel: 'Votre adresse publique',
  receivePageLabel: 'Recevoir des actifs',
  receiveYourAddressTabLabel: 'VOTRE ADRESSE',
  receiveCopyCodeButton: 'Copier le code QR',
  receiveDisclaimer:
    'N`envoyer que des actifs qui sont <b>compatibles avec la blockchain NEO (NEO, GAS, etc.)</b>. Envoyer d`autres types d`actifs résultera en leur perte.',
  receiveRequestTabAssets: 'DEMANDER DES ACTIFS',
  recieveWhyUseQRLabel: 'Pourquoi utiliser un code QR ?',
  receiveQRExplanation:
    '<p>Déjà envoyé des actifs à la mauvaise adresse à cause d`un mauvais caractère dans l`adresse du portefeuille ?</p><p>Si non, vous êtes chanceux - mais cela arrive regulièrement.</p><p>Ici à COZ, nous voulons nous assurer que les gens qui vous paient ont les détails corrects. Vous pouvez générer un code QR pour demander des actifs pour leur simplifier la tâche.</p><p>Chaque code que vous générez inclura votre adresse de portefeuille, une quantité d`actifs ainsi qu`une référence - tous ces paramètres étant définis par vous-même.',
}

const REQUEST_ASSETS = {
  requestAssetLabel: 'ACTIF',
  requestAssetAmountLabel: 'Montant',
  requestAssetAmount: 'MONTANT',
  requestAssetDepositLabel: 'DÉPOSER DANS CE PORTEFEUILLE',
  requestAssetRefLabel: 'RÉFÉRENCE',
  requestAssetRefPlaceholder: 'Ajouter une note...',
  requestAssetQRButton: 'Générer code QR',
  requestAssetYourQRHeader: 'Votre code QR',
  requestAssetsPaymentDetails: 'DÉTAILS DE LA DEMANDE DE PAIEMENT',
  requestAssetsYourQRLabel: 'VOTRE CODE QR',
  requestAssetsRefLabel: 'RÉFÉRENCE',
  requestAssetsAddressLabel: 'ADRESSE',
  requestAssetsAmountLabel: 'MONTANT',
  requestAssetsAssetLabel: 'ACTIF',
}

const TRANSACTION_FEE = {
  transactionFeeQuestion: 'Prioriser votre transaction avec des frais ?',
  fast: 'Rapide',
  faster: 'Plus rapide',
  fastest: 'Tres rapide',
  sendWithFee:
    'Envoyer {itemCount, plural, one {Actif} other {Actifs}} Avec Des Drais',
  sendWithoutFee:
    'Envoyer {itemCount, plural, one {Actif} other {Actifs}} Sans Frais',
  asset: 'Actif',
  assets: 'Actifs',
}

const SEND = {
  sendPageLabel: 'Envoyer des actifs',
  sendImport: 'Importer',
  sendEnterQRCode: 'Entrer code QR',
  sendAdd: 'Ajouter destinataire',
  sendAssetLabel: 'ACTIF',
  sendAmountLabel: 'MONTANT',
  sendAddressLabel: 'ADRESSE DU DESTINATAIRE',
  sendAddressPlaceholder: 'Ajouter portefeuille ou sélectionner contact',
  sendTranfer: 'TRANSFÉRER',
  sendMaxAmount: 'MAX',
  sendTransferPlural: 'TRANSFERTS',
  sendAsset: 'actif',
  sendAssets: 'actifs',
  sendRecipient: 'destinataire',
  sendRecipients: 'destinataires',
  sendAssetCapital: 'Actif',
  sendAssetsCapital: 'Actifs',
  sendRecipientCapital: 'Destinataire',
  sendRecipientsCapital: 'Destinataires',
  sendCompleteNotification:
    'Transaction en attente ! Votre solde sera automatiquement mise a jour lorsque la blockchain l`aura traitée.',
  sendSelectAssets:
    'Sélectionner actifs {transferCount, number} de {maxNumberOfRecipients, number} destinataires',
  sendTransferMessage:
    '{transferCount, number} {transferCount, plural, one {sendTransfer} other {sendTransferPlural}} en attente',
  sendBroadcasting: 'Diffusion de la transaction vers le réseau...',
  sendDisclaimer:
    'Veuillez vérifier et vous assurer d`avoir entré les détails corrects pour éviter une perte des fonds.',
  sendActivityLink:
    'Vérifier le statut de votre transaction dans l`onglet activité.',
  sendCompletion:
    'Terminé ! {transferCount, number} {transferCount, plural, one {sendAsset} other {sendAssets}} à {transferCount, plural, one {sendRecipient} other {sendRecipients}}',
}

const SETTINGS = {
  settingsNetworkConfigLabel: 'CONFIGURATION RÉSEAU',
  settingCurrencyLabel: 'MONNAIE',
  settingsThemeLabel: 'THÈME',
  settingsSoundLabel: 'SON',
  settingsEncryptLink: 'CHIFFRER UNE CLÉ',
  recoverWallet: 'RESTAURER UN PORTEFEUILLE',
  settingsRecoverWalletLink: 'IMPORTER',
  settingsBackUpLinkLabel: 'SAUVEGARDER PORTEFEUILLE',
  settingsBackUpLink: 'EXPORTER',
  settingsManageLabel: 'Gérer votre portefeuille Neon',
  settingsCommunity: 'Support communautaire',
  settingsDonationLink:
    'Créé par COZ. Donations: Adr3XjZ5QDzVJrWvzmsTTchpLRRGSzgS5A',
}

const NETWORK_SETTINGS = {
  networkSettingsInstructions:
    'Gérer tous les paramètres réseaux relatifs a l`interaction de Neon avec la blockchain',
  networkSettingsNodeSelectLabel: 'SÉLECTION DE NŒUDS',
  networkSettingsExplorerLabel: 'EXPLORATEUR DE BLOCS',
  networkSettingsCurrentLabel: 'RÉSEAU ACTUEL',
  networkSettingsAutomatic: 'AUTOMATIQUE',
}

const NODE_SELECTION = {
  nodeSelectPanelHeader: 'Sélection de noeuds',
  nodeSelectionInstructions:
    'Si vous rencontrez des problèmes de performance, essayer de sélectionner un noeud personalisé ci-dessous',
  nodeSelectSelectAutomatically: 'Sélectionner automatiquement',
  nodeSelectInfo: 'Top {nodeCount, number} noeuds listés',
  nodeSelectBlockHeight: 'Hauteur de bloc',
}

const ENCRYPT_KEY = {
  encryptPanelHeader: 'Chiffrer une clé',
  encryptInstructions:
    'Choisisser une phrase secrète pour chiffrer une clé existante',
  encryptStep1Label: '1) ENTRER LA CLÉ PRIVÉE QUE VOUS SOUHAITEZ CHIFFRER',
  encryptStep1Placeholder: 'Entrer la clé',
  encryptStep2Label: '2) CRÉER UNE PHRASE SECRÈTE',
  encryptStep2Placeholder: 'Entrer phrase secrète',
  encryptStep3Label: '3) CONFIRMER LA PHRASE SECRÈTE',
  encryptStep3Placeholder: 'Confirmer phrase secrète',
  encryptButton: 'Générer clé chiffrée',
}

const TOKEN_SALE = {
  tokenSalePageHeader: 'Participer à une vente de jetons',
  tokenSaleDisclaimer1:
    'Veuillez lire et approuver ces conditions pour continuer',
  tokenSaleDisclaimer2:
    'Je comprends que soumettre NEO our GAS à de multiples reprises peut entraîner une perte de fonds ou un remboursement retardé, dépendamment de la politique de l`ICO.',
  tokenSaleDisclaimer3:
    'Je comprends que certaines ventes peuvent n`accepter que NEO ou GAS et j`ai verifié ce qui etait accepté.',
  tokenSaleDisclaimer4:
    'Je comprends que si j`envoie NEO ou GAS à une vente de jetons qui s`est dejà terminée, je perdrai mes NEO/GAS et ne serait pas remboursé.',
  // eslint-disable-next-line
  tokenSaleDisclaimer5: `Je comprends que COZ n'est pas responsable de mon utilisation de cette fonctionalité et jai verifié les licenses de ce logiciel.`,
}

const MIGRATE_WALLETS_NEON3 = {
  migrateWalletsNeon3AltImage: "Image de fond de migration des portefeuilles",
  migrateWalletNeon3Title: "Voulez-vous migrer votre portefeuille NEON 2 vers NEON 3 ?",
  migrateWalletNeon3Description: "La migration de votre portefeuille vous donnera accès à un éventail plus large d'actifs pris en charge, ainsi qu'à une expérience utilisateur plus fluide et améliorée qui facilitera la gestion de vos actifs !",
  migrateWalletNeon3Button: "Migrer maintenant !",
};

const MIGRATE_WALLETS_NEON3_STEPS = {
  migrateWalletsNeon3Steps1: "Obtenez NEON 3",
  migrateWalletsNeon3Steps2: "Exportez vos comptes NEON 2",
  migrateWalletsNeon3Steps3: "Ouvrez NEON 3",

  migrateWalletsNeon3Step1Title: "Obtenez NEON 3",
  migrateWalletsNeon3Step1Description: "Commencez par télécharger la dernière version de NEON et créez votre premier portefeuille :",
  migrateWalletsNeon3Step1DownloadButton: "Télécharger NEON 3",
  migrateWalletsNeon3Step1NextStep: "Une fois NEON 3 installé sur votre appareil, passez à l'étape suivante.",
  migrateWalletsNeon3Step1ButtonLabel: "Suivant",

  migrateWalletsNeon3Step2Title: "Exportez vos comptes NEON 2",
  migrateWalletsNeon3Step2Description: "Exportez le fichier de migration NEON 2 sur votre ordinateur. Vous utiliserez ce fichier pour migrer votre portefeuille vers NEON 3.",
  migrateWalletsNeon3InputLabel: "Où souhaitez-vous enregistrer votre fichier de migration ?",
  migrateWalletsNeon3Step2BrowseButton: "Parcourir...",
  migrateWalletsNeon3Step2NextStep: "Lorsque vous avez défini un emplacement pour enregistrer votre fichier de migration, passez à l'étape suivante.",
  migrateWalletsNeon3Step2ButtonLabel: "Suivant",

  migrateWalletsNeon3Step3Title: "Ouvrez NEON 3",
  migrateWalletsNeon3Step3Description: "Vous y êtes presque !",
  migrateWalletsNeon3Step3Description2: "Pour finaliser le processus de migration, ouvrez NEON 3 et suivez les instructions.",
  migrateWalletsNeon3Step3AltImage: "Image de fond de migration des portefeuilles",
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
