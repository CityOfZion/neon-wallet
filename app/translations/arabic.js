// @flow
const INPUTS = {
  inputSelectPlaceholder: 'تحديد',
  inputPasswordPlaceholder: 'كلمة السر',
  inputEncryptedPlaceholder: 'المفتاح المشفَّر',
  authPrivateKeyPlaceholder: 'أدخل المفتاح الخاص',
  authWatchPlaceholder: 'NEO أدخل عنوان',
}

const MISCELLANEOUS = {
  'auth.cancel': 'إلغاء',
  'auth.ledger.connectLedger':
    'قم بالاتصال وإلغاء قفل محفظة ليدجر <strong>محفظة ليدجر</strong>',
  'auth.ledger.navigateToNeoApp':
    'انتقل إلى <strong> تطبيق NEO </strong> على جهازك',
  'auth.ledger.retry': 'أعادة المحاولة ؟',
  'auth.ledger.fetchAddress': 'إدخال عناوين جديدة',
  publicAddress: 'المفتاح العمومي',
  'auth.import.recoveryInstructions':
    'قم بتحميل ملف JSON لاستعادة المحفظة هنا لإضافة حساباتك إلى NEON هذا الخيار متوفر أيضاً في قائمة الاعدادات',
  importFile: 'استرداد الملف',
  dashboardTokenBalancesPrice: 'السعر',
  dashboardTokenBalancesHoldings: 'الحاملين',
  settingsLanguageLabel: 'اللغة',
  addToken: 'إضافة عملة',
  contactsPageLabel: 'إدارة جهات الاتصال',
  newContact: 'جهة إتصال جديدة',
  deleteLabel: 'حذف',

  addToContacts: 'إضافة إلى جهات الاتصال',
  contactName: 'الاسم',
  enterAContactName: 'أدخل اسم العقد ...',
  enterAWalletAddress: 'أدخل عنوان المحفظة',
  contactWalletAddress: 'عنوان المحفظة',
  editAContact: 'تعديل جهة إتصال',
  modifyDetails: 'تعديل التفاصيل',
  removeContact: 'إزالة جهة إتصال',
  saveContactButtonText: 'حفظ جهة الاتصال',

  editContactDisclaimer:
    'الرجاء قم بالمراجعة والتأكد من أنك أدخلت العنوان بشكل صحيح تجنباً لخسارة أموالك',
  addAContact: 'إضافة جهة إتصال',
  addContactDetails: 'أضف بيانات جهة الاتصال',
  confirmRemoveContact: 'الرجاء قم بالتأكيد على إزالة جهة الاتصال',
  modalActionConfirm: 'تأكيد',
  modalActionCancel: 'إلغاء',
  newsPageLabel: 'الأخبار',
  networkSettingsLabel: 'إعدادات الشبكة',

  walletManagerNoLocalInfo: 'يظهر أنك لا تملك معلومات محفظة مخزنة محلياً',

  walletManagerRemoveWallet: 'إزالة محفظة',

  selectAssets: 'اختر العملات',
  priorityTransfer: 'الأولوية في الإرسال',

  editRecipients: 'تعديل المستلم',
  confirmAndSend: 'التأكيد والإرسال',
  fee: 'الرسوم:',
  sendMoreAssets: 'إرسال عملات أكثر',
  transactionId: 'بيانات عملية التحويل:',
  numberofTransactionsPending:
    '{transferCount, number} {transferCount, plural, one {Transfer} other {Transfers}} pending',
  assetRecipients:
    'Asset {transferCount, plural, one {Recipient} other {Recipients}}',
  confirmation: 'Confirmation',
  confirmationRecipient:
    '{transferCount, number} {transferCount, plural, one {Recipient} other {Transfers}}',
  completeExclaim: 'اكتمل!',
  sendQRExplanation:
    // eslint-disable-next-line
    'لذا تم إعطاؤك رمز ضوئي ؟ اضغط على لقطة الشاشة وقم بحفظها في الكاميرا',
  captureQR: 'لقطة شاشة',
  captureQRCaps: 'لقطة شاشة',

  networkConfigTooltipUpdateSettings: 'إعدادات التحديث',
  networkConfigTooltipPublicKey: 'المفتاح العمومي:',
  networkConfigTooltipAddress: 'عنوان:',
  networkConfigTooltipVotedNode: 'صوت لصالح:',
  networkConfigTooltipQuickVote: 'Quickvote',

  noOptionsMessage: 'لا يوجد خيارات',
  isLoadingMessage: 'جار التحميل...',

  nothingToSeeHere: 'ليس هناك ما تراه هنا!',
  noAvailableAssetsToSend: 'لا توجد أصول متاحة للإرسال',
  sendErrorLabel: '!خطأ',
  automaticNodeSelectionTooltip: 'السماح لـ NEON باختيار العقدة تلقائيًا',
  depositAssets:
    'Deposit assets <b> compatible  with the NEO blockchain </b> using your address:',
  copyAddressTooltip: 'نسخ عنوان المحفظة',
  walletQrCodes: 'رموز QR المحفظة',

  // TODO: implement all
  noClaimableGas: 'العنوان لا يوجد لديه غاز يمكن المطالبة به',
  claimTimeDisclaimer: 'يمكنك المطالبة بالغاز مرة كل 5 دقائق',
  claimFeeDisclaimerN3:
    'تتطلب المطالبة بـ GAS 0.01120527 GAS على الأقل مقابل رسوم المعاملات',
  claimFeeGreater: 'الغاز القابل للمطالبة به أقل من رسوم المعاملات',
  claimUnavailableInWatch: 'مطالبات GAS غير متاحة في وضع المشاهدة',
  takeMeBack: 'اعدني',

  // TODO: also update placeholders
  splitKeyWalletInstructions:
    'يسمح خيار استيراد المفتاح المقسم للمستخدمين بإنشاء حساب NEO جديد من خلال الجمع بين المفتاح الخاص لحساب موجود ومفتاح خاص منفصل.',
  splitKeyWalletNamePlaceholder: 'أدخل اسم محفظة المفاتيح المقسمة الجديدة ...',
  chooseAccount: 'اختر حسابًا موجودًا',
  nextStep: 'الخطوة التالية',
  previousStep: 'خطوة سابقة',
  privateKey: 'مفتاح سري',
}

