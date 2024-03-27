// @flow
const INPUTS = {
  inputSelectPlaceholder: '선택',
  inputPasswordPlaceholder: '비밀번호',
  inputEncryptedPlaceholder: '암호화 키',
  authPrivateKeyPlaceholder: '프라이빗 키를 입력해주세요',
  authWatchPlaceholder: 'NEO 주소를 입력해주세요',
}

const MISCELLANEOUS = {
  'auth.cancel': '취소',
  'auth.ledger.connectLedger': '연결 후 원장 기기를 잠금 해제 해주세요',
  'auth.ledger.navigateToNeoApp': 'NEO 앱을 기기로 이동합니다',
  'auth.ledger.retry': '다시 해 보다?',
  'auth.ledger.fetchAddress': '추가 주소 가져 오기',
  publicAddress: '퍼블릭 주소',
  'auth.import.recoveryInstructions':
    '여기에 JSON 지갑 복구 파일을 업로드하여 계정을 Neon에 추가하십시오. 이 옵션은 설정 페이지에서도 사용할 수 있습니다.',
  importFile: '파일 가져 오기',
  dashboardTokenBalancesPrice: '가격',
  dashboardTokenBalancesHoldings: '지주',
  settingsLanguageLabel: '언어',
  addToken: '토큰 추가하기',
  deleteLabel: '지우다',
  addToContacts: '연락처에 추가',
  contactName: '이름',
  enterAContactName: '담당자 이름 입력 ...',
  enterAWalletAddress: '월렛 주소 입력 ...',
  contactWalletAddress: '지갑 주소',
  editAContact: '연락처 편집',
  modifyDetails: '세부 사항 수정',
  removeContact: '연락처를 없 에다',
  saveContactButtonText: '연락처 저장',
  editContactDisclaimer:
    '자금 손실을 피하기 위해 주소를 올바르게 입력했는지 확인하고 입력하십시오',
  addAContact: '연락처 추가',
  addContactDetails: '연락처 세부 사항 추가',
  confirmRemoveContact: '연락처 제거를 확인하십시오',
  modalActionConfirm: '확인',
  modalActionCancel: '취소',
  newsPageLabel: '뉴스',
  networkSettingsLabel: '네트워크 설정',
  walletManagerNoLocalInfo: '로컬로 저장된 지갑 정보가없는 것 같습니다...',
  walletManagerRemoveWallet: '월렛 제거',
  selectAssets: '자산 선택',
  priorityTransfer: '우선권 양도',
  editRecipients: '받는 사람 편집]',
  confirmAndSend: '확인 및 발송',
  fee: '회비:',
  sendMoreAssets: '더 많은 자산 보내기',
  transactionId: '거래 ID:',
  numberofTransactionsPending:
    '{transferCount, number} {transferCount, plural, one {이전} other {양도}} 보류 중',
  assetRecipients: '자산 수령인',
  completeExclaim: '완전한!',
  sendQRExplanation:
    'QR 코드를 받았습니까? 캡처를 클릭하고 카메라에 고정시킵니다.',
  captureQR: '포착',
  captureQRCaps: '포착',

  networkConfigTooltipUpdateSettings: '업데이트 설정',
  networkConfigTooltipPublicKey: '공개 키:',
  networkConfigTooltipAddress: '주소:',
  networkConfigTooltipVotedNode: '캐스트 투표:',
  networkConfigTooltipQuickVote: 'Quickvote',

  noOptionsMessage: '옵션이 없습니다',
  isLoadingMessage: '불러오는 중...',

  nothingToSeeHere: '여기는 볼게 없다!',
  noAvailableAssetsToSend: '보낼 자산이 없습니다.',
  sendErrorLabel: '오류!',
  automaticNodeSelectionTooltip: 'NEON이 노드를 자동으로 선택하도록 허용',
  depositAssets:
    '귀하의 주소를 사용하여 <b> NEO 블록 체인과 호환되는 </ b> 자산을 입금하십시오:',
  copyAddressTooltip: '월렛 주소 복사',
  walletQrCodes: '월렛 QR 코드',

  noClaimableGas: '주소에 청구 가능한 가스가 없습니다',
  claimTimeDisclaimer: '5 분마다 GAS를 청구 할 수 있습니다.',
  claimFeeDisclaimerN3:
    'GAS를 청구하려면 거래 수수료에 대해 최소 0.01120527 GAS가 필요합니다.',
  claimFeeGreater: '청구 가능한 GAS가 거래 수수료보다 적습니다.',
  claimUnavailableInWatch:
    '시계 모드에서는 GAS 소유권 주장을 사용할 수 없습니다.',
  takeMeBack: '다시 데려다',
  splitKeyWalletInstructions:
    '스플릿 키 가져 오기 옵션을 사용하면 기존 계정의 개인 키와 별도의 개인 키를 결합하여 새 NEO 계정을 만들 수 있습니다.',
  splitKeyWalletNamePlaceholder: '새로운 분할 키 지갑 이름을 입력하십시오 ...',
  chooseAccount: '기존 계정을 선택하십시오',
  nextStep: '다음 단계',
  previousStep: '이전 단계',
  privateKey: '개인 키',
}

