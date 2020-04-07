// @flow
const INPUTS = {
  inputSelectPlaceholder: '选择',
  inputPasswordPlaceholder: '密码',
  inputEncryptedPlaceholder: '密钥',
  authPrivateKeyPlaceholder: '输入私钥',
  authWatchPlaceholder: '输入账户地址',
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
  authLogin: '登录',
  authSaved: '保存成功',
  authPrivate: '私钥',
  authEncrypted: '密钥',
  authWatch: '观察',
  authLedger: '分类帐',
  authCreateWallet: '生成钱包',
  authImportWallet: '导入钱包文',
  authScanQRButton: '扫描二维码',
  authLoginButton: '登录',
  authLedgerFirstStep: '连接并解锁您的 Ledger',
  authLedgerSecondStep: '导航到 NEO App',
  authLedgerAddressLabel: '公钥',
}

const WALLET_CREATION = {
  createANewWallet: '生成钱包',
  walletCreationInstruction: '输入信息',
  walletCreationWalletNameLabel: '钱包名称',
  walletCreationWalletNamePlaceholder: '钱包名称',
  walletCreationWalletPasswordLabel: '密码',
  walletCreationWalletPasswordPlaceholder: '密码',
  walletCreationWalletPasswordConfirmLabel: '确认密码',
  walletCreationWalletPasswordConfirmPlaceholder: '确认密码',
  walletCreationButton: '生成钱包',
  walletCreatedHeader: '生成钱包成功!',
  walletCreatedDisclaimer:
    '<b>保存这些信息！</b>如果丢失这些凭据，则将失去移动资产的权限。',
  privateKeyLabel: '私钥',
  encryptedKeyLabel: '密钥',
  addressLabel: '账户地址',
  splitKeyLabel: 'SPLIT KEY',
  recoverWalletLabel: 'RECOVER WALLET',
  print: '打印',
  generateQrCodes: '生成二维码',
  copyCodeImage: '复制图片',
}

const DASHBOARD = {
  dashboardBalancePanelLabel: '代币余额',
  dashboardAssetsPanelLabel: '系统资产',
  dashboardAssetsTotal: '总',
  dashboardMarketDataLabel: '市场数据',
  dashboardValueLabel: '总价值',
  dashboardAddressLabel: '账户地址:',
  dashboardPriceNotAvailable: 'N/A',
  dashboardGasClaimButton: '提取 {amount} GAS',
  dashboardManageWallets: '管理钱包',
  dashboardRefresh: '刷新',
  dashboardTokenBalancesToken: '代币',
  dashboardMarketData1Day: '一天',
  dashboardMarketData1Week: '一周',
  dashboardMarketData1Month: '一月',
}

const SIDEBAR = {
  sidebarWallet: '钱包',
  sidebarActivity: '交易活动',
  sidebarSend: '转账',
  sidebarReceive: '接收',
  sidebarContacts: '地址簿',
  sidebarTokenSale: '代币销售',
  sidebarNews: '新闻',
  sidebarSettings: '设定',
  sidebarLogout: '登出',
  sidebarCurrentBlock: '区块数据',
}

const MANAGE_WALLETS = {
  manageWalletsLabel: '월렛 관리',
  manageWalletsImport: '불러오기',
  manageWalletsCreate: '생성',
  manageWalletsEdit: '수정',
  manageWalletsEditWallet: '월렛 수정',
  manageWalletsEditWalletInstructions: '디테일 수정',
  manageWalletsEditWalletNameLabel: '월렛 이름',
  manageWalletsEditWalletNamePlaceholder: '월렛 이름',
  manageWalletsEditWalletAddressLabel: '월렛 주소',
  manageWalletsEditWalletSave: '변경사항 저장',
}

const ACTIVITY = {
  activityAddAddress: '추가',
  activityViewTx: '보기',
  activityPageLabel: '활동',
  activityExport: '내보내기',
}

const RECEIVE = {
  recieveSelectMethod: '选择存款方式',
  receiveAssetsAddressLabel: '你的账户地址',
  receivePageLabel: '接收资产',
  receiveYourAddressTabLabel: '你的账户地址',
  receiveCopyCodeButton: '复制图片',
  receiveDisclaimer:
    '仅发送与<b>与NEO区块链兼容的资产（NEO，GAS等）</ b>。发送其他资产将导致永久损失',
  receiveRequestTabAssets: '要求资产',
  recieveWhyUseQRLabel: '为什么要使用QR码？',
  receiveQRExplanation:
    '<p>是否由于钱包地址中的字符错误而将资产发送到了错误的地址？</ p> <p>如果没有，那么幸运吗？但是这种情况经常会令人恐惧。</ p> <p>在COZ ，我们希望确保付款的人输入正确的交易资料。您可以生成一个QR码来请求资产。</ p> <p>您生成的每个代码都将包括您的公共钱包地址，资产金额和参考信息-全部由您设置。</ p>',
}

