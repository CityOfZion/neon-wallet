// @flow
const INPUTS = {
  inputSelectPlaceholder: 'Выбрать',
  inputPasswordPlaceholder: 'Пароль',
  inputEncryptedPlaceholder: 'Зашифрованный ключ',
  authPrivateKeyPlaceholder: 'Введите ваш закрытый ключ',
  authWatchPlaceholder: 'Введите NEO адрес',
}

const MISCELLANEOUS = {
  'auth.cancel': 'Отмена',
  'auth.ledger.connectLedger':
    'Подключите и разблокируйте ваше <strong>Ledger устройство</strong>',
  'auth.ledger.navigateToNeoApp':
    'Перейдите в <strong>NEO приложение</strong> на вашем устройстве',
  'auth.ledger.retry': 'Повторить?',
  'auth.ledger.fetchAddress': 'Загрузить дополнительные адреса',
  publicAddress: 'Открытый Адрес',
  'auth.import.recoveryInstructions':
    'Загрузите файл для восстановления кошелька в формате JSON для того, чтобы добавить адреса в Neon. Эта опция также доступна в "Настройках".',
  importFile: 'Импортировать Файл',
  dashboardTokenBalancesPrice: 'ЦЕНА',
  dashboardTokenBalancesHoldings: 'СУММА',
  settingsLanguageLabel: 'ЯЗЫК',
  addToken: 'Добавить Токен',
  contactsPageLabel: 'Изменить Контакты',
  newContact: 'Новый Контакт',
  deleteLabel: 'Удалить',

  addToContacts: 'Добавить к Контактам',
  contactName: 'Имя',
  enterAContactName: 'Введите имя контакта...',
  enterAWalletAddress: 'Введите адрес кошелька...',
  contactWalletAddress: 'Адрес кошелька',
  editAContact: 'Изменить Контакт',
  modifyDetails: 'Изменить данные',
  removeContact: 'Удалить Контакт',
  saveContactButtonText: 'Сохранить Контакт',

  editContactDisclaimer:
    'Пожалуйста, проверьте и убедитесь, что вы ввели адрес правильно во избежание потери средств',
  addAContact: 'Добавьте Контакт',
  addContactDetails: 'Введите данные',
  confirmRemoveContact: 'Подтвердите удаление контакта',
  modalActionConfirm: 'Подтвердить',
  modalActionCancel: 'Отменить',
  newsPageLabel: 'Новости',
  networkSettingsLabel: 'Настройки сети',

  walletManagerNoLocalInfo:
    'Похоже, что вы не сохранили информацию о кошельке у себя...',

  walletManagerRemoveWallet: 'Удалить Кошелек',

  selectAssets: 'Выбрать Токены',
  priorityTransfer: 'Приоритетный Перевод',

  editRecipients: 'Изменить Получателей',
  confirmAndSend: 'Подтвердить и Отправить',
  fee: 'Комиссия:',
  sendMoreAssets: 'Отправить Ещё Средства',
  transactionId: 'Код Транзакции:',
  numberofTransactionsPending:
    '{transferCount, number} {transferCount, plural, one {Транзакция ожидает} other {Транзакций ожидают}}',
  assetRecipients:
    '{transferCount, plural, one {Получатель} other {Получатели}} Средств',
  confirmation: 'Подтверждение',
  confirmationRecipient:
    '{transferCount, number} {transferCount, plural, one {Получатель} other {Получатели}}',
  completeExclaim: 'Готово!',
  sendQRExplanation:
    // eslint-disable-next-line
    'Итак, вам дали QR-код? Нажмите "Распознать" и держите его перед вашей камерой.',
  captureQR: 'Распознать',
  captureQRCaps: 'РАСПОЗНАТЬ',

  networkConfigTooltipUpdateSettings: 'Изменить Настройки',
  networkConfigTooltipPublicKey: 'ОТКРЫТЫЙ КЛЮЧ:',
  networkConfigTooltipAddress: 'АДРЕС:',
  networkConfigTooltipVotedNode: 'Проголосовать за:',
  networkConfigTooltipQuickVote: 'Quickvote',

  noOptionsMessage: 'Опции отсутствуют',
  isLoadingMessage: 'Загружается...',

  nothingToSeeHere: 'Здесь ничего нет!',

  noAvailableAssetsToSend: 'Недостаточно средств для отправки',
  sendErrorLabel: 'Ошибка!',
  automaticNodeSelectionTooltip:
    'Позволить Neon выбрать узел сети автоматически',

  depositAssets:
    'Получайте средства <b> совместимые с NEO блокчейном </b>, используя ваш адрес:',
  copyAddressTooltip: 'Скопировать Адрес Кошелька',
  walletQrCodes: 'QR-коды Кошелька',

  noClaimableGas: 'Адрес не содержит GAS для запроса',
  claimTimeDisclaimer: 'Вы можете запрашивать GAS раз в 5 минут',
  claimFeeDisclaimerN3:
    'Требование GAS требует не менее 0,01120527 GAS для комиссии за транзакцию.',
  claimFeeGreater: 'Требуемый GAS меньше комиссии за транзакцию',
  claimUnavailableInWatch: 'Запросы на GAS не доступны в режиме "Просмотр"',
  takeMeBack: 'Назад',

  splitKeyWalletInstructions:
    'Опция импорта "Разделить Ключ" позволяет пользователям создать новый NEO аккаунт через объединение закрытого ключа существующего аккаунта и отдельного закрытого ключа.',
  splitKeyWalletNamePlaceholder:
    'Введите название вашего нового кошелька с раздельным ключом...',
  chooseAccount: 'Выберите Существующий Аккаунт',
  nextStep: 'Следующий Шаг',
  previousStep: 'Предыдущий Шаг',
  privateKey: 'Закрытый Ключ',
}

