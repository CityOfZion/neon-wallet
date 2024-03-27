// @flow
const INPUTS = {
  inputSelectPlaceholder: 'Chọn',
  inputPasswordPlaceholder: 'Mật khẩu',
  inputEncryptedPlaceholder: 'Mật khẩu Mã hóa',
  authPrivateKeyPlaceholder: 'Nhập mật khẩu riêng tư của bạn tại đây',
  authWatchPlaceholder: 'Nhập một địa chỉ ví NEO tại đây',
}
const MISCELLANEOUS = {
  'auth.cancel': 'Hủy',
  'auth.ledger.connectLedger':
    'Kết nối và mở khóa <strong>Thiết bị Ledger</strong> của bạn',
  'auth.ledger.navigateToNeoApp':
    'Điều hướng đến <strong>Ứng dụng NEO</strong> trên thiết bị của bạn',
  'auth.ledger.retry': 'Thử lại?',
  'auth.ledger.fetchAddress': 'Lấy địa chỉ bổ sung',
  publicAddress: 'Địa chỉ Công khai',
  'auth.import.recoveryInstructions':
    'Tải lên tệp khôi phục ví JSON tại đây để thêm tài khoản của bạn vào Neon. Tùy chọn này cũng có sẵn trên trang Cài đặt.',
  importFile: 'Nhập Tệp',
  dashboardTokenBalancesPrice: 'GIÁ',
  dashboardTokenBalancesHoldings: 'NẮM GIỮ',
  settingsLanguageLabel: 'NGÔN NGỮ',
  addToken: 'Thêm Token',
  contactsPageLabel: 'Quản lý Liên hệ',
  newContact: 'Liên hệ Mới',
  deleteLabel: 'Xóa',

  addToContacts: 'Thêm vào liên hệ',
  contactName: 'Tên',
  enterAContactName: 'Nhập Tên Liên hệ...',
  enterAWalletAddress: 'Nhập Địa chỉ Ví...',
  contactWalletAddress: 'Địa chỉ Ví',
  editAContact: 'Chỉnh sửa Một Liên hệ',
  modifyDetails: 'Sửa đổi Chi tiết',
  removeContact: 'Xóa Liên hệ',
  saveContactButtonText: 'Lưu Liên hệ',

  editContactDisclaimer:
    'Vui lòng xem lại và đảm bảo rằng bạn đã nhập đúng địa chỉ để tránh mất tiền',
  addAContact: 'Thêm Một Liên hệ',
  addContactDetails: 'Thêm Chi tiết Liên hệ',
  confirmRemoveContact: 'Vui lòng xác nhận xóa liên hệ',
  modalActionConfirm: 'Xác nhận',
  modalActionCancel: 'Hủy',
  newsPageLabel: 'Tin tức',
  networkSettingsLabel: 'Cài đặt Mạng',

  walletManagerNoLocalInfo:
    'Có vẻ như bạn không có thông tin ví nào được lưu cục bộ ...',

  walletManagerRemoveWallet: 'Xóa Ví',

  selectAssets: 'Chọn Tài sản',
  priorityTransfer: 'Chuyển ưu tiên',

  editRecipients: 'Chỉnh sửa Người nhận',
  confirmAndSend: 'Xác nhận và Gửi',
  fee: 'Phí:',
  sendMoreAssets: 'Gửi thêm Tài sản',
  transactionId: 'ID Giao dịch:',
  numberofTransactionsPending: `{transferCount, number} {transferCount, plural, one {Giao dịch} khác {Giao dịch}} đang chờ xử lý`,
  assetRecipients: `Tài sản {transferCount, plural, one {Người nhận} khác {Người nhận}}`,
  confirmation: 'Confirmation',
  confirmationRecipient:
    '{transferCount, number} {transferCount, plural, one {Recipient} other {Transfers}}',
  completeExclaim: 'Hoàn tất!!',
  sendQRExplanation:
    // eslint-disable-next-line
    'Vậy bạn đã được cấp mã QR chưa? Nhấp vào chụp lại và giữ nó lên máy ảnh của bạn.',
  captureQR: 'Chụp lại',
  captureQRCaps: 'CHỤP LẠI',

  networkConfigTooltipUpdateSettings: 'Cập nhật cài đặt',
  networkConfigTooltipPublicKey: 'KHÓA CÔNG KHAI:',
  networkConfigTooltipAddress: 'ĐỊA CHỈ:',
  networkConfigTooltipVotedNode: 'Bình chọn cho:',
  networkConfigTooltipQuickVote: 'Quickvote',

  noOptionsMessage: 'Không có lựa chọn',
  isLoadingMessage: 'Đang tải...',

  nothingToSeeHere: 'Không có gì để xem!',
  noAvailableAssetsToSend: 'Không có tài sản có sẵn để gửi',
  sendErrorLabel: 'Lỗi!',
  automaticNodeSelectionTooltip: 'Cho phép NEON chọn một nút tự động',
  depositAssets:
    'Tài sản tiền gửi <b> tương thích với blockchain NEO </ b> bằng địa chỉ của bạn:',
  copyAddressTooltip: 'Sao chép địa chỉ ví',
  walletQrCodes: 'Mã QR ví',

  noClaimableGas: 'Địa chỉ không có yêu cầu GAS',
  claimTimeDisclaimer: 'Bạn có thể yêu cầu GAS cứ sau 5 phút',
  claimFeeDisclaimerN3:
    'Yêu cầu GAS yêu cầu ít nhất 0,01120527 GAS cho phí giao dịch',
  claimFeeGreater: 'GAS có thể yêu cầu thấp hơn phí giao dịch',
  claimUnavailableInWatch: 'Khiếu nại GAS không khả dụng trong chế độ Xem',
  takeMeBack: 'Đưa tôi trở lại',
  splitKeyWalletInstructions:
    'Tùy chọn nhập Khóa chia cho phép người dùng tạo tài khoản NEO mới bằng cách kết hợp khóa riêng của tài khoản hiện tại với khóa riêng.',
  splitKeyWalletNamePlaceholder: 'Nhập tên ví khóa chia mới của bạn ...',
  chooseAccount: 'Chọn một tài khoản hiện có',
  nextStep: 'Bước tiếp theo',
  previousStep: 'Bước trước',
  privateKey: 'Khóa riêng',
}

