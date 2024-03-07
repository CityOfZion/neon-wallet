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
      firstWalletNameBackupFile: 'My First Wallet Backup'
      firstWalletNameBackupFileTitle: 'YOUR MNEMONIC PHRASE:'
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
    walletSelect: {
      title: 'Wallets'
      placeholder: 'Select a wallet...'
      createWalletButtonLabel: 'Create New wallet'
    }
    colorSelector: {
      customColor: 'Custom Color'
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
    nftViewer: {
      empty: 'No NFTS to display'
    }
    contactAddressTable: {
      blockchain: 'BLOCKCHAIN'
      address: 'ADDRESS'
      sendAssets: 'Send assets'
    }
    blockchainSelect: {
      placeholder: 'Select a blockchain...'
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
        invalid: 'Invalid text'
        empty: 'Please enter some text'
        allAddressesAlreadyImported: 'All addresses are already imported'
        mnemonicIncomplete: 'Mnemonic incomplete'
      }
      success: {
        mnemonic: 'Mnemonic complete!'
        key: 'Private key complete!'
        encrypted: 'Encrypted key complete!'
      }
      importEncryptedDescription: 'Select the desired blockchain for your new account'
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
    editAccount: {
      title: 'Edit Account'
      inputPlaceholder: 'Enter your account name...'
      colorSelectorLabel: 'Select a colour for your account card'
      saveButtonLabel: 'Save'
      cancelButtonLabel: 'Cancel'
      deleteAccountTitle: 'Delete Account'
      deleteAccountSubtext: 'Tum dicere exorsus est et dolore magnam aliquam quaerat voluptatem.'
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
    importEncryptedPasswordModal: {
      title: 'Import'
      description: 'Enter a pass phrase for your encrypted key:'
      inputPlaceholder: 'Enter your pass phrase...'
      buttonContinueLabel: 'Import'
      addressAlreadyExist: 'Address already exists'
      success: 'Encrypted key successfully imported!'
    }
    selectAccount: {
      yourAccounts: 'Your accounts:'
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
  }
  pages: {
    welcome: {
      title: 'Welcome to Neon Wallet'
      skipSecurityButtonLabel: 'Skip security'
      setupSecurityButtonLabel: 'Setup security'
    }
    securitySetup: {
      title: 'Welcome to Neon Wallet'
      steps: ['Create Password', 'Confirm Password', 'Complete']
    }
    securitySetupStep1: {
      formTitle: 'Please create a password to secure your wallet'
      passwordPlaceholder: 'Create a password'
      passwordError: 'Password must be at least {{length}} characters long'
    }
    securitySetupStep2: {
      formTitle: 'Please confirm your password'
      confirmPasswordPlaceholder: 'Confirm your password'
      confirmPasswordError: 'Passwords do not match'
    }
    securitySetupStep3: {
      description: 'Your security setup is now complete, please back up your password below. Failure to backup may result in loss of access to your wallet'
      buttonDownloadLabel: 'Download backup'
      buttonPrintLabel: 'Print backup'
      buttonContinueLabel: 'Open your new wallet'
      firstWalletName: 'My First Wallet'
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
      editWalletButtonLabel: 'Edit Wallet'
      reorderAccountsButtonLabel: 'Reorder Accounts'
      editAccountButton: 'Edit Account'
      buttonRefreshLabel: 'Refresh'
      addWatchAccountButtonLabel: 'Add Watch'
      importButtonLabel: 'Import'
      newWalletButtonLabel: 'New Wallet'
      manageButtonLabel: 'Manage'
      dappConnectionButtonLabel: 'Dapp'
      balance: 'Balance'
      changeIn24hrs: 'Change in 24HRS'
      portfolioBalance: 'Portfolio Balance'
      publicAddress: 'Public Address'
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
        recoverWallet: 'Recover Wallet'
        backupWallet: 'Backup Wallet'
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
  }
}

export default Resources