const ERRORS = {
  'errors.contact.nameNull': 'لا يمكن أن يكون الاسم فارغًا.',
  'errors.contact.nameLength': 'الاسم طويل جدا.',
  'errors.contact.nameDupe': 'لديك بالفعل حساب محفوظ بهذا الاسم.',
  'errors.contact.invalidAddress': 'العنوان غير صالح.',
  'errors.contact.contactExists': 'لديك بالفعل اتصال بهذا العنوان.',

  'errors.password.length': `يجب أن تحتوي عبارة المرور على 4 أحرف على الأقل`,
  'errors.password.match': 'يجب أن تتطابق عبارات المرور',
  'errors.request.fractional': `لا يمكنك طلب كسور {asset}.`,
  'errors.request.validDecimals': `يمكنك فقط طلب {asset} حتى {validDecimals، number} عشرية.`,
  'errors.request.max': `You cannot request more than 100,000,000 {asset}.`,
  'errors.request.min': `You cannot request 0 {asset}.`,
  'errors.network.general': 'وجه الفتاة! هناك خطأ ما.',
  'errors.encrypt.valid': 'المفتاح الخاص غير صالح',

  'errors.send.network': 'حدث خطأ في الشبكة',
  'errors.send.balance': `ليس لديك رصيد كافٍ لإرسال {total} {asset}.`,
  'errors.send.number': 'يجب أن يكون المبلغ رقمًا.',
  'errors.send.fraction': 'لا يمكنك إرسال كميات قليلة من NEO.',
  'errors.send.negative': `لا يمكنك إرسال مبالغ سلبية لـ {asset}.`,
  'errors.send.zero': `Can not send 0 {asset}.`,
  'errors.send.decimal': `يمكنك فقط إرسال {asset} حتى {decimalCount, number} عشرية.`,
  'errors.send.invalidAddress': 'تحتاج إلى تحديد عنوان NEO صالح.',
  'errors.send.invalidN3Address': 'تحتاج إلى تحديد عنوان NEO N3 صالح.',
  'errors.send.blackListed':
    'تم إدراج العنوان في القائمة السوداء. هذا عنوان تصيد معروف.',
}

