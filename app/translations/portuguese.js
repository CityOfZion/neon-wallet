// @flow
const INPUTS = {
  inputSelectPlaceholder: 'Selecionar',
  inputPasswordPlaceholder: 'Senha',
  inputEncryptedPlaceholder: 'Chave Privada',
  authPrivateKeyPlaceholder: 'Endereço NEO',
  authWatchPlaceholder: 'Insira um endereço do NEO',
}

const MISCELLANEOUS = {
  'auth.cancel': 'Cancelar',
  'auth.ledger.connectLedger':
    'Conectar e destravar seu <strong>dispositivo Ledger</strong>',
  'auth.ledger.navigateToNeoApp':
    'Navegar para <strong>aplicativo NEO</strong> em seu dispositivo',
  'auth.ledger.retry': 'Tentar novamente?',
  'auth.ledger.fetchAddress': 'Buscar endereços adicionais',
  publicAddress: 'Endereço Público',
  'auth.import.recoveryInstructions':
    'Enviar aqui um arquivo de recuperação JSON wallet para adicionar suas contas ao Neon. Esta opção também está disponível na página de Configurações.',
  importFile: 'Importar Arquivo',
  dashboardTokenBalancesPrice: 'PREÇO',
  dashboardTokenBalancesHoldings: 'SALDO',
  settingsLanguageLabel: 'IDIOMA',
  addToken: 'Adicionar Token',
  contactsPageLabel: 'Gerenciar Contatos',
  newContact: 'Novo Contato',
  deleteLabel: 'Deletar',

  addToContacts: 'Adicionar aos Contatos',
  contactName: 'Nome',
  enterAContactName: 'Inserir Nome do Contato...',
  enterAWalletAddress: 'Inserir Endereço da Wallet...',
  contactWalletAddress: 'Endereço da Wallet',
  editAContact: 'Editar um Contato',
  modifyDetails: 'Modificar Detalhes',
  removeContact: 'Remover Contato',
  saveContactButtonText: 'Salvar Contato',

  editContactDisclaimer:
    'Por favor, reveja e assegure-se de que inseriu o endereço corretamente para evitar perda de fundos',
  addAContact: 'Adicionar um Contato',
  addContactDetails: 'Adicionar Detalhes do Contato',
  confirmRemoveContact: 'Por favor, confirme a exclusão do contato',
  modalActionConfirm: 'Confirmar',
  modalActionCancel: 'Cancelar',
  newsPageLabel: 'Notícias',
  networkSettingsLabel: 'Configurações da Rede',

  walletManagerNoLocalInfo:
    'Parece que você não tem informações da wallet salvas localmente...',

  walletManagerRemoveWallet: 'Remover Wallet',

  selectAssets: 'Selecionar Ativos',
  priorityTransfer: 'Prioridade',

  editRecipients: 'Editar Destinatários',
  confirmAndSend: 'Confirmar & Enviar',
  fee: 'Taxa:',
  sendMoreAssets: 'Enviar Mais Ativos',
  transactionId: 'ID da Transação:',
  numberofTransactionsPending:
    '{transferCount, number} {transferCount, plural, one {Transferir} other {Transferências}} pendente',

  assetRecipients:
    'Asset {transferCount, plural, one {Destinatário} other {Destinatários}}',
  confirmation: 'Confirmation',
  confirmationRecipient:
    '{transferCount, number} {transferCount, plural, one {Recipient} other {Transfers}}',
  completeExclaim: 'Finalizada!',
  sendQRExplanation:
    // eslint-disable-next-line
    'Então, você recebeu um QR Code? Clique em capturar e segure em frente à sua câmera.',
  captureQR: 'Capturar',
  captureQRCaps: 'CAPTURAR',

  networkConfigTooltipUpdateSettings: 'Atualizar configurações',
  networkConfigTooltipPublicKey: 'CHAVE PÚBLICA:',
  networkConfigTooltipAddress: 'ENDEREÇO:',
  networkConfigTooltipVotedNode: 'Votar em:',
  networkConfigTooltipQuickVote: 'Quickvote',

  noOptionsMessage: 'Sem opções',
  isLoadingMessage: 'Carregando...',

  nothingToSeeHere: 'Nada para ver aqui!',
  noAvailableAssetsToSend: 'Nenhum ativo disponível para enviar',
  sendErrorLabel: 'Erro!',
  automaticNodeSelectionTooltip:
    'Permitir que o NEON escolha um nó automaticamente',
  depositAssets:
    'Deposite ativos <b> compatíveis com a blockchain NEO </b> usando seu endereço:',
  copyAddressTooltip: 'Copiar endereço da carteira',
  walletQrCodes: 'Códigos QR da carteira',

  noClaimableGas: 'O endereço não possui GAS claimable',
  claimTimeDisclaimer: 'Você pode reivindicar o GAS uma vez a cada 5 minutos',
  claimFeeDisclaimerN3:
    'Reivindicar GAS requer pelo menos 0,01120527 GAS para taxas de transação',
  claimFeeGreater: 'Claimable GAS é menor do que as taxas de transação',
  claimUnavailableInWatch:
    'As reivindicações de GAS não estão disponíveis neste modo',
  takeMeBack: 'Me leve de volta',

  splitKeyWalletInstructions:
    'A opção de importação de chave dividida permite que os usuários criem uma nova conta NEO combinando a chave privada de uma conta existente com uma chave privada separada.',
  splitKeyWalletNamePlaceholder:
    'Digite seu novo nome de carteira com chave de divisão...',
  chooseAccount: 'Escolha uma conta existente',
  nextStep: 'Próxima Etapa',
  previousStep: 'Passo anterior',
  privateKey: 'Chave privada',
}

