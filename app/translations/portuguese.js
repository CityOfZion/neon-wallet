// @flow
const INPUTS = {
  inputSelectPlaceholder: 'Selecionar',
  inputPasswordPlaceholder: 'Senha',
  inputEncryptedPlaceholder: 'Chave Privada',
  authPrivateKeyPlaceholder: 'Insira sua chave privada',
  authWatchPlaceholder: 'Insira um endereço do NEO',
}

const VARIOUS_MISSING_TRANSLATIONS = {
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
  priorityTransfer: 'Transferência Prioritária',

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
}

const AUTH = {
  authLogin: 'Login',
  authSaved: 'SALVO',
  authPrivate: 'PRIVADO',
  authEncrypted: 'CRIPTOGRAFADO',
  authWatch: 'OBSERVAR',
  authLedger: 'REGISTRO',
  authCreateWallet: 'Criar Wallet',
  authImportWallet: 'Importar Wallet',
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
  walletCreatedDisclaimer:
    '<b>Salve esses detalhes!</b> Se você perder essas credenciais, você perderá o acesso aos seus ativos. ',
  privateKeyLabel: 'CHAVE PRIVADA',
  encryptedKeyLabel: 'CHAVE CRIPTOGRAFADA',
  addressLabel: 'ENDEREÇO PÚBLICO',
  splitKeyLabel: 'SPLIT KEY',
  recoverWalletLabel: 'RECOVER WALLET',
  print: 'Imprimir',
  generateQrCodes: 'Gerar QR Codes',
  copyCodeImage: 'Copiar QR Code',
}

const DASHBOARD = {
  dashboardBalancePanelLabel: 'Saldo de Tokens',
  dashboardAssetsPanelLabel: 'Moedas do Sistema',
  dashboardAssetsTotal: 'TOTAL',
  dashboardMarketDataLabel: 'Dados do Mercado',
  dashboardValueLabel: 'Valor Total da Wallet',
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
  sidebarSettings: 'Configurações',
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
  manageWalletsEditWalletSave: 'SSalvar Alterações',
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
  receiveRequestTabAssets: 'SOLICITAR ATIVOS',
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
  requestAssetRefPlaceholder: 'Adicionar uma anotação...',
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
    'Selecionar Ativos {transferCount, number} de {25, number} Destinatários',
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
  settingsBackUpLinkLabel: 'FAZER BACKUP DE WALLET',
  settingsBackUpLink: 'EXPORTAR',
  settingsManageLabel: 'Administre sua Neon Wallet',
  settingsCommunity: 'Suporte da Comunidade',
  settingsDonationLink: 'Criado por COZ. Doações:',
}

const NETWORK_SETTINGS = {
  networkSettingsInstructions:
    'Gerenciar configurações da rede relacionadas a como Neon Wallet interage com o blockchain',
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