const NOTIFICATIONS = {
  'notifications.success.receivedBlockchainInfo':
    'تلقي أحدث معلومات blockchain.',
  'notifications.success.accountSaved': 'تم حفظ الحساب!',
  'notifications.success.updatedWalletName': 'تم تحديث اسم المحفظة بنجاح.',
  'notifications.failure.blockchainInfoFailure':
    'فشل في استعادة معلومات blockchain.',
}

// end TODO

const AUTH = {
  authLogin: 'تسجيل الدخول',
  authSaved: 'الحفظ',
  authPrivate: 'سرّي',
  authEncrypted: 'مشفَّر',
  authWatch: 'شاهد',
  authLedger: 'LEDGER',
  authCreateWallet: 'إنشاء محفظة',
  authImportWallet: 'استرداد محفظة',
  authMigrateWallets: "ترحيل المحافظ",
  authScanQRButton: 'امسح الرمز الضوئي',
  authLoginButton: 'تسجيل الدخول',
  authLedgerFirstStep: 'قم بتوصيل وإلغاء قفل محفظة ليدجر',
  authLedgerSecondStep: 'انتقل إلى تطبيق NEO على جهازك',
  authLedgerAddressLabel: 'المفتاح العمومي',
}

const WALLET_CREATION = {
  createANewWallet: 'إنشاء محفظة جديدة',
  walletCreationInstruction: 'إدخال التفاصيل',
  walletCreationWalletNameLabel: 'إسم المحفظة',
  walletCreationWalletNamePlaceholder: 'إسم المحفظة',
  walletCreationWalletPasswordLabel: 'العبارة السرِّية',
  walletCreationWalletPasswordPlaceholder: 'كلمة السر',
  walletCreationWalletPasswordConfirmLabel: 'تأكيد كلمة السر',
  walletCreationWalletPasswordConfirmPlaceholder: 'تأكيد كلمة السر',
  walletCreationButton: 'إنشاء محفظة',
  walletCreatedHeader: '!تم إنشاء المحفظة',
  walletImportedHeader: '!تم إنشاء المحفظة',
  walletCreatedDisclaimer:
    '<b>!قم بحفظ هذه البيانات</b> إذا فقدت هذه البيانات, ستفقد إمكانية الوصول إلى أموالك.',
  privateKeyLabel: 'المفتاح الخاص',
  encryptedKeyLabel: 'المفتاح المشفَّر',
  addressLabel: 'العنوان العام',
  splitKeyLabel: 'SPLIT KEY',
  recoverWalletLabel: 'RECOVER WALLET',
  print: 'طباعة',
  generateQrCodes: 'QRتوليد رمز ',
  copyCodeImage: 'نسخ صورة الكود',
}

const DASHBOARD = {
  dashboardBalancePanelLabel: 'الرصيد',
  dashboardAssetsPanelLabel: 'عملات النظام',
  dashboardAssetsTotal: 'الرصيد الإجمالي',
  dashboardMarketDataLabel: 'بيانات السوق',
  dashboardValueLabel: 'القيمة الإجمالية المحفظة',
  dashboardAddressLabel: 'العناوين:',
  dashboardPriceNotAvailable: 'N/A',
  dashboardGasClaimButton: 'Claim {amount} GAS',
  dashboardManageWallets: 'إدارة المحافظ',
  dashboardRefresh: 'تحديث',
  dashboardTokenBalancesToken: 'عملة',
  dashboardMarketData1Day: 'يوم واحد',
  dashboardMarketData1Week: 'إسبوع واحد',
  dashboardMarketData1Month: 'شهر واحد',
}