const ERRORS = {
  'errors.contact.nameNull': 'Имя не может быть пустым.',
  'errors.contact.nameLength': 'Имя слишком длинное.',
  'errors.contact.nameDupe': 'У вас уже есть аккаунт с таким именем.',
  'errors.contact.invalidAddress': 'Неправильный адрес.',
  'errors.contact.contactExists': 'У вас уже есть контакт с таким адресом.',

  'errors.password.length': `Пароль должен быть не меньше {PASS_MIN_LENGTH, number} символов.`,
  'errors.password.match': 'Пароли должны совпадать.',
  'errors.request.fractional': `Вы не можете запрашивать нецелый {asset}.`,
  'errors.request.validDecimals': `Вы можете только запрашивать {asset} только размером до {validDecimals, number} чисел.`,
  'errors.request.max': `Вы не можете запрашивать больше чем 100,000,000 {asset}.`,
  'errors.request.min': `Вы не можете запрашивать 0 {asset}.`,
  'errors.network.general': 'Что-то явно пошло не так...',
  'errors.encrypt.valid': 'Неправильный закрытый ключ.',

  'errors.send.balance': `У вас недостаточно средств на балансе, чтобы отправить {total} {asset}.`,
  'errors.send.network': 'Произошла сетевая ошибка',
  'errors.send.number': 'Сумма должна быть числом.',
  'errors.send.fraction': 'Вы не можете отправлять только нецелый NEO.',
  'errors.send.negative': `Вы не можете отправлять отрицательные суммы {asset}.`,
  'errors.send.zero': `Вы не можете отправлять 0 {asset}.`,
  'errors.send.decimal': `Вы можете отправлять {asset} только размером до {decimalCount, number} чисел.`,
  'errors.send.invalidAddress': 'Вы должны ввести правильный адрес NEO.',
  'errors.send.invalidN3Address': 'Вы должны ввести правильный адрес NEO N3.',
  'errors.send.blackListed':
    'Адрес в черном списке. Он был отмечен как фишинговый.',
}

const NOTIFICATIONS = {
  'notifications.success.receivedBlockchainInfo':
    'Получена обновлённая информация о блокчейне.',
  'notifications.success.accountSaved': 'Аккаунт сохранен!',
  'notifications.success.updatedWalletName':
    'Название кошелька успешно обновлено.',
  'notifications.failure.blockchainInfoFailure':
    'В процессе получения информации о блокчейне произошла ошибка.',
}

