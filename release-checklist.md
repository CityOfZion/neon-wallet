# Functionality check before release

  1. **Create a new wallet**
  
     a). Can sucessfully generate new private key and nep2 encrypted version given passphrase
     
     b). Gives user feedback if passphrases do not match
     
     c). Gives user feedback if passphrases are too short
     
     d). Interface communicates "generating keys" during generation process (a few seconds)
     
     e). The "save key" button saves a nep2 encrypted key in local app storage, under entered name
     
  2. **Login with private key**
  
     a). Logging in with invalid private key gives user feedback
     
     b). Successful login to dashboard on valid private key
     
  3. **Login with saved key**
  
     a). Interface communicates "decrypting key" during decryption process (a few seconds)
     
     b). Interface communicates "wrong passphrase" if decryption fails
     
     c). Successful login to dashboard on correct passphrase
     
     d). All saved wallets/keys appear as options under login
     
     e). When saved wallet is deleted, no longer appears under login
     
  4. **Login with nep2 encrypted key and passphrase**
  
     a). Interface communicates "decrypting key" during decryption process (a few seconds)
     
     b). Interface communicates "wrong passphrase or invalid encrypted key" if decryption fails
     
     c). Successful login to dashboard on correct passphrase and key
     
  5. **Encrypt an existing key**
  
     a). Gives user feedback if passphrases do not match
     
     b). Gives user feedback if passphrases are too short
     
     c). Gives feedback if private key entered is not valid
     
     d). Generates encryped key succesfully under nep2 otherwise
     
  6. **Settings page**
  
     a). Choice of block explorer persists in local storage
     
     b). Keys/wallets can be deleted
     
     c). Keys/wallets can be exported to json file and also imported
    
  7. **Functionality**
  
     a). Communicates error on send to invalid address
     
     b). Communicates error on sends to BTC/LTC/etc. address
     
     c). Communicates error if funds < amount to send
     
     d). Communicates error if attempt to send fractional Neo
     
     e). Send Neo successfully to address
     
     f). Send Gas and factional Gas successfully to address
     
     g). Claim Gas on current address
     
     h). Block claims for 5mins after claiming once
     
     i). Transaction history updates correctly with all above interactions
     
     j). Able to swtich between MainNet and TestNet, balance updates accordingly
     
     k). Replicate send tests on both MainNet and TestNet
     
     l). Block explorer setting creates correct txid link
     