const ERRORS = {
  'errors.contact.nameNull': 'Tên không thể là null.',
  'errors.contact.nameLength': 'Cái tên quá dài.',
  'errors.contact.nameDupe': 'Bạn đã có một tài khoản được lưu với tên đó.',
  'errors.contact.invalidAddress': 'Địa chỉ không hợp lệ.',
  'errors.contact.contactExists': 'Bạn đã có một liên hệ với địa chỉ đó.',
  'errors.password.length': `Cụm mật khẩu phải chứa ít nhất {PASS_MIN_LENGTH, number} ký tự`,
  'errors.password.match': 'Cụm mật khẩu phải khớp',
  'errors.request.fractional': `Bạn không thể yêu cầu phân đoạn {asset}.`,
  'errors.request.validDecimals': `Bạn chỉ có thể yêu cầu {asset}  tối đa {validDecimals, number} số thập phân.`,
  'errors.request.max': `Bạn không thể yêu cầu hơn 100.000.000 {asset}.`,
  'errors.request.min': `Bạn không thể yêu cầu 0 {asset}.`,
  'errors.network.general': 'Giáo sư! Đã xảy ra lỗi.',
  'errors.encrypt.valid': 'Khóa riêng không hợp lệ',

  'errors.send.network': 'Xảy ra lỗi mạng',

  'errors.send.balance': 'Bạn không có đủ số dư để gửi {total} {asset}.',
  'errors.send.number': 'Số tiền phải là một con số.',
  'errors.send.fraction': 'Bạn không thể gửi số lượng NEO một phần.',
  'errors.send.negative': `Bạn không thể gửi số tiền âm của {asset}.`,
  'errors.send.zero': `Không thể gửi 0 {asset}.`,
  'errors.send.decimal': `Bạn chỉ có thể gửi {asset} tối đa {decimalCount, number} số thập phân.`,
  'errors.send.invalidAddress': 'Bạn cần chỉ định một địa chỉ NEO hợp lệ.',
  'errors.send.invalidN3Address': 'Bạn cần chỉ định một địa chỉ NEO N3 hợp lệ.',
  'errors.send.blackListed':
    'Địa chỉ được liệt kê vào danh sách đen. Đây là một địa chỉ lừa đảo được biết đến.',
}

