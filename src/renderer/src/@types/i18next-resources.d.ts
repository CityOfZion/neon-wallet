interface Resources {
  common: {
    general: {
      continue: 'Continue'
      next: 'Next'
      save: 'Save'
      edit: 'Edit'
      cancel: 'Cancel'
      reset: 'Reset'
      successfullyCopied: 'Successfully copied to clipboard'
      receive: 'Receive'
      send: 'Send'
      passwordNEONQRCode: 'QRCode'
      downloadQRCodePassword: 'Download password QR code'
    }
    walletConnect: {
      name: 'Neon Wallet'
      description: 'Create and organize wallets, or easily import your existing ones, to safely manage and transfer your assets across accounts with Neon’s slick interface.'
    }
    wallet: {
      importedName: 'Imported Wallet'
      encryptedName: 'Encrypted Wallet'
      watchAccount: 'Watch Account'
      mnemonicWalletName: 'Mnemonic Wallet'
      firstWalletName: 'My First Wallet'
    }
    account: {
      defaultName: 'Account {{accountNumber}}'
    }
    blockchain: {
      neo3: 'Neo'
      neoLegacy: 'Neo Legacy'
      ethereum: 'Ethereum'
    }
    networkTypeLabel: {
      mainnet: 'MainNet'
      testnet: 'TestNet'
    }
  }
  components: {
    sidebar: {
      portfolio: 'Portfolio'
      wallets: 'Wallets'
      settings: 'Settings'
      logout: 'Logout'
      send: 'Send'
      receive: 'Receive'
      nfts: 'NFTs'
      contacts: 'Contacts'
      news: 'News'
      mobile: 'Mobile app'
      link: {
        isNew: 'New'
      }
    }
    walletsSelect: {
      title: 'Wallets'
      placeholder: 'Select a wallet...'
    }
    walletAccordionList: {
      noAccounts: 'No accounts'
    }
    contacts: {
      search: 'Search'
      noContacts: 'No contacts'
    }
    blockchainSelection: {
      search: 'Search...'
    }
    wallets: {
      cancelButtonLabel: 'Cancel'
      saveButtonLabel: 'Save'
    }
    tokenBalance: {
      token: 'Token'
      quantity: 'Quantity'
      price: 'Price'
    }
    tokensTable: {
      ticker: 'TICKER'
      token: 'TOKEN'
      holdings: 'HOLDINGS'
      price: 'PRICE'
      value: 'VALUE'
      empty: 'No tokens to display'
    }
    blockchainDataPanel: {
      tabs: {
        tokens: 'TOKENS'
        nfts: 'NFTS'
        transactions: 'TRANSACTIONS'
      }
      title: 'All accounts'
    }
    transactionsTable: {
      blockchain: 'BLOCKCHAIN'
      date: 'DATE'
      asset: 'ASSET'
      amount: 'AMOUNT'
      from: 'FROM'
      to: 'TO'
      viewButtonLabel: 'View'
      empty: 'No transactions to display'
      doraError: 'Dora does not support this blockchain'
    }
    balanceChart: {
      othersTokens: 'Others'
      noAssets: 'No assets'
    }
    balanceChartPanel: {
      holdings: 'Holdings'
      walletsAndAccounts: '{{wallets}} Wallets / {{accounts}} Accounts'
      totalValue: 'Total value'
    }
    transactionsTableEmpty: {
      title: 'Your wallet is currently empty, why not add some assets or connect a dApp?'
      subtitle: 'Your wallet is compatible with Neo, Gas and Ethereum assets'
      requestAssetsLabel: 'Request assets'
      importAccountLabel: 'Import account'
    }
    contactAddressTable: {
      blockchain: 'BLOCKCHAIN'
      address: 'ADDRESS'
      sendAssets: 'Send assets'
    }
    blockchainSelect: {
      placeholder: 'Select a blockchain...'
    }
    connectionsTable: {
      name: 'Name'
      connected: 'Connected'
      chain: 'Chain'
      account: 'Account'
      disconnect: 'Disconnect'
      emptyList: 'No dApp connections'
    }
  }
  hooks: {
    useImportAction: {
      errors: {
        invalid: 'Invalid text'
        empty: 'Please enter some text'
        allAddressesAlreadyImported: 'All addresses are already imported'
        mnemonicIncomplete: 'Mnemonic incomplete'
      }
    }
  }
  modals: {
    import: {
      title: 'Import'
      subtitle: 'IMPORT'
      description: 'To import your wallet, enter an address, encrypted key, private key or mnemonic words:'
      inputPlaceholder: 'Please ender an address or key...'
      buttonContinueLabel: 'Next'
      errors: {
        allAddressesAlreadyImported: 'All addresses are already imported'
      }
      success: {
        mnemonic: 'Mnemonic complete!'
        key: 'Private key complete!'
        encrypted: 'Encrypted key complete!'
        address: 'Address complete!'
      }
      importEncryptedDescription: 'Select the desired blockchain for your new account'
      addressAlreadyExist: 'Address already exists'
      successEncryptKey: 'Encrypted key successfully imported!'
    }
    addWatch: {
      title: 'Add a watch account'
      description: "Enter the address that you'd like to watch:"
      inputPlaceholder: 'Please ender an address'
      information: "You won't be able to use the assets in this account!"
      willBeAdded: 'This account will be added:'
      buttonAdd: 'Add Watch Account'
      errors: {
        invalid: 'Invalid address'
        empty: 'Please enter some text'
      }
    }
    editWallet: {
      title: 'Edit Wallet'
      inputPlaceholder: 'Enter your wallet name...'
      saveButtonLabel: 'Save'
      cancelButtonLabel: 'Cancel'
      nameLengthError: 'Name must be at least 1 character long'
    }
    persistAccount: {
      titleEdit: 'Edit Account'
      titleCreate: 'Create new account'
      subtitleCreate: "Creating an account is easy, just give it a name and select a colour below and you're done!"
      inputLabel: 'Account name'
      inputPlaceholder: 'Enter your account name...'
      inputSubtitle: 'It could be helpful to name your account with a label related to what you want to use the account for (such as ‘Investments’ or ‘Trading’).'
      selectBlockchainDescription: 'Please select which chain you would like to use for this account.'
      colorSelectorLabel: 'Select an account colour'
      saveButtonLabel: 'Save'
      nextButtonLabel: 'Next'
      cancelButtonLabel: 'Cancel'
      deleteAccountTitle: 'Delete Account'
      deleteAccountSubtext: 'Deleting an account that contains assets will cause these assets to become inaccessible after deletion!'
    }
    createWallet: {
      title: 'Create Wallet'
      heading: 'Creating your new BIP39 wallet'
      step1Header: 'Generate security phrase'
      step1Description: 'This set of secret words make it easy to back up and restore your account. This makes your wallet really secure'
      step2Header: 'Confirm security phrase'
      step2Description: 'It’s really important you remember your phrase correctly so we will help you with that. If you’re in a rush you can do it another time.'
      step3Header: 'Give your new wallet a name and passphrase'
      step3Description: 'Give your wallet a memorable name and passphrase and your ready to go!'
      step1: {
        title: 'Generate security phrase'
        step1of3: '1 of 3'
        description: 'Write this phrase down on a piece of paper or record it in a secure digital note. You can also download it below but be sure to keep it safe.'
        copyButtonLabel: 'Copy'
        printButtonLabel: 'Print'
        nextButtonLabel: 'Next'
        warning: 'Anyone with this phrase will be able to access your hard-earned assets and you won’t be able to get them back!'
      }
      step2: {
        title: 'Confirm security phrase'
        step2of3: '2 of 3'
        description: 'Please select each phrase in the correct order to make sure you’ve got it right:'
        nextButtonLabel: 'Next'
        warning: 'If you can’t remember your security phrase, don’t worry, you can find it in the ‘Settings’ section of the wallet'
        tryAgain: 'Please try again to confirm your back up'
      }
      step3: {
        title: 'Give your new wallet a name and passphrase'
        step3of3: '3 of 3'
        description: 'Give your wallet a memorable name, it could be helpful to name it with a label related to what you want to use the wallet for (such as ‘Investments’ or ‘Trading Wallet’).'
        inputLabel: 'Wallet name'
        inputPlaceholder: 'Enter your wallet name...'
        createWalletButtonLabel: 'Create wallet'
        nameLengthError: 'Name must be at least 1 character long'
      }
      step4: {
        title: 'Congratulations, you’re now the proud owner of a shiny new wallet!'
        description: 'Remember to keep your secret phrase safe, having several backups is always a good idea. If you need to find out a wallets secret phrase you can find it in the settings page for that wallet.'
        viewWalletButtonLabel: 'View wallet'
      }
    }
    persistContactModal: {
      addContact: 'Add Contact'
      editContact: 'Edit Contact'
      invalidName: 'Invalid name'
      emptyAddresses: 'No address added'
      noAddressesFound: 'No addresses found'
      addAddress: 'Add address'
      saveContact: 'Save contact'
      name: 'NAME'
      enterAName: 'Enter a name...'
      addresses: 'ADDRESSES'
      deleteContact: {
        title: 'Delete contact'
        warningText: 'Delete this contact?'
        warningDescription: 'All saved addresses will be unlinked from this contact'
        buttonDeleteLabel: 'Delete this contact'
      }
      deleteAddress: {
        title: 'Delete address'
        warningText: 'Delete this address?'
        warningDescription: 'This address will be unlinked from'
        buttonDeleteLabel: 'Delete this address'
      }
    }
    addAddress: {
      title: 'Add address'
      editTitle: 'Edit address'
      name: 'NAME'
      blockchain: 'BLOCKCHAIN'
      addressOrDomain: 'ADDRESS OR NS DOMAIN'
      errorNoBlockchainSelected: 'No blockchain selected'
      addressComplete: 'Address complete!'
      nnsComplete: 'NS domain found!'
      invalidAddress: 'Invalid address or NS domain'
      saveAddress: 'Save address'
    }
    importMnemonicAccountsSelection: {
      title: 'Import'
      description: 'Select the addresses you’d like to import:'
      importButtonLabel: 'Import'
      noAccountsToImport: 'No accounts to import'
    }
    importKeyAccountsSelection: {
      title: 'Import'
      description: 'Select the addresses you’d like to import:'
      importButtonLabel: 'Import'
      noAccountsToImport: 'No accounts to import'
    }
    dappDisconnection: {
      title: 'Connection details'
      disconnectAllApps: 'Disconnect all applications?'
      disconnectApp: 'Disconnect application?'
      totalDapps: '{{totalDapps}} applications'
      willRemove: 'will be permanently removed'
      warning: 'Are you sure you want to continue?'
      disconnect: 'Disconnect'
      cancel: 'Cancel'
    }
    dappConnection: {
      title: 'Connect with a dApp'
      description: 'All transactions requested by a connected dApp will <strong>require your permission before being broadcast</strong> to the blockchain.'
      disclaimer: 'No actions that are initiated by the dApp will happen without your direct approval.'
      inputPlaceholder: 'Paste your URL here...'
      buttonConnectLabel: 'Connect'
      errors: {
        errorToConnect: 'Oops! we’ve encountered an error. Try to generate a new uri and try again.'
      }
    }
    dappConnectionDetails: {
      title: 'This app wants to connect!'
      description: '{{name}} wants to connect to your wallet'
      connectionDetailsTitle: 'Connection details'
      successModal: {
        title: 'Connect a dApp'
        subtitle: 'A new dApp has been connected!'
        buttonReturnLabel: 'Return to your dashboard'
      }
      errorModal: {
        title: 'Connect a dApp'
        subtitle: 'Oops! we’ve encountered an error'
        subtitle2: 'The dApp hasn’t been connected'
        subtitle3: 'Please try again later.'
        buttonReturnLabel: 'Return to your dashboard'
      }
    }
    dappConnectionAccountSelection: {
      title: 'Connect to an account'
      description: 'Which account do you want to connect ?'
    }
    dappConnectionListModal: {
      title: 'Connected dApps'
      inputPlaceholder: 'Search for dApp...'
      listTitle: 'Your connected dApps'
      emptyList: 'No dApp connections'
      buttonLabel: 'Connect new'
    }
    selectContact: {
      title: 'Select a contact'
      selectRecipient: 'Select recipient'
    }
    blockchaiinSelectionModal: {
      buttonContinueLabel: 'Next'
    }
    decryptKeyModal: {
      title: 'Import'
      description: 'Enter a pass phrase for your encrypted key:'
      inputPlaceholder: 'Enter your pass phrase...'
      buttonContinueLabel: 'Import'
    }
    selectAccount: {
      yourAccounts: 'Your accounts:'
      placeholder: 'Select a wallet...'
      noAccounts: 'No accounts'
    }
    selectToken: {
      title: 'Select token to send'
      yourBalances: 'Your token balances:'
      selectToken: 'Select token'
    }
    inputAmount: {
      title: 'Amount you want to send'
      enterTokenAmount: 'Enter token amount:'
      fiatValue: 'Fiat value (USD estimated)'
      balanceAfterTransaction: 'Balance after transaction'
      insufficientBalanceAvailable: 'Insufficient balance available'
      max: 'Max'
      or: 'OR'
      inputPlaceholder: '0,000.00'
      enterUsdAmount: 'Enter a USD amount:'
      roundDown: 'Round down'
      selectAmountSend: 'Select amount to send'
      tokenValue: 'Token value'
    }
    networkSelection: {
      title: 'Network'
      selectNetwork: 'Select a network'
    }
    dappPermission: {
      unsupportedMethodError: 'The method {{method}} is not supported'
      cancelled: 'Request cancelled'
      errorModal: {
        heading: 'Dapp Request'
        subtitle: 'Request failed'
        text: "I'm sorry but your request could not be processed."
        errorMessageLabel: 'ERROR MESSAGE'
      }
      requests: {
        neo3: {
          contractInvocation: {
            subtitle: 'Confirm that you’d like to proceed'
            overrideFeeInfo: 'The dApp has overwritten the fees'
            feeError: 'Error to calculate fee. The request was cancelled.'
            feeLabel: 'Fee'
            hashLabel: 'HASH'
            signatureScopeTitle: 'Signature scope'
            acceptButtonLabel: 'Confirm'
            cancelButtonLabel: 'Cancel'
          }
          invokeFunction: {
            title: 'This app needs your permission to perform this transaction'
            successModal: {
              heading: 'Dapp Request'
              subtitle: 'Transaction successfully sent!'
              text: 'Once your transaction has been confirmed it will appear in your activity feed.'
            }
          }
          signTransaction: {
            title: 'This app needs your permission to sign this transaction'
            successModal: {
              heading: 'Dapp Request'
              subtitle: 'Transaction successfully signed!'
            }
          }
          signMessage: {
            title: 'This app asks for authentication'
            messageLabel: 'MESSAGE'
            acceptButtonLabel: 'Authenticate'
            cancelButtonLabel: 'Reject'
            successModal: {
              heading: 'Dapp Request'
              subtitle: 'Message successfully signed!'
            }
          }
          verifyMessage: {
            title: 'This app asks for authentication'
            messageLabel: 'SIGNED MESSAGE'
            acceptButtonLabel: 'Authenticate'
            cancelButtonLabel: 'Reject'
            successModal: {
              heading: 'Dapp Request'
              subtitle: 'Wallet authenticated!'
            }
          }
          encrypt: {
            title: 'This app asks for encryption'
            messageLabel: 'MESSAGE'
            acceptButtonLabel: 'Encrypt'
            cancelButtonLabel: 'Reject'
            successModal: {
              heading: 'Dapp Request'
              subtitle: 'Message successfully encrypted!'
            }
          }
          decrypt: {
            title: 'This app asks for decryption'
            messageLabel: 'MESSAGE'
            acceptButtonLabel: 'Decrypt'
            cancelButtonLabel: 'Reject'
            successModal: {
              heading: 'Dapp Request'
              subtitle: 'Message successfully decrypted!'
            }
          }
        }
        ethereum: {
          signMessage: {
            title: 'This app asks for authentication'
            messageLabel: 'MESSAGE'
            acceptButtonLabel: 'Authenticate'
            cancelButtonLabel: 'Reject'
            successModal: {
              heading: 'Dapp Request'
              subtitle: 'Message successfully signed!'
            }
          }
          rawJson: {
            dataLabel: 'DATA'
            acceptButtonLabel: 'Accept'
            cancelButtonLabel: 'Reject'
          }
          signTransaction: {
            title: 'This app needs your permission to sign this transaction'
            successModal: {
              heading: 'Dapp Request'
              subtitle: 'Transaction successfully signed!'
            }
          }
          sendTransaction: {
            title: 'This app needs your permission to perform this transaction'
            successModal: {
              heading: 'Dapp Request'
              subtitle: 'Transaction successfully sent!'
              text: 'Once your transaction has been confirmed it will appear in your activity feed.'
            }
          }
          signTypedData: {
            title: 'This app asks for authentication'
            successModal: {
              heading: 'Dapp Request'
              subtitle: 'Message successfully signed!'
            }
          }
        }
      }
    }
    dappPermissionSignatureScopeModal: {
      scopes: {
        None: 'Your signature is only valid for fee payments.'
        CalledByEntry: 'Your signature can only be used by the calling contract and just for this transaction.'
        Global: 'Your signature can be used without restriction with any contract.'
        CustomContracts: 'Your signature can be used by the set of contracts listed above.'
        CustomGroups: 'Your signature can be used by the set of groups listed above.'
        WitnessRules: 'Your signature is only valid for transactions that match the specified rules and conditions, such as the current script hash, group, or calling script hash. This allows for more complex and expressive signature scoping to address edge cases and potential reentrancy attacks.'
      }
    }
    dappPermissionContractDetails: {
      title: 'Invocation details'
      detailsLabel: 'DETAILS'
      hashLabel: 'HASH'
      parametersLabel: 'REQUEST PARAMETERS'
      methodNotFoundError: 'Method not found in contract'
    }
    deleteAccount: {
      title: 'Edit account'
      deleteAccount: 'Delete account?'
      subtitle: "Ensure that you've transferred your assets to a new account before proceeding, so that your assets will be safe"
      alert: 'Deleting an account that contains assets will cause these assets to become inaccessible after deletion!'
      warning: 'Are you sure you want to continue?'
      delete: 'Delete Account'
      cancel: 'Cancel'
    }
    deleteWallet: {
      title: 'Edit wallet'
      deleteWallet: 'Delete wallet?'
      subtitle: "Ensure that you've transferred your assets to a new wallet before proceeding, so that your assets will be safe"
      alert: 'Deleting an wallet that contains assets will cause these assets to become inaccessible after deletion!'
      warning: 'Are you sure you want to continue?'
      delete: 'Delete Wallet'
      cancel: 'Cancel'
    }
    confirmPasswordBackup: {
      title: 'Backup NEON'
      description: 'In order to create your backup file, please provide your NEON password below:'
      subtitle: 'Current NEON Password'
      inputPlaceholder: 'Enter your password...'
      buttonContinueLabel: 'Backup Now'
      error: 'Password not recognised!'
      warning: 'You’ll need this password to restore your wallet.'
      warningHighlighted: 'Please keep it safe!'
      modalDescription: 'Backup created successfully!'
      errorBackup: 'There was an error trying to backup. Please, try again.'
      returnSettings: 'Return to Settings'
    }
    confirmPasswordRecover: {
      title: 'Import NEON Backup'
      description: 'In order to create your backup file, please provide your NEON password below:'
      subtitle: 'Backup Password'
      inputPlaceholder: 'Enter your password...'
      buttonContinueLabel: 'Import this NEON backup'
      error: 'Password not recognised!'
      modalDescription: 'Backup imported successfully!'
      returnSettings: 'Return to Settings'
    }
  }
  pages: {
    welcome: {
      title: 'Welcome to Neon Wallet'
      setupSecurityButtonLabel: 'Password Protect Neon Wallet'
    }
    welcomeSecuritySetup: {
      title: 'Securing your new wallet'
      steps: ['Create Password', 'Confirm Password', 'Complete']
      step1: {
        formTitle: 'Please create a password to secure your wallet'
        passwordPlaceholder: 'Create a password...'
        passwordError: 'Password must be at least {{length}} characters long'
      }
      step2: {
        formTitle: 'Please confirm your password'
        confirmPasswordPlaceholder: 'Confirm your password...'
        confirmPasswordError: 'Passwords do not match'
      }
      step3: {
        title: 'Password created successfully!'
        buttonContinueLabel: 'Open your wallet'
      }
    }
    welcomeImportWallet: {
      title: 'Import a wallet'
      steps: ['Create Password', 'Confirm Password', 'Enter address or key', 'Import', 'Complete']
      step3: {
        formTitle: 'Enter an address, encrypted key, private key or mnemonic'
        inputPlaceholder: 'Enter an address, key or mnemonic...'
        encryptedKeyMessage: 'Encrypted key identified - Password required'
        importEncryptedDescription: 'Select the desired blockchain for your new account'
        importEncryptedTitle: 'Import a wallet'
        importEncryptedSubtitle: 'Your encrypted key has been recognised, please complete the below fields to continue.'
      }
      step4: {
        title: 'Please be patient, we are now setting up your wallet'
        canNotFindBlockchainError: "We can't find the blockchain for this address"
      }
      step5: {
        title: 'Wallet imported successfully!'
        openWalletButtonLabel: 'Open your wallet'
      }
    }
    portfolio: {
      title: 'Portfolio'
      allAccounts: 'All accounts'
      overview: 'Overview'
      allActivity: 'All activity'
      allConnections: 'All connections'
      importButtonLabel: 'Import'
      newWalletButtonLabel: 'New Wallet'
      exportButtonLabel: 'Export'
      portfolioActivity: {
        allActivity: 'All activity'
        walletsAndAccounts: '{{wallets}} Wallets / {{accounts}} Accounts'
        balance: 'Balance'
      }
      portfolioOverview: {
        overview: 'Overview'
        walletsAndAccounts: '{{wallets}} Wallets / {{accounts}} Accounts'
        balance: 'Balance'
      }
      portfolioConnections: {
        title: 'All connections'
        walletsAndAccounts: '{{wallets}} Wallets / {{accounts}} Accounts'
        disconnectAllButtonLabel: 'Disconnect all'
        totalConnections: '{{connections}} Connections'
      }
    }
    login: {
      title: 'Welcome to Neon Wallet'
      loginPassword: 'Login Password'
      passwordPlaceholder: 'Please enter your password'
      buttonLoginLabel: 'Login'
      invalidPassword: 'Invalid password'
    }
    send: {
      title: 'Send Tokens'
      leftSideTitle: 'Token balances'
      rightSideTitle: 'What tokens do you want to send?'
      tokenToSend: 'Token to send'
      selectToken: 'Select token...'
      sourceAccount: 'Source account'
      inputAmount: 'Input amount...'
      amount: 'Amount'
      fiatValue: 'Fiat value (USD estimated)'
      recipientAddress: 'Recipient address'
      contacts: 'Contacts'
      addressInputHint: 'Enter recipient address...'
      totalFee: 'Total fee'
      sendNow: 'Send Now'
      invalidAddress: 'Invalid address'
      selectAccountModal: {
        title: 'Select a source account'
        selectSourceAccount: 'Select source account'
      }
      saveContact: 'Save contact'
      viewStatus: 'View status'
      sendSuccess: {
        title: 'Your tokens have been sent successfully!'
      }
      sendFail: {
        title: "Oops! We've encountered an error."
        subtitle: 'Please try again later'
      }
      error: {
        decryptKey: 'Error to decrypt key'
      }
    }
    selectAccount: {
      selectAccount: 'Select account...'
    }
    wallets: {
      title: 'Wallets'
      addAccountButtonLabel: 'Add Account'
      editWalletButtonLabel: 'Edit'
      editAccountButton: 'Edit'
      importButtonLabel: 'Import'
      newWalletButtonLabel: 'New Wallet'
      address: 'Address'
      accounts: 'Accounts'
      accountNftList: {
        title: 'NFTs'
        empty: 'No NFTS to display'
        total: '{{length}} items'
      }
      accountOverview: {
        title: 'Account Overview'
        balance: 'Balance'
        holdings: 'Holdings'
      }
      accountTokensList: {
        title: 'Tokens'
        balance: 'Balance'
      }
      accountTransactionsList: {
        title: 'Transactions'
      }
      accountConnections: {
        title: 'Connections'
        totalConnections: '{{connections}} Connections'
        newConnection: 'New connection'
        disconnectAll: 'Disconnect all'
      }
    }
    contacts: {
      title: 'Contacts'
      buttonAddContactLabel: 'Add Contact'
      contactList: {
        contacts: 'CONTACTS'
        myAccounts: 'MY ACCOUNTS'
        notFound: 'No contacts found'
      }
      addresses: 'Addresses'
    }
    settings: {
      title: 'Settings'
      sidebarOption: {
        personalisation: 'PERSONALISATION'
        security: 'SECURITY'
      }
      personalisationOption: {
        networkConfiguration: 'Network Configuration'
        currency: 'Currency'
        language: 'Language'
        theme: 'Theme'
        releaseNotes: 'Release Notes'
      }
      securityOption: {
        encryptKey: 'Encrypt Key'
        recoverWallet: 'Import NEON Backup'
        backupWallet: 'Backup NEON'
      }
      encryptKey: {
        subtitle: 'Choose a passphrase to encrypt an existing key:'
        titleInput1: 'Enter the private key that you want to encrypt'
        inputPrivateKeyPlaceholder: 'Enter a private key...'
        titleInput2: 'Create a passphrase'
        inputPassphrasePlaceholder: 'Enter a passphrase...'
        titleInput3: 'Confirm your passphrase'
        inputConfirmPassphrasePlaceholder: 'Confirm your passphrase...'
        buttonGenerate: 'Generate an Encrypted Key'
        error: {
          privateKey: 'Invalid private key'
          privateKeyNotFound: 'Unable to validate the private key'
          passphrase: 'Invalid passphrase'
          confirmationPassphrase: 'Confirmation passphrase is different from the passphrase'
        }
        successModal: {
          title: 'Encrypted Key'
          subtitle: 'Private Key encrypted successfully!'
          description: 'Here’s your encrypted key:'
        }
      }
      settingsNetwork: {
        title: 'Network Configuration'
        youAreConnectedNeoAndEth: 'You are connected to both the Neo and Ethereum networks'
        globalConfiguration: 'Global controls'
        currentNetwork: 'Current Network'
      }
      settingsReleaseNotes: {
        title: 'Release Notes'
        button: {
          learnMore: 'Learn More'
        }
      }
      backupWallet: {
        title: 'Backup NEON'
        description: 'Save a backup file to your computer that will allow you to restore your wallet in the event that you lose access or damage your device.'
        saveBackupLabel: 'Where would you like to save your backup?'
        browse: 'Browse...'
        backup: 'Backup'
        warning: 'Note: This process will back up your entire wallet'
      }
      recoverWallet: {
        title: 'Import NEON Backup'
        description: 'In the event that you lose access to you wallet, you can import it from a local backup file. Simply locate your local backup file and enter the password you used when you created the backup file and your access will be restored.'
        saveBackupLabel: 'Locate your backup file'
        browse: 'Browse...'
        backup: 'Import backup'
        nameExtention: 'NEON Backup Files'
      }
    }
    receive: {
      title: 'Receive Tokens'
      sendQRCode: 'Send QR Code'
      yourAddressTabTitle: 'YOUR ADDRESS'
      requestTokenTabTitle: 'REQUEST TOKENS'
      receivingAccountTitle: 'Receiving account'
      yourReceivingAddress: 'Your receiving account'
      selectAccountToGenerateCode: 'Select an account to generate a code!'
      addressInputHint: 'Your receiving address will be here...'
      downloadQRCode: 'Download QR Code'
      selectAccountModal: {
        title: 'Select a receiving account'
        selectReceivingAccount: 'Select receiving account'
      }
    }
  }
}

export default Resources