const ERRORS = {
  'errors.contact.nameNull': 'O nome não pode ser nulo.',
  'errors.contact.nameLength': 'O nome é muito longo.',
  'errors.contact.nameDupe': 'Você já tem uma conta salva com esse nome.',
  'errors.contact.invalidAddress': 'O endereço não é válido.',
  'errors.contact.contactExists': 'Você já tem um contato com esse endereço.',
  'errors.password.length': `A senha deve conter pelo menos {PASS_MIN_LENGTH, number} caracteres`,
  'errors.password.match': 'As senhas devem corresponder',
  'errors.request.fractional': `Você não pode solicitar {asset} fracionário.`,
  'errors.request.validDecimals': `Você pode solicitar apenas {asset} até {validDecimals, number} decimais.`,
  'errors.request.max': `Você não pode solicitar mais de 100.000.000 {asset}.`,
  'errors.request.min': `Você não pode solicitar 0 {asset}.`,
  'errors.network.general': 'Opa! Algo deu errado.',
  'errors.encrypt.valid': 'A chave privada não é válida',

  'errors.send.network': 'Ocorreu um erro de rede.',
  'errors.send.balance': `Você não tem saldo suficiente para enviar {total} {asset}.`,
  'errors.send.number': 'O valor deve ser um número.',
  'errors.send.fraction':
    'Você não pode enviar quantidades fracionárias de NEO.',
  'errors.send.negative': `Você não pode enviar valores negativos de {asset}.`,
  'errors.send.zero': `Não é possível enviar 0 {asset}.`,
  'errors.send.decimal': `Você pode enviar apenas {asset} até {decimalCount, number} decimais.`,
  'errors.send.invalidAddress':
    'Você precisa especificar um endereço NEO válido.',
  'errors.send.invalidN3Address':
    'Você precisa especificar um endereço NEO N3 válido.',
  'errors.send.blackListed':
    'O endereço está na lista negra. Este é um endereço de phishing conhecido.',
}

const NOTIFICATIONS = {
  'notifications.success.receivedBlockchainInfo':
    'Recebeu as informações mais recentes sobre blockchain.',
  'notifications.success.accountSaved': 'Conta salva!',
  'notifications.success.updatedWalletName':
    'Nome do portfólio atualizado com sucesso.',
  'notifications.failure.blockchainInfoFailure':
    'Falha ao recuperar as informações da blockchain.',
}

const AUTH = {
  authLogin: 'Login',
  authSaved: 'SALVO',
  authPrivate: 'CHAVE (WIF)',
  authEncrypted: 'CHAVE (NEP-2)',
  authWatch: 'OBSERVAR',
  authLedger: 'HARDWARE',
  authCreateWallet: 'Criar Wallet',
  authImportWallet: 'Importar Wallet',
  authMigrateWallets: "Migrar wallets",
  authScanQRButton: 'Escanear QR Code',
  authLoginButton: 'Login',
  authLedgerFirstStep: 'Conectar e desbloquear seu Registro',
  authLedgerSecondStep: 'Selecionar o aplicativo NEO no seu dispositivo',
  authLedgerAddressLabel: 'ENDEREÇO PÚBLICO',
}

