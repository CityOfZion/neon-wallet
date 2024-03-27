// @flow
const INPUTS = {
  inputSelectPlaceholder: '选择',
  inputPasswordPlaceholder: '密码',
  inputEncryptedPlaceholder: '密钥',
  authPrivateKeyPlaceholder: '输入私钥',
  authWatchPlaceholder: '输入账户地址',
}

const MISCELLANEOUS = {
  'auth.cancel': '取消',
  'auth.ledger.connectLedger': '连接并解锁您的分类帐设备',
  'auth.ledger.navigateToNeoApp': '导航到设备上的NEO应用',
  'auth.ledger.retry': '重试?',
  'auth.ledger.fetchAddress': '获取其他地址',
  publicAddress: '公开地址',
  'auth.import.recoveryInstructions':
    '在此处上传JSON钱包恢复文件，以将您的帐户添加到Neon。此选项在“设置”页面上也可用。',
  importFile: '导入文件',
  dashboardTokenBalancesPrice: '价钱',
  dashboardTokenBalancesHoldings: '控股',
  settingsLanguageLabel: '语言',
  addToken: '添加令牌',
  contactsPageLabel: '管理联络人',
  newContact: '新联系人',
  deleteLabel: '删除',

  addToContacts: '添加到通讯录',
  contactName: '名称',
  enterAContactName: '输入联系人姓名...',
  enterAWalletAddress: '输入电子钱包地址...',
  contactWalletAddress: 'W钱包地址',
  editAContact: '编辑联系人',
  modifyDetails: '修改详细资料',
  removeContact: '移除联系人',
  saveContactButtonText: '储存联络人',

  editContactDisclaimer: '请检查并确保您正确输入了地址，以免造成资金损失',
  addAContact: '添加联系人',
  addContactDetails: '添加联系方式',
  confirmRemoveContact: '请确认删除联系人',
  modalActionConfirm: '确认',
  modalActionCancel: '取消',
  newsPageLabel: '新闻',
  networkSettingsLabel: '网络设置',

  walletManagerNoLocalInfo: '您似乎没有本地保存的钱包信息...',

  walletManagerRemoveWallet: '删除钱包',

  selectAssets: '选择资产',
  priorityTransfer: '优先转移',

  editRecipients: '编辑收件人',
  confirmAndSend: '确认并发送',
  fee: '费用:',
  sendMoreAssets: '发送更多资产',
  transactionId: '交易编号:',
  numberofTransactionsPending:
    '{transferCount, number} {transferCount, plural, one {Transfer} other {Transfers}} pending',
  assetRecipients:
    'Asset {transferCount, plural, one {Recipient} other {Recipients}}',
  confirmation: '确认书',
  confirmationRecipient:
    '{transferCount, number} {transferCount, plural, one {Recipient} other {Transfers}}',
  completeExclaim: '完成!',
  sendQRExplanation:
    // eslint-disable-next-line
    '因此，您已获得QR码？单击捕获并将其保持在相机上.',
  captureQR: '捕获',
  captureQRCaps: '捕获',

  networkConfigTooltipUpdateSettings: '更新设定',
  networkConfigTooltipPublicKey: '公钥:',
  networkConfigTooltipAddress: '地址:',
  networkConfigTooltipVotedNode: '投票给：',
  networkConfigTooltipQuickVote: 'Quickvote',

  noOptionsMessage: '没有选择',
  isLoadingMessage: '载入中...',

  nothingToSeeHere: '這沒東西看!',
  noAvailableAssetsToSend: '没有可用资产发送',
  sendErrorLabel: '错误!',
  automaticNodeSelectionTooltip: '允许NEON自动选择节点',
  depositAssets: '使用您的地址存款与NEO区块链兼容的资产:',
  copyAddressTooltip: '复制钱包地址',
  walletQrCodes: '钱包QR码',
  // TODO: implement all
  noClaimableGas: '地址没有可声明的GAS',
  claimTimeDisclaimer: '您可以每5分钟申请一次GAS',
  claimFeeDisclaimerN3: '申领 GAS 需要至少 0.01120527 GAS 来支付交易费用',
  claimFeeGreater: '可索取的 GAS 低于交易费用',
  claimUnavailableInWatch: 'GAS声明在“监视”模式下不可用',
  takeMeBack: '带我回去',
  splitKeyWalletInstructions:
    '拆分密钥导入选项允许用户通过将现有帐户的私钥与单独的私钥组合来创建新的NEO帐户.',
  splitKeyWalletNamePlaceholder: '输入新的拆分密钥钱包名称...',
  chooseAccount: '选择一个现有帐户',
  nextStep: '下一步',
  previousStep: '前一步',
  privateKey: '私钥',
}