const ERRORS = {
  'errors.contact.nameNull': '이름은 null 일 수 없습니다.',
  'errors.contact.nameLength': '이름이 너무 깁니다.',
  'errors.contact.nameDupe': '해당 이름으로 저장된 계정이 이미 있습니다.',
  'errors.contact.invalidAddress': '주소가 유효하지 않습니다.',
  'errors.contact.contactExists': '해당 주소로 이미 연락하고 있습니다.',

  'errors.password.length':
    '암호는 {PASS_MIN_LENGTH, number} 자 이상이어야합니다.',
  'errors.password.match': '암호는 일치해야합니다',
  'errors.request.fractional': `분수 {asset}를 요청할 수 없습니다.`,
  'errors.request.validDecimals':
    '{asset}는 소수점 이하 {validDecimals, number} 자리까지만 요청할 수 있습니다',
  'errors.request.max': `100,000,000 개 이상의 {asset}을 요청할 수 없습니다.`,
  'errors.request.min': `0 {asset}을 (를) 요청할 수 없습니다.`,
  'errors.network.general': '죄송합니다! 문제가 발생했습니다.',
  'errors.encrypt.valid': '개인 키가 유효하지 않습니다',

  'errors.send.balance': `{total} {asset}을 (를) 보낼 충분한 잔고가 없습니다.`,
  'errors.send.network': '네트워크 오류가 발생했습니다.',
  'errors.send.number': '금액은 숫자 여야합니다.',
  'errors.send.fraction': '소수의 NEO를 보낼 수 없습니다.',
  'errors.send.negative': `음수의 {asset}을 보낼 수 없습니다.`,
  'errors.send.zero': `0 {asset}을 보낼 수 없습니다.`,
  'errors.send.decimal': `{asset}은 최대 {decimalCount, number} 소수까지만 보낼 수 있습니다.`,
  'errors.send.invalidAddress': '유효한 NEO 주소를 지정해야합니다.',
  'errors.send.invalidN3Address': '유효한 NEO N3 주소를 지정해야합니다.',
  'errors.send.blackListed':
    '주소가 블랙리스트에 있습니다. 이것은 알려진 피싱 주소입니다.',
}

const NOTIFICATIONS = {
  'notifications.success.receivedBlockchainInfo':
    '최신 블록 체인 정보를 받았습니다.',
  'notifications.success.accountSaved': '계정이 저장되었습니다!',
  'notifications.success.updatedWalletName':
    '지갑 이름이 성공적으로 업데이트되었습니다.',
  'notifications.failure.blockchainInfoFailure':
    '블록 체인 정보를 검색하지 못했습니다.',
}

// end TODO

const AUTH = {
  authLogin: '로그인',
  authSaved: '저장됨',
  authPrivate: '개인',
  authEncrypted: '암호화됨',
  authWatch: '보기',
  authLedger: '원장',
  authCreateWallet: '월렛 만들기',
  authImportWallet: '월렛 불러오기',
  authMigrateWallets: "지갑 마이그레이션",
  authScanQRButton: 'QR코드 스캔',
  authLoginButton: '로그인',
  authLedgerFirstStep: '연결 후 원장 기기를 잠금 해제 해주세요',
  authLedgerSecondStep: 'NEO 앱을 기기로 이동합니다',
  authLedgerAddressLabel: '퍼블릭 주소',
}