const SIDEBAR = {
  sidebarWallet: 'المحفظة',
  sidebarActivity: 'الأنشطة',
  sidebarSend: 'إرسال',
  sidebarReceive: 'إسلام',
  sidebarContacts: 'جهات الإتصال',
  sidebarTokenSale: 'عرض بيع العملة',
  sidebarNews: 'الأخبار',
  sidebarSettings: 'الضبط',
  sidebarLogout: 'تسجيل الخروج',
  sidebarCurrentBlock: 'البلوك الحالي',
}

const MANAGE_WALLETS = {
  manageWalletsLabel: 'إدارة المحافظ',
  manageWalletsImport: 'استرداد',
  manageWalletsCreate: 'إنشاء',
  manageWalletsEdit: 'تعديل',
  manageWalletsEditWallet: 'تعديل المحفظة',
  manageWalletsEditWalletInstructions: 'تعديل البيانات',
  manageWalletsEditWalletNameLabel: 'إسم المحفظة',
  manageWalletsEditWalletNamePlaceholder: 'إسم المحفظة',
  manageWalletsEditWalletAddressLabel: 'عنوان المحفظة',
  manageWalletsEditWalletSave: 'احتفظ بالتعديلات',
}

const ACTIVITY = {
  activityAddAddress: 'إضافة',
  activityViewTx: 'عرض',
  activityPageLabel: 'كافة الأنشطة',
  activityExport: 'تصدير',
}

const RECEIVE = {
  recieveSelectMethod: 'اختر طريقة الإيداع',
  receiveAssetsAddressLabel: 'مفتاحك العمومي',
  receivePageLabel: 'استلام أموال',
  receiveYourAddressTabLabel: 'عنوانك',
  receiveCopyCodeButton: 'نسخ صورة الكود',
  receiveDisclaimer:
    'قم فقط بإرسال العملات التي تتطابق مع بلوكشين NEO (NEO,GAS,ETC) إرسال عملات أُخرى ممكن أن يؤدي إلى فقدان دائم',
  receiveRequestTabAssets: 'طلب أموال',
  recieveWhyUseQRLabel: '؟QR لماذا يجب أن تستخدم رمز ',
  receiveQRExplanation: `<p>هل سبق  وأرسلت عملاتك إلى العنوان الخطأ بسبب خطأ في عنوان المحفظة؟ إن لم يحدث ذلك ، لحسن حظك - لكنه يحدث بإنتظام مخيف. هنا السبب ، نريد أن نضمن للناس الذين يدفعون لك الحصول على التفاصيل الصحيحة. يمكنك توليد رمز QR لطلب العملات لمساعدتهم على مساعدتك. كل رمز تقوم بإنشائه سوف يتضمن عنوان محفظتك العامة ، وكمية العملات والمرجعية - كل شيء بإدارتك.</p>`,
}

const REQUEST_ASSETS = {
  requestAssetLabel: 'الرصيد',
  requestAssetAmountLabel: 'الكمية',
  requestAssetAmount: 'الكمية',
  requestAssetDepositLabel: 'إيداع إلى هذه المحفظة',
  requestAssetRefLabel: 'المرجع',
  requestAssetRefPlaceholder: 'أضف ملاحظة',
  requestAssetQRButton: 'توليد رمز QR',
  requestAssetYourQRHeader: 'رمز QR الخاص بك',
  requestAssetsPaymentDetails: 'تفاصيل طلب المدفوعات الخاص بك',
  requestAssetsYourQRLabel: 'رمز QR الخاص بك',
  requestAssetsRefLabel: 'المرجع',
  requestAssetsAddressLabel: 'العنوان',
  requestAssetsAmountLabel: 'الكمية',
  requestAssetsAssetLabel: 'الرصيد',
}

const TRANSACTION_FEE = {
  transactionFeeQuestion:
    'تعطي الأولوية لعمليات التحويل الخاصة بك مقابل الرسوم؟',
  fast: 'سريع',
  faster: 'أسرع',
  fastest: 'الأسرع',
  sendWithFee: 'Send {itemCount, plural, one {Asset} other {Assets}} With Fee',
  sendWithoutFee:
    'Send {itemCount, plural, one {Asset} other {Assets}} Without Fee',
  Asset: 'الرصيد',
  assets: 'الأرصدة',
}