const WALLET_CREATION = {
  createANewWallet: 'Criar Nova Wallet',
  walletCreationInstruction: 'Adicionar Detalhes',
  walletCreationWalletNameLabel: 'NOME DA WALLET',
  walletCreationWalletNamePlaceholder: 'Nome da Wallet',
  walletCreationWalletPasswordLabel: 'Frase secreta',
  walletCreationWalletPasswordPlaceholder: 'Senha',
  walletCreationWalletPasswordConfirmLabel: 'Confirmar senha',
  walletCreationWalletPasswordConfirmPlaceholder: 'Confirmar senha',
  walletCreationButton: 'Criar Wallet',
  walletCreatedHeader: 'Wallet Criada!',
  walletImportedHeader: 'Carteira importada!',
  walletCreatedDisclaimer:
    '<b>Salve esses detalhes!</b> Se você perder essas credenciais, você perderá o acesso aos seus ativos. ',
  privateKeyLabel: 'CHAVE PRIVADA',
  encryptedKeyLabel: 'CHAVE CRIPTOGRAFADA',
  addressLabel: 'ENDEREÇO PÚBLICO',
  splitKeyLabel: 'SPLIT KEY',
  recoverWalletLabel: 'RECUPERAR',
  print: 'Imprimir',
  generateQrCodes: 'Gerar QR Codes',
  copyCodeImage: 'Copiar QR Code',
}

const DASHBOARD = {
  dashboardBalancePanelLabel: 'Saldo de Tokens',
  dashboardAssetsPanelLabel: 'Saldo de Moedas',
  dashboardAssetsTotal: 'TOTAL',
  dashboardMarketDataLabel: 'Dados do Mercado',
  dashboardValueLabel: 'Valor da Wallet',
  dashboardAddressLabel: 'Endereço:',
  dashboardPriceNotAvailable: 'N/A',
  dashboardGasClaimButton: 'Requerer {amount} GAS',
  dashboardManageWallets: 'Gerenciar Wallets',
  dashboardRefresh: 'Recarregar',
  dashboardTokenBalancesToken: 'Token',
  dashboardMarketData1Day: '1 DIA',
  dashboardMarketData1Week: '1 SEMANA',
  dashboardMarketData1Month: '1 MÊS',
}

const SIDEBAR = {
  sidebarWallet: 'Wallet',
  sidebarActivity: 'Atividade',
  sidebarSend: 'Enviar',
  sidebarReceive: 'Receber',
  sidebarContacts: 'Contatos',
  sidebarTokenSale: 'Venda de Tokens',
  sidebarNews: 'Novidades',
  sidebarSettings: 'Definições',
  sidebarLogout: 'Logout',
  sidebarCurrentBlock: 'BLOCO ATUAL',
}

const MANAGE_WALLETS = {
  manageWalletsLabel: 'Administrar Wallets',
  manageWalletsImport: 'Importar',
  manageWalletsCreate: 'Criar',
  manageWalletsEdit: 'Editar',
  manageWalletsEditWallet: 'Editar Wallet',
  manageWalletsEditWalletInstructions: 'Modificar Detalhes',
  manageWalletsEditWalletNameLabel: 'NOME DA WALLET',
  manageWalletsEditWalletNamePlaceholder: 'Nome da Wallet',
  manageWalletsEditWalletAddressLabel: 'ENDEREÇO DA WALLET',
  manageWalletsEditWalletSave: 'Salvar Alterações',
}

const ACTIVITY = {
  activityAddAddress: 'Adicionar',
  activityViewTx: 'Ver',
  activityPageLabel: 'Todas as Atividades',
  activityExport: 'Exportar',
}

const RECEIVE = {
  recieveSelectMethod: 'Selecionar Método de Depósito',
  receiveAssetsAddressLabel: 'Seu Endereço Público',
  receivePageLabel: 'Receber Ativos',
  receiveYourAddressTabLabel: 'SEU ENDEREÇO',
  receiveCopyCodeButton: 'Copiar QR Code',
  receiveDisclaimer:
    'Apenas envie moedas <b>compatíveis com o blockchain NEO (NEO, GAS, etc.)</b>. Enviar outros ativos vai resultar em sua perda permanente.',
  receiveRequestTabAssets: 'SOLICITAR PAGAMENTO',
  recieveWhyUseQRLabel: 'Por que usar um QR Code?',
  receiveQRExplanation:
    '<p>Já enviou ativos para o endereço errado por causa de um erro no caractere do endereço da wallet?</p><p>Se não, sorte a sua - mas acontece com uma frequência assustadora.</p> <p>Aqui na COZ, queremos garantir que as pessoas que te pagam acertem e tenham as informações corretas. Você pode gerar um QR Code na solicitação de ativos e pagamentos, para ajudá-los a te ajudar.</p><p>Todo código que você gerar vai incluir o endereço público da sua wallet, uma quantia e uma referência - todos determinados por você.</p>',
}