const WALLET_CREATION = {
  createANewWallet: '신규 월렛 생성',
  walletCreationInstruction: '세부 정보 입력',
  walletCreationWalletNameLabel: '월렛 이름',
  walletCreationWalletNamePlaceholder: '월렛 이름',
  walletCreationWalletPasswordLabel: '패스프레이즈',
  walletCreationWalletPasswordPlaceholder: '비밀번호',
  walletCreationWalletPasswordConfirmLabel: '비밀번호 확인',
  walletCreationWalletPasswordConfirmPlaceholder: '비밀번호 확인',
  walletCreationButton: '월렛 만들기',
  walletCreatedHeader: '지갑이 만들어졌습니다!',
  walletImportedHeader: '월렛을 가져 왔습니다!',
  walletCreatedDisclaimer:
    '<b>세부사항을 저장하십시오!</b> 크리덴셜을 잃게 되면 자산 액세스 권한이 상실됩니다.',
  privateKeyLabel: '개인 키',
  encryptedKeyLabel: '암호화 된 키',
  addressLabel: '퍼블릭 주소',
  splitKeyLabel: '스플릿 키',
  recoverWalletLabel: '리커버 지갑',
  print: '인쇄',
  generateQrCodes: 'QR 코드 생성',
  copyCodeImage: '코드 이미지 복사',
  contactsPageLabel: '연락처 관리',
  newContact: '새로운 연락처',
}

const DASHBOARD = {
  dashboardBalancePanelLabel: '토큰 잔액',
  dashboardAssetsPanelLabel: '시스템 자산',
  dashboardAssetsTotal: '총',
  dashboardMarketDataLabel: '시장 데이터',
  dashboardValueLabel: '총 월렛 ',
  dashboardAddressLabel: '주소:',
  dashboardPriceNotAvailable: 'N/A',
  dashboardGasClaimButton: '{amount} GAS 청구',
  dashboardManageWallets: '월렛 관리',
  dashboardRefresh: '업데이트',
  dashboardTokenBalancesToken: '토큰',
  dashboardMarketData1Day: '1일',
  dashboardMarketData1Week: '1주',
  dashboardMarketData1Month: '1개월',
}

const SIDEBAR = {
  sidebarWallet: '월렛',
  sidebarActivity: '활동',
  sidebarSend: '보내기',
  sidebarReceive: '받기',
  sidebarContacts: '연락처',
  sidebarTokenSale: '토큰 판매',
  sidebarNews: '뉴스',
  sidebarSettings: '설정',
  sidebarLogout: '로그아웃',
  sidebarCurrentBlock: '현 블록',
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
  recieveSelectMethod: '예금 방법 선택',
  receiveAssetsAddressLabel: '퍼블릭 주소',
  receivePageLabel: '자산 받기',
  receiveYourAddressTabLabel: '주소',
  receiveCopyCodeButton: '코드 이미지 복사',
  receiveDisclaimer:
    '<b>NEO 블록체인(NEO, GAS 등)과 호환되는</b> 자산만 전송합니다. 다른 자산 전송 시, 영구적인 손실이 발생합니다.',
  receiveRequestTabAssets: '자산 요청',
  recieveWhyUseQRLabel: '왜 QR코드를 사용하나요?',
  receiveQRExplanation:
    '<p>월렛 주소를 잘못 입력하여 자산을 잘못된 주소로 보낸 적이 있으신가요?</p><p>없다면 다행이지만, 빈번히 일어나는 일입니다.</p> <p>여기 COZ에서는, 당신의 올바른 세부 사항으로 지불할 수 있도록, 자산 요청 QR코드를 생성하실 수 있습니다.</p><p>생성되는 모든 코드에는 사용자가 설정한 퍼블릭 월렛 주소, 자산 금액 및 레퍼런스가 포함되어 있습니다.</p>',
}