const SEND = {
  sendPageLabel: 'إرسال أموال',
  sendImport: 'إسترداد',
  sendEnterQRCode: 'أدخال رمز QR ',
  sendAdd: 'أضف عنوان مستقبل',
  sendAssetLabel: 'الرصيد',
  sendAmountLabel: 'الكمية',
  sendAddressLabel: 'عنوان المستلم',
  sendAddressPlaceholder: 'أضف محفظة أو اختر جهة إتصال',
  sendTranfer: 'تحويل',
  sendMaxAmount: 'الإجمالي',
  sendTransferPlural: 'عمليات التحويل',
  sendAsset: 'رصيد',
  sendAssets: 'أرصدة',
  sendRecipient: 'المستلم',
  sendRecipients: 'المستلمون',
  sendAssetCapital: 'رصيد',
  sendAssetsCapital: 'أرصدة',
  sendRecipientCapital: 'المستلم',
  sendRecipientsCapital: 'المستلمون',
  sendCompleteNotification:
    'العملية معلقة! رصيدك سيتم تحديثه تلقائيا عندما تقوم الشبكة بمعالجته',
  sendSelectAssets:
    '{transferCount, number} of {maxNumberOfRecipients, number} Recipients',
  sendTransferMessage:
    '{transferCount, number} {transferCount, plural, one {sendTransfer} other {sendTransferPlural}} pending',
  sendBroadcasting: 'تحويل المعاملة إلى الشبكة ....',
  sendDisclaimer:
    ' يرجى المراجعة والتأكد من أنكم قد أدخلتم التفاصيل الصحيحة لتجنب فقدان الأموال.',
  sendActivityLink: 'تحقق من قائمة النشاط لرؤية حالة معاملتك.',
  sendCompletion:
    'Complete! {transferCount, number} {transferCount, plural, one {sendAsset} other {sendAssets}} to {transferCount, plural, one {sendRecipient} other {sendRecipients}}',
}

const SETTINGS = {
  settingsNetworkConfigLabel: 'إعدادات الشبكة',
  settingCurrencyLabel: 'العملة',
  settingsThemeLabel: 'الخلفية',
  settingsSoundLabel: 'الصوت',
  settingsEncryptLink: 'مفتاح التشفير',
  recoverWallet: 'مفتاح التشفير',
  settingsRecoverWalletLink: 'استرداد',
  settingsBackUpLinkLabel: 'استرجاع المحفظة',
  settingsBackUpLink: 'تصدير',
  settingsManageLabel: 'إدارة محفظة NEO',
  settingsCommunity: 'دعم العُملاء',
  settingsDonationLink: 'أُنشئت من قبل COZ. التبرعات:',
}

const NETWORK_SETTINGS = {
  networkSettingsInstructions:
    'إدارة كافة ضبط الشبكات  المتعلقة بكيفيّة تفاعل محفظة NEON مع البلوكشين',
  networkSettingsNodeSelectLabel: 'اختيار النود',
  networkSettingsExplorerLabel: 'مستكشف عمليات التحويل',
  networkSettingsCurrentLabel: 'الشبكة الحالية',
  networkSettingsAutomatic: 'آلي',
}

const NODE_SELECTION = {
  nodeSelectPanelHeader: 'اختيار النود',
  nodeSelectionInstructions: 'إذا حصلت لك مشكلة في الأداء قم باختيار نود مخصص ',
  nodeSelectSelectAutomatically: 'اختيار تلقائي',
  nodeSelectInfo: 'Top {nodeCount, number} nodes listed',
  nodeSelectBlockHeight: 'البلوك الأعلى',
}

const ENCRYPT_KEY = {
  encryptPanelHeader: 'تشفير المفتاح',
  encryptInstructions: 'اختر عبارة سرية لتشفير مفتاح متواجد',
  encryptStep1Label: '1) قم بإدخال مفتاح خاص تريده للقيام بالمصادقة',
  encryptStep1Placeholder: 'أدخل المفتاح',
  encryptStep2Label: '2) أدخل عبارة سرية',
  encryptStep2Placeholder: 'أدخل العبارة السرية',
  encryptStep3Label: '3) قم بتأكيد العبارة السرية',
  encryptStep3Placeholder: 'تأكيد العبارة السرية',
  encryptButton: 'توليد مفتاح مشفر',
}

