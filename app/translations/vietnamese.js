// @flow
const INPUTS = {
  inputSelectPlaceholder: 'Chọn',
  inputPasswordPlaceholder: 'Mật khẩu',
  inputEncryptedPlaceholder: 'Mật khẩu Mã hóa',
  authPrivateKeyPlaceholder: 'Nhập mật khẩu riêng tư của bạn tại đây',
  authWatchPlaceholder: 'Nhập một địa chỉ ví NEO tại đây',
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
  authLogin: 'Đăng nhập',
  authSaved: 'ĐÃ LƯU',
  authPrivate: 'RIÊNG TƯ',
  authEncrypted: 'MÃ HÓA',
  authWatch: 'THEO DÕI',
  authLedger: 'LEDGER',
  authCreateWallet: 'Tạo Ví',
  authImportWallet: 'Nhập Ví',
  authScanQRButton: 'Quét mã QR',
  authLoginButton: 'Đăng nhập',
  authLedgerFirstStep: 'Kết nối và mở khóa một thiết bị Ledger',
  authLedgerSecondStep: 'Điều hướng đến một ứng dụng NEO trên thiết bị của bạn',
  authLedgerAddressLabel: 'ĐỊA CHỈ CÔNG KHAI',
}

const WALLET_CREATION = {
  createANewWallet: 'Tạo Ví Mới',
  walletCreationInstruction: 'Nhập Các Chi tiết',
  walletCreationWalletNameLabel: 'TÊN VÍ',
  walletCreationWalletNamePlaceholder: 'Tên Ví',
  walletCreationWalletPasswordLabel: 'CỤM MẬT KHẨUE',
  walletCreationWalletPasswordPlaceholder: 'Mật Khẩu',
  walletCreationWalletPasswordConfirmLabel: 'Xác Nhận Mật Khẩu',
  walletCreationWalletPasswordConfirmPlaceholder: 'Xác Nhận Mật Khẩu',
  walletCreationButton: 'Tạo Ví',
  walletCreatedHeader: 'Ví đã được Tạo!',
  walletCreatedDisclaimer:
    '<b>Lưu những thông tin này lại!</b> Nếu bạn mất những thông tin đăng nhập này, bạn sẽ mất quyền truy cập vào ví của bạn.',
  privateKeyLabel: 'KHÓA RIÊNG TƯ',
  encryptedKeyLabel: 'KHÓA MÃ HÓA',
  addressLabel: 'ĐỊA CHỈ CÔNG KHAI',
  splitKeyLabel: 'KHÓA CHIA',
  recoverWalletLabel: 'PHỤC HỒI VÍ',
  print: 'In ra giấy',
  generateQrCodes: 'Quét Mã QR',
  copyCodeImage: 'Sao chép Hình ảnh Mã',
}
const DASHBOARD = {
  dashboardBalancePanelLabel: 'Số dư Token',
  dashboardAssetsPanelLabel: 'Các Tài sản trong Hệ thống',
  dashboardAssetsTotal: 'TỔNG CỘNG',
  dashboardMarketDataLabel: 'Dữ liệu Thị trường',
  dashboardValueLabel: 'Tổng Giá trị Ví',
  dashboardAddressLabel: 'Địa chỉ:',
  dashboardPriceNotAvailable: 'N/A',
  dashboardGasClaimButton: 'Nhận {amount} GAS',
  dashboardManageWallets: 'Quản lý Các Ví',
  dashboardRefresh: 'Làm mới',
  dashboardTokenBalancesToken: 'Token',
  dashboardMarketData1Day: '1 NGÀY',
  dashboardMarketData1Week: '1 TUẦN',
  dashboardMarketData1Month: '1 THÁNG',
}

const SIDEBAR = {
  sidebarWallet: 'Ví',
  sidebarActivity: 'Hoạt động',
  sidebarSend: 'Gửi',
  sidebarReceive: 'Nhận',
  sidebarContacts: 'Liên hệ',
  sidebarTokenSale: 'Tham gia Đợt chào bán Token',
  sidebarNews: 'Tin Tức',
  sidebarSettings: 'Cài Đặt',
  sidebarLogout: 'Đăng xuất',
  sidebarCurrentBlock: 'KHỐI HIỆN TẠI',
}

const MANAGE_WALLETS = {
  manageWalletsLabel: 'Quản lý Các Ví',
  manageWalletsImport: 'Nhập',
  manageWalletsCreate: 'Tạo',
  manageWalletsEdit: 'Chỉnh sửa',
  manageWalletsEditWallet: 'Chỉnh sửa Ví',
  manageWalletsEditWalletInstructions: 'Sửa đổi Các Chi tiết',
  manageWalletsEditWalletNameLabel: 'TÊN VÍ',
  manageWalletsEditWalletNamePlaceholder: 'Tên Ví',
  manageWalletsEditWalletAddressLabel: 'ĐỊA CHỈ VÍ',
  manageWalletsEditWalletSave: 'Lưu lại Các Thay đổi',
}