const REQUEST_ASSETS = {
  requestAssetLabel: '资产',
  requestAssetAmountLabel: '数量',
  requestAssetAmount: '数量',
  requestAssetDepositLabel: '接收地址',
  requestAssetRefLabel: '参考',
  requestAssetRefPlaceholder: '添加注释...',
  requestAssetQRButton: '生成QR码',
  requestAssetYourQRHeader: '您的QR码',
  requestAssetsPaymentDetails: '交易明细',
  requestAssetsYourQRLabel: '您的QR码',
  requestAssetsRefLabel: '参考',
  requestAssetsAddressLabel: '地址',
  requestAssetsAmountLabel: '数量',
  requestAssetsAssetLabel: '资产',
}

const TRANSACTION_FEE = {
  transactionFeeQuestion: '使用优先费用进行交易？',
  fast: '快速',
  faster: '更快',
  fastest: '最快',
  sendWithFee: '发送 {itemCount, plural, one {资产} other {资产}} (加优先费)',
  sendWithoutFee: '发送 {itemCount, plural, one {资产} other {资产}} (不加费)',
  Asset: '资产',
  assets: '资产',
}

const SEND = {
  sendPageLabel: '发送资产',
  sendImport: '导入',
  sendEnterQRCode: '输入QR码',
  sendAdd: '加接受者',
  sendAssetLabel: '资产',
  sendAmountLabel: '数量',
  sendAddressLabel: '接受地址',
  sendAddressPlaceholder: '添加钱包或选择联系人',
  sendTranfer: '转账',
  sendMaxAmount: '最大值',
  sendTransferPlural: '交易记录',
  sendAsset: '资产',
  sendAssets: '资产',
  sendRecipient: '接受者',
  sendRecipients: '接受者',
  sendAssetCapital: '资产',
  sendAssetsCapital: '资产',
  sendRecipientCapital: '接受者',
  sendRecipientsCapital: '接受者',
  sendCompleteNotification: '交易待处理！您的余额将在区块链处理完后自动更新.',
  sendSelectAssets:
    '选择资产 {transferCount, number} / {maxNumberOfRecipients, number} 接受者',
  sendTransferMessage:
    '{transferCount, number} {transferCount, plural, one {sendTransfer} other {sendTransferPlural}} 待定',
  sendBroadcasting: '正在将交易广播到网络...',
  sendDisclaimer: '请检查并确保您输入了正确的详细信息，以避免资金损失.',
  sendActivityLink: '检查活动标签以查看交易状态.',
  sendCompletion:
    '成功！ {transferCount, number} {transferCount, plural, one {sendAsset} other {sendAssets}} 转给 {transferCount, plural, one {sendRecipient} other {sendRecipients}}',
}

const SETTINGS = {
  settingsNetworkConfigLabel: '网络设置',
  settingCurrencyLabel: '货币',
  settingsThemeLabel: '主题',
  settingsSoundLabel: '声音',
  settingsEncryptLink: '加密',
  recoverWallet: '恢复钱包',
  settingsRecoverWalletLink: '导入',
  settingsBackUpLinkLabel: '后备钱包',
  settingsBackUpLink: '导出',
  settingsManageLabel: '管理',
  settingsCommunity: '社区支持',
  settingsDonationLink: '由COZ创建。捐赠：',
}

const NETWORK_SETTINGS = {
  networkSettingsInstructions: '管理网络设置',
  networkSettingsNodeSelectLabel: '节点选择',
  networkSettingsExplorerLabel: '区块浏览器',
  networkSettingsCurrentLabel: '当前网络',
  networkSettingsAutomatic: '自动',
}

const NODE_SELECTION = {
  nodeSelectPanelHeader: '节点选择',
  nodeSelectionInstructions: '如果遇到问题，请尝试在下面选择一个节点',
  nodeSelectSelectAutomatically: '自动选择',
  nodeSelectInfo: '前{nodeCount, number}个节点',
  nodeSelectBlockHeight: '区块高度',
}

const ENCRYPT_KEY = {
  encryptPanelHeader: '加密',
  encryptInstructions: '输入密码',
  encryptStep1Label: '输入私钥',
  encryptStep1Placeholder: '输入私钥',
  encryptStep2Label: '选择密码',
  encryptStep2Placeholder: '输入密码',
  encryptStep3Label: '确认密码',
  encryptStep3Placeholder: '确认密码',
  encryptButton: '生成密钥',
}

const TOKEN_SALE = {
  tokenSalePageHeader: '参加代币销售',
  tokenSaleDisclaimer1: '请阅读并确认这些声明以继续',
  tokenSaleDiclaimer2:
    '我了解，根据ICO公司的政策，多次提交NEO或GAS可能会导致资金损失或退款延迟.',
  tokenSaleDisclaimer3: '我了解某些销售可能仅接受NEO或GAS，并且我已确认接受了.',
  tokenSaleDisclaimer4:
    '我了解，如果我将NEO或GAS发送到已经结束的代币销售中，我将丢失NEO / GAS，并且不会退款',
  // eslint-disable-next-line
  tokenSaleDiclaimer5:
    '我了解COZ对使用此功能不承担任何责任，并且我已经查阅了此软件的许可证.',
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