const AUTH = {
  authLogin: 'Логин',
  authSaved: 'СОХРАНЁННЫЕ',
  authPrivate: 'ЗАКРЫТЫЙ',
  authEncrypted: 'ЗАШИФРОВАННЫЙ',
  authWatch: 'ПРОСМОТР',
  authLedger: 'LEDGER',
  authCreateWallet: 'Создать Кошелек',
  authImportWallet: 'Импортировать Кошелек',
  authMigrateWallets: "Миграция кошельков",
  authScanQRButton: 'Сканировать QR-код',
  authLoginButton: 'Войти',
  authLedgerFirstStep: 'Подключите и разблокируйте своё Ledger устройство',
  authLedgerSecondStep: 'Перейдите в NEO приложение на вашем устройстве',
  authLedgerAddressLabel: 'ОТКРЫТЫЙ АДРЕС',
}

const WALLET_CREATION = {
  createANewWallet: 'Создать Новый Кошелёк',
  walletCreationInstruction: 'Введите Данные',
  walletCreationWalletNameLabel: 'НАЗВАНИЕ КОШЕЛЬКА',
  walletCreationWalletNamePlaceholder: 'Название Кошелька',
  walletCreationWalletPasswordLabel: 'ПАРОЛЬ',
  walletCreationWalletPasswordPlaceholder: 'Пароль',
  walletCreationWalletPasswordConfirmLabel: 'ПОДТВЕРДИТЕ ПАРОЛЬ',
  walletCreationWalletPasswordConfirmPlaceholder: 'Подтвердите Пароль',
  walletCreationButton: 'Создать Кошелёк',
  walletCreatedHeader: 'Кошелёк Создан!',
  walletImportedHeader: 'Кошелёк Создан!',
  walletCreatedDisclaimer:
    '<b>Сохраните эти данные!</b> Если вы потеряете их, то вы потеряете доступ к вашим средствам.',
  privateKeyLabel: 'ЗАКРЫТЫЙ КЛЮЧ',
  encryptedKeyLabel: 'ЗАШИФРОВАННЫЙ КЛЮЧ',
  addressLabel: 'ОТКРЫЙ КЛЮЧ',
  splitKeyLabel: 'РАЗДЕЛИТЬ КЛЮЧ',
  recoverWalletLabel: 'ВОССТАНОВИТЬ КОШЕЛЁК',
  print: 'Напечатать',
  generateQrCodes: 'Сгенерировать QR-код',
  copyCodeImage: 'Скопировать Изображение с QR-кодом',
}

const DASHBOARD = {
  dashboardBalancePanelLabel: 'Баланс Токенов',
  dashboardAssetsPanelLabel: 'Системные Средства',
  dashboardAssetsTotal: 'Всего',
  dashboardMarketDataLabel: 'Рынок',
  dashboardValueLabel: 'Общая Стоимость Кошелька',
  dashboardAddressLabel: 'Адрес:',
  dashboardPriceNotAvailable: 'Н/Д',
  dashboardGasClaimButton: 'Запросить {amount} GAS',
  dashboardManageWallets: 'Изменить Кошельки',
  dashboardRefresh: 'Обновить',
  dashboardTokenBalancesToken: 'Токен',
  dashboardMarketData1Day: '1 ДЕНЬ',
  dashboardMarketData1Week: '1 НЕДЕЛЯ',
  dashboardMarketData1Month: '1 МЕСЯЦ',
}

const SIDEBAR = {
  sidebarWallet: 'Кошелёк',
  sidebarActivity: 'Активность',
  sidebarSend: 'Отправить',
  sidebarReceive: 'Получить',
  sidebarContacts: 'Контакты',
  sidebarTokenSale: 'Распродажа Токенов',
  sidebarNews: 'Новости',
  sidebarSettings: 'Настройки',
  sidebarLogout: 'Выйти',
  sidebarCurrentBlock: 'ТЕКУЩИЙ БЛОК',
}