const ACTIVITY = {
  activityAddAddress: 'Thêm',
  activityViewTx: 'Xem',
  activityPageLabel: 'Tất cả Hoạt động',
  activityExport: 'Xuất ra',
}

const RECEIVE = {
  recieveSelectMethod: 'Chọn Phương pháp Nạp tiền',
  receiveAssetsAddressLabel: 'Địa chỉ Ví Công khai của Bạn',
  receivePageLabel: 'Nhận Tài sản',
  receiveYourAddressTabLabel: 'ĐỊA CHỈ VÍ CỦA BẠN',
  receiveCopyCodeButton: 'Sao chép Hình ảnh Mã',
  receiveDisclaimer:
    'Chỉ gửi những tài sản <b>tương tích với blockchain NEO (NEO, GAS,...)</b>. Việc gửi các tài sản khác sẽ làm cho các tài sản đó bị mất vĩnh viễn.',
  receiveRequestTabAssets: 'YÊU CẦU TÀI SẢN',
  recieveWhyUseQRLabel: 'Tại sao phải sử dụng một mã QR? ',
  receiveQRExplanation:
    '<p>Bạn đã bao giờ gửi tài sản đến một địa chỉ ví sai vì sai một kí tự trong dãy kí tự địa chỉ ví?</p><p>Nếu chưa, bạn thật may mắn - vì điều này xảy ra khá thường xuyên.</p> <p>Tại COZ, chúng tôi muốn đảm bảo những người gửi tiền cho bạn có được thông tin chi tiết của bạn một cách đúng đắn. Bạn có thể tạo mã QR để yêu cầu tài sản giúp họ cũng như tự giúp cho chính bạn.</p><p>Mỗi mã bạn tạo sẽ bao gồm địa chỉ ví công khai, số tiền tài sản và tham chiếu - tất cả do bạn đặt.</p>',
}

const REQUEST_ASSETS = {
  requestAssetLabel: 'TÀI SẢN',
  requestAssetAmountLabel: 'Số lượng',
  requestAssetAmount: 'SỐ LƯỢNG',
  requestAssetDepositLabel: 'NẠP TIỀN VÀO VÍ NÀY',
  requestAssetRefLabel: 'LƯU Ý',
  requestAssetRefPlaceholder: 'Thêm một lưu ý...',
  requestAssetQRButton: 'Tạo mã QR',
  requestAssetYourQRHeader: 'Mã QR của Bạn',
  requestAssetsPaymentDetails: 'PCHI TIẾT YÊU CẦU THANH TOÁN',
  requestAssetsYourQRLabel: 'MÃ QR CỦA BẠN',
  requestAssetsRefLabel: 'LƯU Ý',
  requestAssetsAddressLabel: 'ĐỊA CHỈ',
  requestAssetsAmountLabel: 'SỐ LƯỢNG',
  requestAssetsAssetLabel: 'TÀI SẢN',
}

const TRANSACTION_FEE = {
  transactionFeeQuestion:
    'TĂNG ĐỘ ƯU TIÊN CHO GIAO DỊCH CỦA BẠN BẰNG VIỆC TRẢ PHÍ?',
  fast: 'Nhanh',
  faster: 'Nhanh hơn',
  fastest: 'Nhanh nhất',
  sendWithFee: 'Gửi {itemCount, plural, one {asset} other {assets}} Với Phí',
  sendWithoutFee:
    'Gửi {itemCount, plural, one {Tài sản} other {Các Tài sản}} Mà Không Có Phí',
  asset: 'Tài sản',
  assets: 'Các Tài sản',
}

const SEND = {
  sendPageLabel: 'Gửi Tài sản',
  sendImport: 'Nhập',
  sendEnterQRCode: 'Nhập Mã QR',
  sendAdd: 'Thêm Địa chỉ Ví Nhận',
  sendAssetLabel: 'TÀI SẢN',
  sendAmountLabel: 'SỐ LƯỢNG',
  sendAddressLabel: 'ĐỊA CHỈ VÍ NHẬN',
  sendAddressPlaceholder: 'Thêm ví hoặc chọn liên hệ',
  sendTranfer: 'CHUYỂN',
  sendMaxAmount: 'TỐI ĐA',
  sendTransferPlural: 'CHUYỂN',
  sendAsset: 'tài sản',
  sendAssets: 'các tài sản',
  sendRecipient: 'Người nhận',
  sendRecipients: 'Các người nhận',
  sendAssetCapital: 'Tài sản',
  sendAssetsCapital: 'Các tài sản',
  sendRecipientCapital: 'Người nhận',
  sendRecipientsCapital: 'Các người nhận',
  sendCompleteNotification:
    'Giao dịch đang chờ xử lý! Số dư của bạn sẽ tự động cập nhật khi blockchain đã xử lý xong.',
  sendSelectAssets:
    'Chọn Các tài sản {transferCount, number} của {maxNumberOfRecipients, number} Người nhận',
  sendTransferMessage:
    '{transferCount, number} {transferCount, plural, one {sendTransfer} other {sendTransferPlural}} chờ xử lý',
  sendBroadcasting: 'Đang phát giao dịch lên mạng...',
  sendDisclaimer:
    'Vui lòng xem lại và đảm bảo rằng bạn đã nhập các chi tiết chính xác để tránh mất tiền.',
  sendActivityLink:
    'Kiểm tra thanh hoạt động để xem trạng thái giao dịch của bạn.',
  sendCompletion:
    'Hoàn tất! {transferCount, number} {transferCount, plural, one {sendAsset} other {sendAssets}} to {transferCount, plural, one {sendRecipient} other {sendRecipients}}',
}