const ERRORS = {
  'errors.contact.nameNull': '名称不能为空.',
  'errors.contact.nameLength': '名字太长.',
  'errors.contact.nameDupe': '您已经用该名称保存了一个帐户.',
  'errors.contact.invalidAddress': '地址无效.',
  'errors.contact.contactExists': '您已经有该地址的联系人.',
  'errors.password.length': `密码短语必须至少包含{PASS_MIN_LENGTH，number}个字符`,
  'errors.password.match': '密码必须匹配',
  'errors.request.fractional': `您可以请求分数{asset}.`,
  'errors.request.validDecimals': `您最多只能请求{asset}个{validDecimals，number}个小数.`,
  'errors.request.max': `您所要求的{asset}不能超过100,000,000.`,
  'errors.request.min': `您不能请求0 {asset}.`,
  'errors.network.general': '糟糕！出问题了...',
  'errors.encrypt.valid': '私钥无效.',

  'errors.send.balance': `您的余额不足，无法发送{total} {asset}.`,
  'errors.send.network': '发生网络错误',
  'errors.send.number': '金额必须是数字.',
  'errors.send.fraction': '您不能发送少量的NEO.',
  'errors.send.negative': `您不能发送负数的{asset}.`,
  'errors.send.zero': `无法发送0 {asset}.`,
  'errors.send.decimal': `您最多只能发送{asset}个{decimalCount，number}个小数.`,
  'errors.send.invalidAddress': '您需要指定一个有效的NEO地址.',
  'errors.send.invalidN3Address': '您需要指定一个有效的NEO N3地址.',
  'errors.send.blackListed': '地址已列入黑名单。这是已知的网络钓鱼地址。',
}

const NOTIFICATIONS = {
  'notifications.success.receivedBlockchainInfo': '收到最新的区块链信息。',
  'notifications.success.accountSaved': '帐户已保存!',
  'notifications.success.updatedWalletName': '成功更新了钱包名称.',
  'notifications.failure.blockchainInfoFailure': '检索区块链信息失败。',
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
  authMigrateWallets: "遷移錢包",
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
  walletImportedHeader: '钱包进口!',
  walletCreatedDisclaimer:
    '<b>保存这些信息！</b>如果丢失这些凭据，则将失去移动资产的权限。',
  privateKeyLabel: '私钥',
  encryptedKeyLabel: '密钥',
  addressLabel: '账户地址',
  splitKeyLabel: '分割键',
  recoverWalletLabel: '复苏',
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
  manageWalletsLabel: '管理钱包',
  manageWalletsImport: '进口',
  manageWalletsCreate: '创建',
  manageWalletsEdit: '编辑',
  manageWalletsEditWallet: '编辑钱包',
  manageWalletsEditWalletInstructions: '修改详细资料',
  manageWalletsEditWalletNameLabel: '钱包名称',
  manageWalletsEditWalletNamePlaceholder: '钱包名称',
  manageWalletsEditWalletAddressLabel: '钱包地址',
  manageWalletsEditWalletSave: '保存更改',
}

const ACTIVITY = {
  activityAddAddress: '加',
  activityViewTx: '视图',
  activityPageLabel: '所有活动',
  activityExport: '出口',
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
    '{transferCount, number} of {maxNumberOfRecipients, number} 收件者',
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
  tokenSaleDisclaimer2:
    '我了解，根据ICO公司的政策，多次提交NEO或GAS可能会导致资金损失或退款延迟.',
  tokenSaleDisclaimer3: '我了解某些销售可能仅接受NEO或GAS，并且我已确认接受了.',
  tokenSaleDisclaimer4:
    '我了解，如果我将NEO或GAS发送到已经结束的代币销售中，我将丢失NEO / GAS，并且不会退款',
  // eslint-disable-next-line
  tokenSaleDisclaimer5:
    '我了解COZ对使用此功能不承担任何责任，并且我已经查阅了此软件的许可证.',
}

const MIGRATE_WALLETS_NEON3 = {
  migrateWalletsNeon3AltImage: "迁移钱包背景图片",
  migrateWalletNeon3Title: "您想将您的 NEON 2 钱包迁移到 NEON 3 吗？",
  migrateWalletNeon3Description: "迁移您的钱包将使您可以访问更广泛的支持资产，并且拥有更流畅、改进的用户体验，使您资产管理变得轻而易举！",
  migrateWalletNeon3Button: "立即迁移！",
}

const MIGRATE_WALLETS_NEON3_STEPS = {
  migrateWalletsNeon3Steps1: '获取 NEON 3',
  migrateWalletsNeon3Steps2: '导出您的 NEON 2 帐户',
  migrateWalletsNeon3Steps3: '打开 NEON 3',

  migrateWalletsNeon3Step1Title: "获取 NEON 3",
  migrateWalletsNeon3Step1Description: "从下载最新版本的 NEON 并创建您的第一个钱包开始：",
  migrateWalletsNeon3Step1DownloadButton: "下载 NEON 3",
  migrateWalletsNeon3Step1NextStep: "一旦 NEON 3 安装在您的设备上，请继续下一步。",
  migrateWalletsNeon3Step1ButtonLabel: "下一步",

  migrateWalletsNeon3Step2Title: "导出您的 NEON 2 帐户",
  migrateWalletsNeon3Step2Description: "将 NEON 2 迁移文件导出到您的计算机。您将使用此文件将您的钱包迁移到 NEON 3。",
  migrateWalletsNeon3InputLabel: "您希望将迁移文件保存到何处？",
  migrateWalletsNeon3Step2BrowseButton: "浏览...",
  migrateWalletsNeon3Step2NextStep: "当您确定了保存迁移文件的位置后，请继续下一步。",
  migrateWalletsNeon3Step2ButtonLabel: "下一步",

  migrateWalletsNeon3Step3Title: "打开 NEON 3",
  migrateWalletsNeon3Step3Description: "您就快完成了！",
  migrateWalletsNeon3Step3Description2: "为了完成迁移过程，请打开 NEON 3 并按照说明操作。",
  migrateWalletsNeon3Step3AltImage: "迁移钱包背景图片",
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