const MANAGE_WALLETS = {
  manageWalletsLabel: 'Изменить Кошельки',
  manageWalletsImport: 'Импортировать',
  manageWalletsCreate: 'Создать',
  manageWalletsEdit: 'Изменить',
  manageWalletsEditWallet: 'Изменить Кошелёк',
  manageWalletsEditWalletInstructions: 'Изменить Подробности',
  manageWalletsEditWalletNameLabel: 'НАЗВАНИЕ КОШЕЛЬКА',
  manageWalletsEditWalletNamePlaceholder: 'Название Кошелька',
  manageWalletsEditWalletAddressLabel: 'АДРЕС КОШЕЛЬКА',
  manageWalletsEditWalletSave: 'Сохранить Изменения',
}

const ACTIVITY = {
  activityAddAddress: 'Добавить',
  activityViewTx: 'Открыть',
  activityPageLabel: 'Все Операции',
  activityExport: 'Экспортировать',
}

const RECEIVE = {
  recieveSelectMethod: 'Способ Получения Средств',
  receiveAssetsAddressLabel: 'Ваш Открытый Адрес',
  receivePageLabel: 'Получить Средства',
  receiveYourAddressTabLabel: 'ВАШ АДРЕС',
  receiveCopyCodeButton: 'Скопировать Изображение с QR-кодом',
  receiveDisclaimer:
    'Отправляйте только средства, которые <b>совместимы с NEO блокчейном (NEO, GAS и т.д.)</b>. Отправка несовместимых средств приведёт к их потере.',
  receiveRequestTabAssets: 'ЗАПРОСИТЬ СРЕДСТВА',
  recieveWhyUseQRLabel: 'Зачем использовать QR-код?',
  receiveQRExplanation:
    '<p>Отправляли когда-нибудь средства по неправильному адресу из-за опечатки в адресе кошелька?</p><p>Если нет, то вам повезло. Однако, это происходит с пугающей регулярностью.</p>  <p>В CoZ, мы хотим, чтобы люди, которые платят вам, не ошибались при переводе средств. Вы можете сгенерировать QR-код для запроса средств и помочь им.</p><p>Каждый код, который вы сгенерировали, будет включать открытый адрес вашего кошелька, сумму и примечание по вашему выбору.</p>',
}

const REQUEST_ASSETS = {
  requestAssetLabel: 'ТОКЕН',
  requestAssetAmountLabel: 'Сумма',
  requestAssetAmount: 'СУММА',
  requestAssetDepositLabel: 'КОШЕЛЁК ДЛЯ ПОЛУЧЕНИЯ',
  requestAssetRefLabel: 'ПРИМЕЧАНИЕ',
  requestAssetRefPlaceholder: 'Добавить заметку...',
  requestAssetQRButton: 'Сгенерировать QR-код',
  requestAssetYourQRHeader: 'Ваш QR-код',
  requestAssetsPaymentDetails: 'ДЕТАЛИ ЗАПРОСА ПЛАТЕЖА',
  requestAssetsYourQRLabel: 'ВАШ QR-КОД',
  requestAssetsRefLabel: 'ПРИМЕЧАНИЕ',
  requestAssetsAddressLabel: 'АДРЕС',
  requestAssetsAmountLabel: 'СУММА',
  requestAssetsAssetLabel: 'ТОКЕН',
}

const TRANSACTION_FEE = {
  transactionFeeQuestion: 'ПРИОРИТИЗИРОВАТЬ ВАШУ ТРАНЗАКЦИЮ ДОБАВИВ КОМИССИЮ?',
  fast: 'Быстро',
  faster: 'Ещё Быстрее',
  fastest: 'Быстрее Всего',
  sendWithFee:
    'Отправить {itemCount, plural, one {Токен} other {Токены}} с Комиссией',
  sendWithoutFee:
    'Отправить {itemCount, plural, one {Токен} other {Токены}} без Комиссии',
  Asset: 'Токен',
  assets: 'Токены',
}

