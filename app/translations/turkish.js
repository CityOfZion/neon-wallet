// @flow
const INPUTS = {
  inputSelectPlaceholder: 'Seç',
  inputPasswordPlaceholder: 'Şifre',
  inputEncryptedPlaceholder: 'Şifreli Anahtar',
  authPrivateKeyPlaceholder: 'Özel anahtarınızı buraya girin',
  authWatchPlaceholder: 'Buraya bir NEO adresi girin',
}

const VARIOUS_MISSING_TRANSLATIONS = {
  'auth.cancel': 'İptal Et',
  'auth.ledger.connectLedger':
    '<strong>Ledger cihazınızı</strong> bağlayın ve kilidini açın',
  'auth.ledger.navigateToNeoApp':
    'Cihazınızdaki <strong>NEO uygulamasına</strong> gidin',
  'auth.ledger.retry': 'Tekrar dene?',
  'auth.ledger.fetchAddress': 'Ek adresler getir',
  publicAddress: 'Genel Adres',
  'auth.import.recoveryInstructions': `Hesaplarınızı Neon'a eklemek için buraya bir JSON cüzdan kurtarma dosyası yükleyin. Bu seçenek ayrıca Ayarlar sayfasında da bulunur.`,
  importFile: 'Dosyayı İçe Aktar',
  dashboardTokenBalancesPrice: 'FİYAT',
  dashboardTokenBalancesHoldings: 'VARLIKLAR',
  settingsLanguageLabel: 'DİL',
  addToken: 'Token Ekle',
  contactsPageLabel: 'Kişileri yönet',
  newContact: 'Yeni Kişi',
  deleteLabel: 'Sil',

  addToContacts: 'Kişilere ekle',
  contactName: 'İsim',
  enterAContactName: 'Kişi Adını Girin...',
  enterAWalletAddress: 'Cüzdan Adresini Girin...',
  contactWalletAddress: 'Cüzdan Adresi',
  editAContact: 'Bir Kişiyi Düzenleyin',
  modifyDetails: 'Ayrıntıları Değiştirin',
  removeContact: 'Kişiyi Kaldır',
  saveContactButtonText: 'Kişiyi Kaydet',

  editContactDisclaimer:
    'Fon kaybını önlemek için lütfen adresi doğru girdiğinizden emin olun',
  addAContact: 'Bir Kişi Ekle',
  addContactDetails: 'Kişi Bilgilerini Ekleyin',
  confirmRemoveContact: 'Lütfen kaldırılan kişiyi onaylayın',
  modalActionConfirm: 'Onayla',
  modalActionCancel: 'İptal Et',
  newsPageLabel: 'Haberler',
  networkSettingsLabel: 'Ağ ayarları',

  walletManagerNoLocalInfo:
    'Anlaşılan o ki lokal olarak kaydedilmiş cüzdan bilginiz yok...',

  walletManagerRemoveWallet: 'Cüzdanı Kaldır',

  selectAssets: 'Varlıkları Seçin',
  priorityTransfer: 'Öncelikli Transfer',

  editRecipients: 'Alıcıları Düzenle',
  confirmAndSend: 'Onayla ve Gönder',
  fee: 'Ücret:',
  sendMoreAssets: 'Daha Fazla Varlık Gönder',
  transactionId: 'İşlem Kimliği:',
  numberofTransactionsPending:
    '{transferCount, number} {transferCount, plural, one {Transfer} other {Transfers}} beklemede',
  assetRecipients:
    'Varlık {transferCount, plural, one {Alıcı} other {Alıcılar}}',
  confirmation: 'Confirmation',
  confirmationRecipient:
    '{transferCount, number} {transferCount, plural, one {Recipient} other {Transfers}}',
  completeExclaim: 'Tamamla!',
  sendQRExplanation:
    // eslint-disable-next-line
    `Size bir QR kodu verildi mi? Yakala'yı tıklayın ve kameranıza tutun.`,
  captureQR: 'Yakala',
  captureQRCaps: 'YAKALA',

  networkConfigTooltipUpdateSettings: 'Ayarları güncelle',
  networkConfigTooltipPublicKey: 'PGENEL ANAHTAR:',
  networkConfigTooltipAddress: 'ADRES:',
}

