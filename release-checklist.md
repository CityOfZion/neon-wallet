# Functionality check before release

  1. **Create a new wallet**
  
     a). Can sucessfully generate new private key and nep2 encrypted version given passphrase
     
     b). Gives user feedback if passphrases do not match "Error - Passphrases do not match"
     
     c). Gives user feedback if passphrases are too short "Error - Please choose a longer passphrase"
     
     d). Interface communicates "generating keys" during generation process (a few seconds) "Processing - Generating encoded Key" [wording change]
     
     e). The "save key" button saves a nep2 encrypted key in local app storage, under entered name
     
     f). Successful generation of key presents red banner at the top of the wallet "You must save and backup the keys below. If you lose    them, you lose access to your assets. You can click "Save Key" to save the encrypted key in local application storage. Verify that you can log in to the account and see the correct public address before sending anything to the address below!"
     
     g). Successful generation of key presents the following: Passphrase, Public Address, Encrypted Key and Private key
     
     h). Public address and Encrypted Private Key both present with Key and QR code
     
  2. **Login with private key**
  
     a). Logging in with invalid private key gives user feedback "Error - That is not a private key"
     
     b). Successful login to dashboard on valid private key
     
     c). Home buttom takes user back to Home Screen
     
     d). Eye button on right of key freeform field displays key to user. Pressing again hides key.
     
     e). Logout button takes user back to Home
     
  3. **Login with saved key**
  
     a). Interface communicates "Processing - decrypting encoded key" during decryption process (a few seconds)
     
     b). Interface communicates "Wrong paraphrase or invalid encrypted key" if decryption fails
     
     c). Successful login to dashboard on correct passphrase
     
     d). All saved wallets/keys appear as dropdown options under "login using a saved wallet"
     
     e). When saved wallet is deleted, no longer appears under login
     
  4. **Login with nep2 encrypted key and passphrase**
  
     a). Interface communicates "decrypting encoded key" during decryption process (a few seconds)
     
     b). Interface communicates "wrong passphrase or invalid encrypted key" if decryption fails
     
     c). Successful login to dashboard on correct passphrase and key
     
     d). If encrypted key is too long or short >Interface communicates "Error - that is not a valid encrypted key" if decryption fails
     
  5. **Encrypt an existing key**
  
     a). Gives user feedback if passphrases do not match "Error - Passphrases do not match"
     
     b). Gives user feedback if passphrases are too short "Error - Please choose a longer paraphrase"
     
     c). Gives feedback if private key entered is not valid "Error - The private key is not valid"
     
     d). Generates encryped key succesfully under nep2 otherwise
     
  6. **Settings page**
  
     a). Choice of block explorer persists in local storage dropdown
     
     b). Keys/wallets can be deleted
     
     c). Keys/wallets can be exported to json file and also imported "Success - The file has been successfully saved"
     
     d). Can successfully add new NEP5 hash from manage tokens button
     
     e). Can successfully delete new NEP5 hash from manage tokens button
     
     f). Can select different currency which is then used and displayed when in dashboard
    
  7. **Functionality**
  
     a). Communicates error on send to invalid address
     
     b). Communicates error on sends to BTC/LTC/etc. address
     
     c). Communicates error if funds < amount to send
     
     d). Communicates error if attempt to send fractional NEO
     
     e). Send NEO successfully to address
     
     f). Send GAS and factional GAS successfully to address
     
     g). Claim GAS on current address
     
     h). Block claims for 5mins after claiming once
     
     i). Transaction history updates correctly with all above interactions
     
     j). Able to swtich between MainNet and TestNet, balance updates accordingly
     
     k). Replicate send tests on both MainNet and TestNet
     
     l). Block explorer setting creates correct txid link
     
     m). Communicates error if attempting to send zero or negative amount of NEO
     
     n). Can successfully send and receive NEP5 tokens as per NEO test above
     
     
     8. **Login using Ledger**
     
     a). Use Ledger Nano S button ghosted out if Ledger device not connected/logged in.
     Error message "USB Failure: No device found. Looking for USB Devices. Please plugin your device and login." is presented
     
     b). Home button takes user home
     
     c). USB Ledger Nano S button is ghosted out if Ledger device is connected and logged in, but NEO wallet is not selected on Ledger.
     The error message "Found USB Ledger Nano S
     Hardware Device Error. Login to NEO App and try again" is presented
     
     d). Use Ledger Nano S button is available when device is connected, logged in, and wallet is selected on device.
     The message "Found USB Ledger Nano S" will present
     
     e) When Use Ledger Nano S button is selected, user is taken to dashboard


     
     
     