const SEND = {
  sendPageLabel: 'Отправить Средства',
  sendImport: 'Импортировать',
  sendEnterQRCode: 'Введите QR-код',
  sendAdd: 'Добавить Получателя',
  sendAssetLabel: 'ТОКЕН',
  sendAmountLabel: 'СУММА',
  sendAddressLabel: 'АДРЕС ПОЛУЧАТЕЛЯ',
  sendAddressPlaceholder: 'Добавить кошелёк или выбрать контакт',
  sendTranfer: 'ПЕРЕВОД',
  sendMaxAmount: 'МАКС.',
  sendTransferPlural: 'ПЕРЕВОДЫ',
  sendAsset: 'токен',
  sendAssets: 'токены',
  sendRecipient: 'получатель',
  sendRecipients: 'получатели',
  sendAssetCapital: 'Токен',
  sendAssetsCapital: 'Токены',
  sendRecipientCapital: 'Получатель',
  sendRecipientsCapital: 'Получатели',
  sendCompleteNotification:
    'Транзакция в обработке! Ваш баланс обновится автоматически, когда блокчейн обработает её.',
  sendSelectAssets:
    '{transferCount, number} из {maxNumberOfRecipients, number} Получателей',
  sendTransferMessage:
    '{transferCount, number} {transferCount, plural, one {перевод ожидает} other {переводов ожидают}}',
  sendBroadcasting: 'Оповещение сети о транзакции...',
  sendDisclaimer:
    'Пожалуйста, проверьте и убедитесь, что вы ввели данные правильно во избежание потери средств.',
  sendActivityLink:
    'Проверьте "Активность", чтобы увидеть статус вашей транзакции.',
  sendCompletion:
    'Завершено! {transferCount, number} {transferCount, plural, one {перевод} other {переводов}} для {transferCount, plural, one {получателя} other {получателей}}',
}

const SETTINGS = {
  settingsNetworkConfigLabel: 'НАСТРОЙКИ СЕТИ',
  settingCurrencyLabel: 'ВАЛЮТА',
  settingsThemeLabel: 'ТЕМА ОФОРМЛЕНИЯ',
  settingsSoundLabel: 'ЗВУКОВЫЕ ЭФФЕКТЫ',
  settingsEncryptLink: 'ЗАШИФРОВАТЬ КЛЮЧ',
  recoverWallet: 'ВОССТАНОВИТЬ КОШЕЛЁК',
  settingsRecoverWalletLink: 'ИМПОРТИРОВАТЬ',
  settingsBackUpLinkLabel: 'СДЕЛАТЬ РЕЗЕРВНУЮ КОПИЮ КОШЕЛЬКА',
  settingsBackUpLink: 'ЭКСПОРТИРОВАТЬ',
  settingsManageLabel: 'Настроить ваш Neon кошелёк',
  settingsCommunity: 'Официальная поддержка',
  settingsDonationLink: 'Создано CoZ. Поддержать проект:',
}

const NETWORK_SETTINGS = {
  networkSettingsInstructions:
    'Изменить все настройки, которые использует Neon для работы с блокчейн',
  networkSettingsNodeSelectLabel: 'ВЫБОР УЗЛОВ СЕТИ',
  networkSettingsExplorerLabel: 'ОБОЗРЕВАТЕЛЬ СЕТИ',
  networkSettingsCurrentLabel: 'АКТИВНАЯ СЕТЬ',
  networkSettingsAutomatic: 'АВТОМАТИЧЕСКИ',
}

const NODE_SELECTION = {
  nodeSelectPanelHeader: 'Выбор Узлов Сети',
  nodeSelectionInstructions:
    'Если вы наблюдаете проблемы с производительностью, попробуйте выбрать узел сети из списка ниже',
  nodeSelectSelectAutomatically: 'Выбирать автоматически',
  nodeSelectInfo: 'Отображены топ {nodeCount, number} узлов сети',
  nodeSelectBlockHeight: 'Высота Блока',
}