const NOTIFICATIONS = {
  'notifications.success.receivedBlockchainInfo':
    'Nhận được thông tin blockchain mới nhất.',
  'notifications.success.accountSaved': 'Tài khoản đã được lưu!',
  'notifications.success.updatedWalletName': 'Tên ví được cập nhật thành công.',
  'notifications.failure.blockchainInfoFailure':
    'Không thể truy xuất thông tin blockchain.',
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
  authMigrateWallets: "Di chuyển ví",
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
  walletImportedHeader: 'Ví nhập khẩu!',
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
  networkSettingsExplorerLabel: 'KHAI THÁC BLOCK',
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
  tokenSaleDisclaimer2:
    'Tôi hiểu rằng việc gửi NEO hoặc GAS nhiều lần có thể dẫn đến việc mất tiền hoặc hoàn trả chậm tùy thuộc vào chính sách của công ty ICO.',
  tokenSaleDisclaimer3:
    'Tôi hiểu rằng một số đợt chào bán chỉ có thể chấp nhận NEO hoặc GAS và tôi đã xác minh được chấp nhận.',
  tokenSaleDisclaimer4:
    'Tôi hiểu rằng nếu tôi gửi NEO hoặc GAS đến một đợt chào bán token đã kết thúc, tôi sẽ mất NEO / GAS và sẽ không được hoàn trả.',
  // eslint-disable-next-line
  tokenSaleDisclaimer5: `Tôi hiểu rằng COZ không chịu trách nhiệm cho việc sử dụng tính năng này của tôi và tôi đã tham khảo giấy phép của phần mềm này.`,
}

const MIGRATE_WALLETS_NEON3 = {
  migrateWalletsNeon3AltImage: "Hình nền Di dời Ví",
  migrateWalletNeon3Title: "Bạn có muốn di dời ví NEON 2 của mình sang NEON 3 không?",
  migrateWalletNeon3Description: "Việc di dời ví của bạn sẽ mang lại cho bạn quyền truy cập vào một loạt các tài sản được hỗ trợ rộng hơn và một trải nghiệm người dùng mượt mà, cải tiến giúp quản lý tài sản của bạn trở nên dễ dàng hơn!",
  migrateWalletNeon3Button: "Di dời Ngay!",
};

const MIGRATE_WALLETS_NEON3_STEPS = {
  migrateWalletsNeon3Steps1: "Nhận NEON 3",
  migrateWalletsNeon3Steps2: "Xuất các tài khoản NEON 2 của bạn",
  migrateWalletsNeon3Steps3: "Mở NEON 3",

  migrateWalletsNeon3Step1Title: "Nhận NEON 3",
  migrateWalletsNeon3Step1Description: "Bắt đầu bằng cách tải xuống phiên bản NEON mới nhất và tạo ví đầu tiên của bạn:",
  migrateWalletsNeon3Step1DownloadButton: "Tải Xuống NEON 3",
  migrateWalletsNeon3Step1NextStep: "Sau khi NEON 3 được cài đặt trên thiết bị của bạn, tiến hành bước tiếp theo.",
  migrateWalletsNeon3Step1ButtonLabel: "Tiếp theo",

  migrateWalletsNeon3Step2Title: "Xuất các tài khoản NEON 2 của bạn",
  migrateWalletsNeon3Step2Description: "Xuất tệp di dời NEON 2 của bạn ra máy tính. Bạn sẽ sử dụng tệp này để di dời ví của bạn vào NEON 3.",
  migrateWalletsNeon3InputLabel: "Bạn muốn lưu tệp di dời của mình ở đâu?",
  migrateWalletsNeon3Step2BrowseButton: "Duyệt...",
  migrateWalletsNeon3Step2NextStep: "Khi bạn đã xác định một vị trí để lưu trữ tệp di dời của mình, tiến hành bước tiếp theo.",
  migrateWalletsNeon3Step2ButtonLabel: "Tiếp theo",

  migrateWalletsNeon3Step3Title: "Mở NEON 3",
  migrateWalletsNeon3Step3Description: "Bạn gần kết thúc!",
  migrateWalletsNeon3Step3Description2: "Để hoàn tất quá trình di dời, hãy mở NEON 3 và tuân theo hướng dẫn.",
  migrateWalletsNeon3Step3AltImage: "Hình nền Di dời Ví",
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