const REQUEST_ASSETS = {
  requestAssetLabel: 'ATIVO',
  requestAssetAmountLabel: 'Quantia',
  requestAssetAmount: 'QUANTIA',
  requestAssetDepositLabel: 'DEPOSITAR NESTA WALLET',
  requestAssetRefLabel: 'REFERÊNCIA',
  requestAssetRefPlaceholder: 'Adicionar nota...',
  requestAssetQRButton: 'Gerar QR Code',
  requestAssetYourQRHeader: 'Seu QR Code',
  requestAssetsPaymentDetails: 'DETALHES DA SOLICITAÇÃO DE PAGAMENTO',
  requestAssetsYourQRLabel: 'SEU QR CODE',
  requestAssetsRefLabel: 'REFERÊNCIA',
  requestAssetsAddressLabel: 'ENDEREÇO',
  requestAssetsAmountLabel: 'QUANTIA',
  requestAssetsAssetLabel: 'ATIVO',
}

const TRANSACTION_FEE = {
  transactionFeeQuestion: 'PAGAR TAXA PARA PRIORIZAR SUA TRANSAÇÃO?',
  fast: 'Rápido',
  faster: 'Mais Rápido',
  fastest: 'Muito Rápido',
  sendWithFee:
    'Enviar {itemCount, plural, one {Ativo} other {Ativos}} Com Taxa',
  sendWithoutFee:
    'Enviar {itemCount, plural, one {Ativo} other {Ativos}} Sem Taxa',
  Asset: 'Ativo',
  assets: 'Ativos',
}

const SEND = {
  sendPageLabel: 'Enviar Ativos',
  sendImport: 'Importar',
  sendEnterQRCode: 'Inserir QR Code',
  sendAdd: 'Adicionar Destinatário',
  sendAssetLabel: 'ATIVO',
  sendAmountLabel: 'QUANTIA',
  sendAddressLabel: 'ENDEREÇO DO DESTINATÁRIO',
  sendAddressPlaceholder: 'Inserir wallet ou selecionar contato',
  sendTranfer: 'TRANSFERIR',
  sendMaxAmount: 'MAX',
  sendTransferPlural: 'TRANSFERÊNCIAS',
  sendAsset: 'ativo',
  sendAssets: 'ativos',
  sendRecipient: 'destinatário',
  sendRecipients: 'destinatários',
  sendAssetCapital: 'Ativo',
  sendAssetsCapital: 'Ativos',
  sendRecipientCapital: 'Destinatário',
  sendRecipientsCapital: 'Destinatários',
  sendCompleteNotification:
    'Transação pendente! Seu saldo será atualizado automaticamente assim que o blockchain processar a operação.',
  sendSelectAssets:
    '{transferCount, number} of {maxNumberOfRecipients, number} Destinatários',

  sendTransferMessage:
    '{transferCount, number} {transferCount, plural, one {Transferir} other {Transferências}} pendente',
  sendBroadcasting: 'Transmitindo transação para a rede...',
  sendDisclaimer:
    'Por favor, revise e assegure-se de que inseriu os detalhes corretos para evitar perdas.',
  sendActivityLink:
    'Confira a aba de atividade para acompanhar o status da sua transação.',
  sendCompletion:
    'Finalizado! {transferCount, number} {transferCount, plural, one {sendAsset} other {sendAssets}} para {transferCount, plural, one {sendRecipient} other {sendRecipients}}',
}

const SETTINGS = {
  settingsNetworkConfigLabel: 'CONFIGURÇÃO DA REDE',
  settingCurrencyLabel: 'MOEDA',
  settingsThemeLabel: 'TEMA',
  settingsSoundLabel: 'SOM',
  settingsEncryptLink: 'CRIPTOGRAFE UMA CHAVE',
  recoverWallet: 'RECUPERAR WALLET',
  settingsRecoverWalletLink: 'IMPORTAR',
  settingsBackUpLinkLabel: 'FAZER BACKUP DA WALLET',
  settingsBackUpLink: 'EXPORTAR',
  settingsManageLabel: 'Administre sua Neon Wallet',
  settingsCommunity: 'Suporte da Comunidade',
  settingsDonationLink: 'Criado por COZ. Doações:',
}

const NETWORK_SETTINGS = {
  networkSettingsInstructions:
    'Gerenciar configurações da rede relacionadas a como Neon Wallet interage com o blockchain.',
  networkSettingsNodeSelectLabel: 'SELECIONAR NÓ',
  networkSettingsExplorerLabel: 'BLOCK EXPLORER',
  networkSettingsCurrentLabel: 'REDE ATUAL',
  networkSettingsAutomatic: 'AUTOMÁTICO',
}