const REQUEST_ASSETS = {
  requestAssetLabel: '자산',
  requestAssetAmountLabel: '총액',
  requestAssetAmount: '총액',
  requestAssetDepositLabel: '월렛으로 예금',
  requestAssetRefLabel: '레퍼런스',
  requestAssetRefPlaceholder: '노트 추가...',
  requestAssetQRButton: 'QR코드 생성',
  requestAssetYourQRHeader: 'QR코드',
  requestAssetsPaymentDetails: '지불 요청 세부 사항',
  requestAssetsYourQRLabel: 'QR코드',
  requestAssetsRefLabel: '레퍼런스',
  requestAssetsAddressLabel: '주소',
  requestAssetsAmountLabel: '총액',
  requestAssetsAssetLabel: '자산',
}

const TRANSACTION_FEE = {
  transactionFeeQuestion: '수수료로 우선 순위를 매겨 거래하시겠습니까?',
  fast: '빠르게',
  faster: '더 빠르게',
  fastest: '제일 빠르게',
  sendWithFee:
    '수수료 붙여 {itemCount, plural, one {유산} other {자산}} 보내기',
  sendWithoutFee:
    '수수료 없이 {itemCount, plural, one {유산} other {자산}} 보내기',
  asset: '자산',
  assets: '자산',
}

const SEND = {
  sendPageLabel: '자산 보내기',
  sendImport: '불러오기',
  sendEnterQRCode: 'QR코드 입력',
  sendAdd: '수취인 추가',
  sendAssetLabel: '자산 보내기',
  sendAmountLabel: '총액',
  sendAddressLabel: '수취인 주소',
  sendAddressPlaceholder: '월렛 추가 및 연락처 선택',
  sendTranfer: 'TRANSFER',
  sendMaxAmount: '최대',
  sendTransferPlural: 'TRANSFERS',
  sendAsset: '자산',
  sendAssets: '자산',
  sendRecipient: '수취인',
  sendRecipients: '수취인',
  sendAssetCapital: '자산',
  sendAssetsCapital: '자산',
  sendRecipientCapital: '수취인',
  sendRecipientsCapital: '수취인',
  sendCompleteNotification:
    '트랜잭션을 보류 중입니다. 블록체인이 처리하면 잔액이 자동으로 업데이트됩니다.',
  sendSelectAssets:
    '{maxNumberOfRecipients, number} 수취인의 {transferCount, number} 자산 선택',
  sendTransferMessage:
    '{transferCount, number} {transferCount, plural, one {sendTransfer} other {sendTransferPlural}} 보류 중',
  sendBroadcasting: '네트워크로 트랜잭션 브로드캐스팅 중...',
  sendDisclaimer:
    '자금 손실이 일어나지 않도록 정확한 세부사항을 입력하셨는지 검토해주시길 바랍니다.',
  sendActivityLink: '활동 탭에서 거래 상태를 확인합니다.',
  sendCompletion:
    '완료! {transferCount, plural, one {sendRecipient} other {sendRecipients}}로 {transferCount, number} {transferCount, plural, one {sendAsset} other {sendAssets}} ',
  confirmation: '확인',
  confirmationRecipient:
    '{transferCount, number} {transferCount, plural, one {받는 사람} other {받는 사람}}',
}

const SETTINGS = {
  settingsNetworkConfigLabel: '네트워크 구성',
  settingCurrencyLabel: '통화',
  settingsThemeLabel: '테마',
  settingsSoundLabel: '소리',
  settingsEncryptLink: '키 암호화',
  recoverWallet: '월렛 복구',
  settingsRecoverWalletLink: '불러오기',
  settingsBackUpLinkLabel: '월렛 백업',
  settingsBackUpLink: '내보내기',
  settingsManageLabel: '네온 지갑 관리',
  settingsCommunity: '커뮤니티 지원',
  settingsDonationLink: 'Created by COZ. 후원: ',
}

const NETWORK_SETTINGS = {
  networkSettingsInstructions:
    'Neon Wallet이 블록 체인과 상호 작용하는 방법과 관련된 모든 네트워크 설정을 관리합니다.',
  networkSettingsNodeSelectLabel: '노드 선택',
  networkSettingsExplorerLabel: '블록 익스플로러',
  networkSettingsCurrentLabel: '현재 네트워크',
  networkSettingsAutomatic: '자동화',
}

const NODE_SELECTION = {
  nodeSelectPanelHeader: '노드 선택',
  nodeSelectionInstructions:
    '성능 문제가 발생하는 경우 아래에서 사용자 지정 노드를 선택하십시오.',
  nodeSelectSelectAutomatically: '자동으로 선택',
  nodeSelectInfo: '상위 {nodeCount, number}개의 노드가 나열됨',
  nodeSelectBlockHeight: '블록 높이',
}