const ENCRYPT_KEY = {
  encryptPanelHeader: 'Зашифровать ключ',
  encryptInstructions:
    'Введите ключевую фразу для того, чтобы зашифровать существующий ключ',
  encryptStep1Label: '1) ВВЕДИТЕ ЗАКРЫТЫЙ КЛЮЧ, КОТОРЫЙ ВЫ ХОТИТЕ ЗАШИФРОВАТЬ',
  encryptStep1Placeholder: 'Введите ключ',
  encryptStep2Label: '2) СОЗДАЙТЕ КЛЮЧЕВУЮ ФРАЗУ',
  encryptStep2Placeholder: 'Введите ключевую фразу',
  encryptStep3Label: '3) ПОДТВЕРДИТЕ КЛЮЧЕВУЮ ФРАЗУ',
  encryptStep3Placeholder: 'Подтвердите ключевую фразу',
  encryptButton: 'Сгенерировать Зашифрованный Ключ',
}

const TOKEN_SALE = {
  tokenSalePageHeader: 'Принять Участие в Распродаже Токенов',
  tokenSaleDisclaimer1:
    'Пожалуйста, прочтите и примите эти соглашения для того, чтобы продолжить',
  tokenSaleDisclaimer2:
    'Я понимаю, что повторная отправка NEO или GAS токенов может закончиться потерей средств или задержкой с возвратом в зависимости от условий ICO кампании.',
  tokenSaleDisclaimer3:
    'Я понимаю, что некоторые распродажи могут работать только с NEO или GAS и я проверил, что именно они принимают.',
  tokenSaleDisclaimer4:
    'Я понимаю, что если я отправлю NEO или GAS для участия в распродаже токенов, которая уже завершилась, то я потеряю мои NEO/GAS токены и не смогу получить возврат.',
  // eslint-disable-next-line
  tokenSaleDisclaimer5: `Я понимаю, что City of Zion (CoZ) не несет ответственности за использование мной этой возможности и я ознакомился с условиями лицензионного соглашения.`,
}

const MIGRATE_WALLETS_NEON3 = {
  migrateWalletsNeon3AltImage: "Фоновое изображение для миграции кошельков",
  migrateWalletNeon3Title: "Хотите мигрировать ваш кошелек NEON 2 на NEON 3?",
  migrateWalletNeon3Description: "Миграция вашего кошелька даст вам доступ к более широкому спектру поддерживаемых активов и более удобному и улучшенному пользовательскому опыту, который сделает управление вашими активами легким!",
  migrateWalletNeon3Button: "Мигрировать сейчас!",
};

const MIGRATE_WALLETS_NEON3_STEPS = {
  migrateWalletsNeon3Steps1: "Получить NEON 3",
  migrateWalletsNeon3Steps2: "Экспортировать ваши счета NEON 2",
  migrateWalletsNeon3Steps3: "Открыть NEON 3",

  migrateWalletsNeon3Step1Title: "Получить NEON 3",
  migrateWalletsNeon3Step1Description: "Начните с загрузки последней версии NEON и создания вашего первого кошелька:",
  migrateWalletsNeon3Step1DownloadButton: "Скачать NEON 3",
  migrateWalletsNeon3Step1NextStep: "Как только NEON 3 будет установлен на вашем устройстве, перейдите к следующему шагу.",
  migrateWalletsNeon3Step1ButtonLabel: "Далее",

  migrateWalletsNeon3Step2Title: "Экспортировать ваши счета NEON 2",
  migrateWalletsNeon3Step2Description: "Экспортируйте файл миграции NEON 2 на ваш компьютер. Вы будете использовать этот файл для миграции вашего кошелька на NEON 3.",
  migrateWalletsNeon3InputLabel: "Куда вы хотите сохранить свой файл миграции?",
  migrateWalletsNeon3Step2BrowseButton: "Обзор...",
  migrateWalletsNeon3Step2NextStep: "Когда вы определите местоположение для сохранения вашего файла миграции, переходите к следующему шагу.",
  migrateWalletsNeon3Step2ButtonLabel: "Далее",

  migrateWalletsNeon3Step3Title: "Открыть NEON 3",
  migrateWalletsNeon3Step3Description: "Вы почти у цели!",
  migrateWalletsNeon3Step3Description2: "Чтобы завершить процесс миграции, откройте NEON 3 и следуйте инструкциям.",
  migrateWalletsNeon3Step3AltImage: "Фоновое изображение для миграции кошельков",
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