const AUTH = {
  authLogin: 'Giriş',
  authSaved: 'KAYDEDİLDİ',
  authPrivate: 'ÖZEL',
  authEncrypted: 'ŞİFRELİ',
  authWatch: 'İZLE',
  authLedger: 'LEDGER',
  authCreateWallet: 'Cüzdan Oluştur',
  authImportWallet: 'Cüzdanı İçe Aktar',
  authScanQRButton: 'QR Tarama',
  authLoginButton: 'Giriş',
  authLedgerFirstStep: 'Ledger cihazınızı bağlayın ve kilidini açın',
  authLedgerSecondStep: 'Cihazınızdaki NEO uygulamasına gidin',
  authLedgerAddressLabel: 'GENEL ADRES',
}

const WALLET_CREATION = {
  createANewWallet: 'Yeni Cüzdan Oluştur',
  walletCreationInstruction: 'Ayrıntıları Girin',
  walletCreationWalletNameLabel: 'CÜZDAN ADI',
  walletCreationWalletNamePlaceholder: 'Cüzdan Adı',
  walletCreationWalletPasswordLabel: 'ANAHTAR PAROLASI',
  walletCreationWalletPasswordPlaceholder: 'Şifre',
  walletCreationWalletPasswordConfirmLabel: 'ŞIFREYI ONAYLA',
  walletCreationWalletPasswordConfirmPlaceholder: 'Şifreyi Onayla',
  walletCreationButton: 'Cüzdan Oluştur',
  walletCreatedHeader: 'Cüzdan Oluşturuldu!',
  walletImportedHeader: 'Cüzdan İçe Aktarıldı!',
  walletCreatedDisclaimer:
    '<b> Bu ayrıntıları kaydedin! </b> Bu kimlik bilgilerini kaybederseniz varlıklarınıza erişiminizi kaybedersiniz.',
  privateKeyLabel: 'ÖZEL ANAHTAR',
  encryptedKeyLabel: 'ŞİFRELİ ANAHTAR',
  addressLabel: 'GENEL ADRES',
  splitKeyLabel: 'SPLIT KEY',
  recoverWalletLabel: 'RECOVER WALLET',
  print: 'Yazdır',
  generateQrCodes: 'QR Kodları Oluşturma',
  copyCodeImage: 'Kod Resmini Kopyala',
}

const DASHBOARD = {
  dashboardBalancePanelLabel: 'Token Bakiyesi',
  dashboardAssetsPanelLabel: 'Sistem Varlıkları',
  dashboardAssetsTotal: 'TOPLAM',
  dashboardMarketDataLabel: 'Piyasa verileri',
  dashboardValueLabel: 'Toplam Cüzdan Değeri',
  dashboardAddressLabel: 'Adres:',
  dashboardPriceNotAvailable: 'N/A',
  dashboardGasClaimButton: '{amount} GAS talep edin',
  dashboardManageWallets: 'Cüzdanları Yönet',
  dashboardRefresh: 'Yenile',
  dashboardTokenBalancesToken: 'Token',
  dashboardMarketData1Day: '1 GÜN',
  dashboardMarketData1Week: '1 HAFTA',
  dashboardMarketData1Month: '1 AY',
}

const SIDEBAR = {
  sidebarWallet: 'Cüzdan',
  sidebarActivity: 'Aktivite',
  sidebarSend: 'Gönder',
  sidebarReceive: 'Al',
  sidebarContacts: 'Kişiler',
  sidebarTokenSale: 'Token Satışı',
  sidebarNews: 'Haberler',
  sidebarSettings: 'Ayarlar',
  sidebarLogout: 'Çıkış Yap',
  sidebarCurrentBlock: 'GÜNCEL BLOK',
}

const MANAGE_WALLETS = {
  manageWalletsLabel: 'Cüzdanları Yönet',
  manageWalletsImport: 'İçe Aktar',
  manageWalletsCreate: 'Oluştur',
  manageWalletsEdit: 'Düzenle',
  manageWalletsEditWallet: 'Cüzdanı Düzenle',
  manageWalletsEditWalletInstructions: 'Ayrıntıları Değiştirin',
  manageWalletsEditWalletNameLabel: 'CÜZDAN ADI',
  manageWalletsEditWalletNamePlaceholder: 'Cüzdan Adı',
  manageWalletsEditWalletAddressLabel: 'CÜZDAN ADRESİ',
  manageWalletsEditWalletSave: 'Değişiklikleri Kaydet',
}