const ENCRYPT_KEY = {
  encryptPanelHeader: '키 암호화',
  encryptInstructions: '기존 키를 암호화할 암호 선택',
  encryptStep1Label: '1) 암호화할 프라이빗 키 입력',
  encryptStep1Placeholder: '키 입력',
  encryptStep2Label: '2) 암호 생성',
  encryptStep2Placeholder: '암호 입력',
  encryptStep3Label: '3) 암호 확인',
  encryptStep3Placeholder: '암호 확인',
  encryptButton: '암호화된 키 생성',
}

const TOKEN_SALE = {
  tokenSalePageHeader: '토큰 세일 참여',
  tokenSaleDisclaimer1: '계속하려면 이 문장을 읽고 승인해 주십시오.',
  tokenSaleDisclaimer2:
    'NEO나 GAS를 여러 번 제출하면 ICO사의 방침에 따라 자금 손실이 발생하거나 환불이 지연될 수 있는 것으로 알고 있습니다.',
  tokenSaleDisclaimer3:
    '일부 판매는 NEO 또는 GAS만 수락할 수 있으며, 어느 것이 받아들여지는지 확인했습니다.',
  tokenSaleDisclaimer4:
    '이미 끝난 토큰 세일에 NEO나 GAS를 보내면 NEO/GAS가 없어져 환불이 되지 않는 것으로 알고 있습니다.',
  tokenSaleDisclaimer5:
    // eslint-disable-next-line
    'COZ는 이 기능의 사용에 대한 책임이 없으며 이 소프트웨어의 라이센스에 문의했습니다.',
}

const MIGRATE_WALLETS_NEON3 = {
  migrateWalletsNeon3AltImage: "지갑 이전 배경 이미지",
  migrateWalletNeon3Title: "NEON 2 지갑을 NEON 3으로 이전하시겠습니까?",
  migrateWalletNeon3Description: "지갑을 이전하면 더 많은 지원 자산 범위와 더욱 sleek하고 개선된 사용자 경험이 제공되어 자산 관리가 쉬워집니다!",
  migrateWalletNeon3Button: "지금 이전하기!",
};

const MIGRATE_WALLETS_NEON3_STEPS = {
  migrateWalletsNeon3Steps1: "NEON 3 가져오기",
  migrateWalletsNeon3Steps2: "NEON 2 계정 내보내기",
  migrateWalletsNeon3Steps3: "NEON 3 열기",

  migrateWalletsNeon3Step1Title: "NEON 3 가져오기",
  migrateWalletsNeon3Step1Description: "최신 NEON 빌드를 다운로드하고 첫 번째 지갑을 만들기 시작합니다:",
  migrateWalletsNeon3Step1DownloadButton: "NEON 3 다운로드",
  migrateWalletsNeon3Step1NextStep: "NEON 3이 기기에 설치되면 다음 단계로 이동하십시오.",
  migrateWalletsNeon3Step1ButtonLabel: "다음",

  migrateWalletsNeon3Step2Title: "NEON 2 계정 내보내기",
  migrateWalletsNeon3Step2Description: "NEON 2 이전 파일을 컴퓨터로 내보냅니다. 이 파일을 사용하여 NEON 3으로 지갑을 이전합니다.",
  migrateWalletsNeon3InputLabel: "이전 파일을 저장할 위치를 선택하세요.",
  migrateWalletsNeon3Step2BrowseButton: "찾아보기...",
  migrateWalletsNeon3Step2NextStep: "이전 파일을 저장할 위치를 정의하면 다음 단계로 이동하십시오.",
  migrateWalletsNeon3Step2ButtonLabel: "다음",

  migrateWalletsNeon3Step3Title: "NEON 3 열기",
  migrateWalletsNeon3Step3Description: "거의 다 왔습니다!",
  migrateWalletsNeon3Step3Description2: "이전 프로세스를 완료하려면 NEON 3을 열고 지시 사항을 따르십시오.",
  migrateWalletsNeon3Step3AltImage: "지갑 이전 배경 이미지",
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
