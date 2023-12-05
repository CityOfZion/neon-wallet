interface Resources {
  common: {
    general: {
      continue: 'Continue'
      next: 'Next'
      save: 'Save'
      edit: 'Edit'
      cancel: 'Cancel'
    }
    wallet: {
      importedName: 'Imported Wallet'
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
  }
  modals: {
    import: {
      title: 'Import'
      subtitle: 'IMPORT'
      description: 'Enter an address, encrypted key or private key'
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
      }
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
      name: 'NAME'
      enterAName: 'Enter a name...'
      addresses: 'ADDRESSES'
      enterPublicKeyOrNNS: 'Enter a public key or NNS address...'
    }
    addAddressStep1: {
      title: 'Add Address'
      addToContact: 'ADD TO CONTACT'
      selectBlockchain: 'Select the desired blockchain for this account'
      search: 'Search...'
      notFound: 'Blockchain not found'
      errorNoBlockchainSelected: 'No blockchain selected'
    }
    addAddressStep2: {
      title: 'Add Address'
      addToContact: 'ADD TO CONTACT'
      enterNNSorPublicKey: 'To add an account to this contact, enter an NNS address or public key'
      publicKeyComplete: 'Public key complete!'
      invalidAddress: 'Invalid Address'
    }
    addAddressStep3: {
      title: 'Add Address'
      addToContact: 'Add to contact'
      subtext: 'This address will be added to the above contact:'
    }
    mnemonicAccountSelection: {
      title: 'Import'
      description: 'Select the addresses you’d like to import:'
      importButtonLabel: 'Import'
      noAccountsToImport: 'No accounts to import'
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
      buttonRefreshLabel: 'Refresh'
    }
    login: {
      title: 'Welcome to Neon Wallet'
      loginPassword: 'Login Password'
      passwordPlaceholder: 'Please enter your password'
      buttonLoginLabel: 'Login'
      invalidPassword: 'Invalid password'
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
      reorder: {
        cancelButtonLabel: 'Cancel'
        saveButtonLabel: 'Save'
      }
    }
    contacts: {
      title: 'Contacts'
      buttonAddContactLabel: 'Add Contact'
      contactList: {
        contacts: 'CONTACTS'
        myAccounts: 'MY ACCOUNTS'
        search: 'Search'
        notFound: 'No contacts found'
        noContacts: 'No contacts'
      }
      addresses: 'Addresses'
      edit: 'Edit'
      addressTable: {
        blockchain: 'BLOCKCHAIN'
        address: 'ADDRESS'
        sendAssets: 'Send assets'
      }
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
    }
  }
}

export default Resources