const ACTIVITY = {
  activityAddAddress: 'Ekle',
  activityViewTx: 'Görüntüle',
  activityPageLabel: 'Tüm Faaliyetler',
  activityExport: 'Dışa Aktar',
}

const RECEIVE = {
  recieveSelectMethod: 'Yatırma Yöntemini Seç',
  receiveAssetsAddressLabel: 'Genel Adresiniz',
  receivePageLabel: 'Varlıkları Al',
  receiveYourAddressTabLabel: 'ADRESİNİZ',
  receiveCopyCodeButton: 'Kod Resmini Kopyala',
  receiveDisclaimer:
    'Yalnızca <b>NEO blok zinciriyle uyumlu (NEO, GAS vb.)</b> varlıkları gönderin. Diğer varlıkların gönderilmesi kalıcı kayıpla sonuçlanacaktır.',
  receiveRequestTabAssets: 'VARLIKLARI İSTE',
  recieveWhyUseQRLabel: 'Neden bir QR kodu kullanmalıyım?',
  receiveQRExplanation: `<p>Cüzdan adresindeki hatalı bir karakter nedeniyle varlıkları yanlış adrese gönderdiniz mi?</p><p>Hayırsa, şanslısın - ama korkunç bir süreklilikte olur.</p><p>Burada COZ'de size ödeme yapan kişilerin bilgilerinizi doğru almasını sağlamak istiyoruz. Varlıkların talep edilmesine yardımcı olmalarını istemek için bir QR kodu oluşturabilirsiniz.</p><p>Oluşturduğunuz her kod, herkese açık olarak ayarlanan genel cüzdan adresinizi, bir varlık tutarını ve bir referansı içerecektir.</p>`,
}

const REQUEST_ASSETS = {
  requestAssetLabel: 'VARLIK',
  requestAssetAmountLabel: 'Miktar',
  requestAssetAmount: 'MİKTAR',
  requestAssetDepositLabel: 'BU CÜZDANA YATIR',
  requestAssetRefLabel: 'REFERANS',
  requestAssetRefPlaceholder: 'Bir not ekle...',
  requestAssetQRButton: 'QR Kodu Oluştur',
  requestAssetYourQRHeader: 'QR Kodunuz',
  requestAssetsPaymentDetails: 'ÖDEME TALEBİ DETAYLARI',
  requestAssetsYourQRLabel: 'QR KODUNUZ',
  requestAssetsRefLabel: 'REFERANS',
  requestAssetsAddressLabel: 'ADRES',
  requestAssetsAmountLabel: 'MİKTAR',
  requestAssetsAssetLabel: 'VARLIK',
}

const TRANSACTION_FEE = {
  transactionFeeQuestion: 'İŞLEMİNİZ ÜCRETLE ÖNCELİKLENDİRİLSİN Mİ?',
  fast: 'Hızlı',
  faster: 'Daha Hızlı',
  fastest: 'En Hızlı',
  sendWithFee:
    'Ücretli {itemCount, plural, one {Varlık} other {Varlıklar}} Gönder',
  sendWithoutFee:
    'Ücretsiz {itemCount, plural, one {Varlık} other {Varlıklar}} Gönder',
  Asset: 'Varlık',
  assets: 'Varlıklar',
}

const SEND = {
  sendPageLabel: 'Varlıkları Gönder',
  sendImport: 'İçe Aktar',
  sendEnterQRCode: 'QR Kodunu Girin',
  sendAdd: 'Alıcı ekle',
  sendAssetLabel: 'VARLIK',
  sendAmountLabel: 'MİKTAR',
  sendAddressLabel: 'ALICI ADRESİ',
  sendAddressPlaceholder: 'Cüzdan ekle veya kişi seç',
  sendTranfer: 'TRANSFER',
  sendMaxAmount: 'MAKSİMUM',
  sendTransferPlural: 'TRANSFERLER',
  sendAsset: 'varlık',
  sendAssets: 'varlıklar',
  sendRecipient: 'alıcı',
  sendRecipients: 'alıcılar',
  sendAssetCapital: 'Varlık',
  sendAssetsCapital: 'Varlıklar',
  sendRecipientCapital: 'Alıcı',
  sendRecipientsCapital: 'alıcılar',
  sendCompleteNotification:
    'İşlem beklemede! Blockchain işlediğinde bakiyeniz otomatik olarak güncellenecektir.',
  sendSelectAssets:
    '{transferCount, number} of {maxNumberOfRecipients, number} Recipients',
  sendTransferMessage:
    '{transferCount, number} {transferCount, plural, one {transfer} other {transferler}} pending',
  sendBroadcasting: 'İşlemin ağa aktarılması...',
  sendDisclaimer:
    'Fon kaybını önlemek için lütfen doğru ayrıntıları girdiğinizden emin olun.',
  sendActivityLink:
    'İşleminizin durumunu görmek için faaliyet sekmesini kontrol edin.',
  sendCompletion:
    'Tamamla! {transferCount, number} {transferCount, plural, one {varlık} other {varlıklar}} a {transferCount, plural, one {alıcı} other {alıcılar}}',
}