const SETTINGS = {
  settingsNetworkConfigLabel: 'CẤU HÌNH MẠNG',
  settingCurrencyLabel: 'TIỀN TỆ',
  settingsThemeLabel: 'CHỦ ĐỀ',
  settingsSoundLabel: 'ÂM THANH',
  settingsEncryptLink: 'MÃ HOÁ MỘT KHOÁ',
  recoverWallet: 'PHỤC HỒI VÍ',
  settingsRecoverWalletLink: 'NHẬP',
  settingsBackUpLinkLabel: 'SAO LƯU VÍ',
  settingsBackUpLink: 'XUẤT',
  settingsManageLabel: 'Quản lý Ví Neon của bạn',
  settingsCommunity: 'Hỗ trợ Cộng đồng',
  settingsDonationLink:
    'Được tạo bởi COZ. Donations: Adr3XjZ5QDzVJrWvzmsTTchpLRRGSzgS5A',
}

const NETWORK_SETTINGS = {
  networkSettingsInstructions:
    'Quản lý tất cả các cài đặt mạng liên quan đến cách thức Ví neon tương tác với blockchain',
  networkSettingsNodeSelectLabel: 'LỰA CHỌN NODE',
  networkSettingsExplorerLabel: 'node sự khám phá',
  networkSettingsCurrentLabel: 'MẠNG HIỆN HÀNH',
  networkSettingsAutomatic: 'TỰ ĐỘNG',
}

const NODE_SELECTION = {
  nodeSelectPanelHeader: 'Lựa chọn Node',
  nodeSelectionInstructions:
    'Nếu bạn gặp vấn đề về hiệu suất, hãy thử chọn một node tùy chỉnh bên dưới',
  nodeSelectSelectAutomatically: 'Chọn tự động',
  nodeSelectInfo: 'Danh sách {nodeCount, number} Node hàng đầu được liệt kê',
  nodeSelectBlockHeight: 'Chiều cao Khối',
}

const ENCRYPT_KEY = {
  encryptPanelHeader: 'Mã hóa một khóa',
  encryptInstructions: 'Chọn cụm mật khẩu để mã hóa khóa hiện có',
  encryptStep1Label: '1) NHẬP KHÓA RIÊNG TƯ BẠN MUỐN MÃ HÓA',
  encryptStep1Placeholder: 'Nhập khóa',
  encryptStep2Label: '2) TẠO MỘT CỤM MẬT KHẨU',
  encryptStep2Placeholder: 'Nhập Cụm Mật khẩu',
  encryptStep3Label: '3) XÁC NHẬN CỤM MẬT KHẨU CỦA BẠN',
  encryptStep3Placeholder: 'Xác Nhận Cụm Mật khẩu',
  encryptButton: 'Tạo Khóa được Mã hóa',
}

const TOKEN_SALE = {
  tokenSalePageHeader: 'Tham gia Đợt chào bán Token',
  tokenSaleDisclaimer1:
    'Vui lòng đọc và thừa nhận những tuyên bố này để tiếp tục',
  tokenSaleDiclaimer2:
    'Tôi hiểu rằng việc gửi NEO hoặc GAS nhiều lần có thể dẫn đến việc mất tiền hoặc hoàn trả chậm tùy thuộc vào chính sách của công ty ICO.',
  tokenSaleDisclaimer3:
    'Tôi hiểu rằng một số đợt chào bán chỉ có thể chấp nhận NEO hoặc GAS và tôi đã xác minh được chấp nhận.',
  tokenSaleDisclaimer4:
    'Tôi hiểu rằng nếu tôi gửi NEO hoặc GAS đến một đợt chào bán token đã kết thúc, tôi sẽ mất NEO / GAS và sẽ không được hoàn trả.',
  // eslint-disable-next-line
  tokenSaleDiclaimer5: `Tôi hiểu rằng COZ không chịu trách nhiệm cho việc sử dụng tính năng này của tôi và tôi đã tham khảo giấy phép của phần mềm này.`,
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