const TOKEN_SALE = {
  tokenSalePageHeader: 'قم بالانضمام إلى البيع الخاص',
  tokenSaleDisclaimer1: 'الرجاء قم بقراءة وفهم هذه الاتفاقيات للمتابعة',
  tokenSaleDisclaimer2:
    'أنا أفهم أن NEO أو GAS لمرات عديدة ممكن أن تودي إلى ضياع الرصيد أو تأخير استرجاع الرصيد اعتماداً على السياسات للشركة التي تقوم بعملية البيع الأولي',
  tokenSaleDisclaimer3:
    'أنا أفهم أن بعض عمليات البيع ممكن أن تقبل فقط عملتي NEO او GAS وأنا قمت بتأكيد العملة المطلوبة ',
  tokenSaleDisclaimer4:
    'أنا أفهم أنه إذا أرسلت NEO أو GAS إلى عملية بيع التي انتهت للتو ، سأقوم بفقدان أموالي ولا يمكن استرجاعها',
  // eslint-disable-next-line
  tokenSaleDisclaimer5: `أنا أفهم أن COZ ليست مسؤولة عن استخدامي لهذه الميزة ، وقمت بقراءة اتفاقية البرنامج`,
}

const MIGRATE_WALLETS_NEON3 = {
  migrateWalletsNeon3AltImage: "صورة خلفية ترحيل المحافظ",
  migrateWalletNeon3Title: "هل ترغب في ترحيل محفظتك NEON 2 إلى NEON 3؟",
  migrateWalletNeon3Description: "سيمنحك ترحيل محفظتك الوصول إلى مجموعة أوسع من الأصول المدعومة، وتجربة مستخدم محسنة وأكثر أناقة ستجعل إدارة أصولك سهلة!",
  migrateWalletNeon3Button: "ترحيل الآن!",
}

const MIGRATE_WALLETS_NEON3_STEPS = {
  migrateWalletsNeon3Steps1: 'احصل على NEON 3',
  migrateWalletsNeon3Steps2: 'قم بتصدير حساباتك في NEON 2',
  migrateWalletsNeon3Steps3: 'افتح NEON 3',

  migrateWalletsNeon3Step1Title: "احصل على NEON 3",
  migrateWalletsNeon3Step1Description: "ابدأ بتنزيل آخر إصدار من NEON وأنشئ أول محفظة لك:",
  migrateWalletsNeon3Step1DownloadButton: "تحميل NEON 3",
  migrateWalletsNeon3Step1NextStep: "بمجرد تثبيت NEON 3 على جهازك، انتقل إلى الخطوة التالية.",
  migrateWalletsNeon3Step1ButtonLabel: "التالي",

  migrateWalletsNeon3Step2Title: "قم بتصدير حساباتك في NEON 2",
  migrateWalletsNeon3Step2Description: "قم بتصدير ملف ترحيل NEON 2 إلى جهاز الكمبيوتر الخاص بك. ستستخدم هذا الملف لترحيل محفظتك إلى NEON 3.",
  migrateWalletsNeon3InputLabel: "إلى أي مكان ترغب في حفظ ملف الترحيل؟",
  migrateWalletsNeon3Step2BrowseButton: "تصفح...",
  migrateWalletsNeon3Step2NextStep: "عندما تحدد موقعًا لحفظ ملف الترحيل الخاص بك، انتقل إلى الخطوة التالية.",
  migrateWalletsNeon3Step2ButtonLabel: "التالي",

  migrateWalletsNeon3Step3Title: "افتح NEON 3",
  migrateWalletsNeon3Step3Description: "أنت على وشك الانتهاء!",
  migrateWalletsNeon3Step3Description2: "لإكمال عملية الترحيل، افتح NEON 3 واتبع التعليمات.",
  migrateWalletsNeon3Step3AltImage: "صورة خلفية ترحيل المحافظ",
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