const SETTINGS = {
  settingsNetworkConfigLabel: 'AĞ YAPILANDIRMASI',
  settingCurrencyLabel: 'PARA BİRİMİ',
  settingsThemeLabel: 'TEMA',
  settingsSoundLabel: 'SES',
  settingsEncryptLink: 'ANAHTARI ŞİFRELE',
  recoverWallet: 'CÜZDANI KURTAR',
  settingsRecoverWalletLink: 'İÇE AKTAR',
  settingsBackUpLinkLabel: 'CÜZDANI YEDEKLE',
  settingsBackUpLink: 'DIŞA AKTAR',
  settingsManageLabel: 'Neon Cüzdanınızı yönetin',
  settingsCommunity: 'Topluluk Desteği',
  settingsDonationLink: 'COZ Tarafından oluşturuldu. Bağışlar:',
}

const NETWORK_SETTINGS = {
  networkSettingsInstructions: `Neon Cüzdan'ın blockchainle etkileşimi ile ilgili tüm ağ ayarlarını yönetin`,
  networkSettingsNodeSelectLabel: 'NODE SEÇİMİ',
  networkSettingsExplorerLabel: 'BLOCK EXPLORER',
  networkSettingsCurrentLabel: 'GÜNCEL AĞ',
  networkSettingsAutomatic: 'OTOMATİK',
}

const NODE_SELECTION = {
  nodeSelectPanelHeader: 'Node Seçimi',
  nodeSelectionInstructions:
    'Performans sorunları yaşıyorsanız, aşağıda özel bir node seçmeyi deneyin',
  nodeSelectSelectAutomatically: 'Otomatik olarak seç',
  nodeSelectInfo: 'En iyi {nodeCount, number} nodeler listelendi',
  nodeSelectBlockHeight: 'Blok Yüksekliği',
}

const ENCRYPT_KEY = {
  encryptPanelHeader: 'Anahtarı şifrele',
  encryptInstructions: 'Mevcut bir anahtarı şifrelemek için bir parola seçin',
  encryptStep1Label: '1) ŞİFRELEMEK İSTEDİĞİNİZ ÖZEL ANAHTARI GİRİN',
  encryptStep1Placeholder: 'Anahtarı gir',
  encryptStep2Label: '2) BİR PAROLA OLUŞTURUN',
  encryptStep2Placeholder: 'Parolayı Girin',
  encryptStep3Label: '3) PAROLANIZI ONAYLAYIN',
  encryptStep3Placeholder: 'Parolayı Onayla',
  encryptButton: 'Şifreli Anahtar Oluştur',
}

const TOKEN_SALE = {
  tokenSalePageHeader: 'Token Satışına Katılın',
  tokenSaleDisclaimer1:
    'Lütfen devam etmek için bu ifadeleri okuyun ve onaylayın',
  tokenSaleDisclaimer2: `NEO veya GAS'ı birden çok kez göndermenin, ICO şirketinin politikasına bağlı olarak para kaybına veya gecikmiş geri ödemeye neden olabileceğini anlıyorum.`,
  tokenSaleDisclaimer3: `Bazı satışların yalnızca NEO veya GAS'ı kabul edebileceğini anlıyorum ve hangisinin kabul edildiğini doğruladım.`,
  tokenSaleDisclaimer4: `Zaten sona eren bir token satışına NEO veya GAS gönderirsem NEO / GAS'ımı kaybedeceğim ve geri ödeme yapılmayacağını anlıyorum`,
  // eslint-disable-next-line
  tokenSaleDisclaimer5: `Bu özelliğin kullanımından COZ'un sorumlu olmadığını anlıyorum ve bu yazılımın lisanslarına danıştım.`,
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