const NODE_SELECTION = {
  nodeSelectPanelHeader: 'Seleção de Nó',
  nodeSelectionInstructions:
    'Se você está tendo problemas de performance, tente selecionar um nó personalizado abaixo',
  nodeSelectSelectAutomatically: 'Selecionar automaticamente',
  nodeSelectInfo: 'Top {nodeCount, number} nós listados',
  nodeSelectBlockHeight: 'Altura do Bloco',
}

const ENCRYPT_KEY = {
  encryptPanelHeader: 'Criptografar uma chave',
  encryptInstructions:
    'Escolha uma frase secreta para criptografar chave existente  ',
  encryptStep1Label: '1) INSIRA A CHAVE PRIVADA QUE QUER CRIPTOGRAFAR',
  encryptStep1Placeholder: 'Inserir chave',
  encryptStep2Label: '2) CRIA UMA FRASE SECRETA COMO SENHA',
  encryptStep2Placeholder: 'Inserir frase secreta',
  encryptStep3Label: '3) CONFIRME SUA FRASE SECRETA',
  encryptStep3Placeholder: 'Confirmar frase secreta',
  encryptButton: 'Gerar Chave Criptografada',
}

const TOKEN_SALE = {
  tokenSalePageHeader: 'Participar de Venda de Tokens',
  tokenSaleDisclaimer1:
    'Por favor, leia e tome conhecimento das afirmações para continuar',
  tokenSaleDisclaimer2:
    'Eu compreendo que enviar NEO ou GAS múltiplas vezes pode resultar em perda de fundos ou atrasos, dependendo da política da empresa que está realizando o ICO.',
  tokenSaleDisclaimer3:
    'Eu compreendo que algumas transações podem aceitar apenas NEO ou GAS, e que eu verifiquei qual deles é aceito.',
  tokenSaleDisclaimer4:
    'Eu compreendo que se eu enviar NEO ou GAS para uma venda de tokens que já foi finalizada, eu vou perder meu NEO/GAS e que não serei reembolsado.',
  // eslint-disable-next-line
  tokenSaleDisclaimer5: `Eu compreendo que o COZ não é responsável pelo meu uso dessa funcionalidade e que consultei as licenças desse software.`,
}

const MIGRATE_WALLETS_NEON3 = {
  migrateWalletsNeon3AltImage: "Imagem de Fundo para Migração de Carteiras",
  migrateWalletNeon3Title: "Deseja migrar sua carteira NEON 2 para NEON 3?",
  migrateWalletNeon3Description: "Ao migrar sua carteira, você terá acesso a uma gama mais ampla de ativos suportados e a uma experiência de usuário mais simplificada e aprimorada que facilitará a gestão de seus ativos!",
  migrateWalletNeon3Button: "Migrar Agora!",
};

const MIGRATE_WALLETS_NEON3_STEPS = {
  migrateWalletsNeon3Steps1: "Obter NEON 3",
  migrateWalletsNeon3Steps2: "Exportar suas contas NEON 2",
  migrateWalletsNeon3Steps3: "Abrir NEON 3",

  migrateWalletsNeon3Step1Title: "Obter NEON 3",
  migrateWalletsNeon3Step1Description: "Comece baixando a versão mais recente do NEON e criando sua primeira carteira:",
  migrateWalletsNeon3Step1DownloadButton: "Baixar NEON 3",
  migrateWalletsNeon3Step1NextStep: "Depois que o NEON 3 estiver instalado no seu dispositivo, avance para a próxima etapa.",
  migrateWalletsNeon3Step1ButtonLabel: "Próximo",

  migrateWalletsNeon3Step2Title: "Exportar suas contas NEON 2",
  migrateWalletsNeon3Step2Description: "Exporte o arquivo de migração do NEON 2 para o seu computador. Você usará este arquivo para migrar sua carteira para o NEON 3.",
  migrateWalletsNeon3InputLabel: "Onde você gostaria de salvar seu arquivo de migração?",
  migrateWalletsNeon3Step2BrowseButton: "Procurar...",
  migrateWalletsNeon3Step2NextStep: "Quando você definiu um local para salvar seu arquivo de migração, avance para a próxima etapa.",
  migrateWalletsNeon3Step2ButtonLabel: "Próximo",

  migrateWalletsNeon3Step3Title: "Abrir NEON 3",
  migrateWalletsNeon3Step3Description: "Você está quase lá!",
  migrateWalletsNeon3Step3Description2: "Para concluir o processo de migração, abra o NEON 3 e siga as instruções.",
  migrateWalletsNeon3Step3AltImage: "Imagem de Fundo para Migração de Carteiras",
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
