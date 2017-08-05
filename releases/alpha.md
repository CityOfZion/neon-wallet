# Neon Wallet Alpha Release

Neon Wallet is a desktop light wallet that allows you to interact with assets on the Neo blockchain without having to sync all chain data locally to your machine.

![wallet](/wallet.png)

## Features

Neon Wallet currently supports:

  + Offline generation of new accounts (public/private key pairs)
  + Checking NEO and GAS balance
  + Sending NEO and GAS
  + Claiming GAS
  + Easy switching between MainNet and TestNet
  + Windows, OSX, and Linux support

## How does a light wallet work?

Light wallets like Neon and MyEtherWallet share a remote, centralized version of the blockchain data. The benefit of using a light wallet is that you don't need to sync the entire blockchain on your local machine. The downside is that you are putting more trust in a single, remote version of the blockchain. No matter what kind of wallet you are using, however, *your private key should never leave your local machine*. Before typing your private key into any wallet, you should inspect its code (or have someone you trust do so) to make sure this is the case.

## Alpha release disclaimer

Our team at COZ is currently using this wallet on MainNet and TestNet without issue, but as an alpha release, we advise you to *only use this wallet on TestNet* until the code has been fully audited and tested by the community. If you would like to try the wallet on TestNet, ping unignorant in the COZ Slack and we will send you a small amount of TestNet funds.  

## Download links

You can compile the wallet yourself using the instructions in the [readme](../README.md), but we have compiled standalone apps for non-technical users.

#### Note: For user safety, this build will run on TestNet by default. To switch to MainNet (the real NEO blockchain), toggle the current network by clicking on the network name in the wallet's upper right hand corner. Your public/private key pairs are valid on BOTH MainNet and TestNet

All downloads now on the [release page](https://github.com/CityOfZion/neon-wallet/releases/tag/v0.0.3b)

## Contributors

This wallet was created by Ethan Fast with help from others at [COZ](https://github.com/CityOfZion). The app logo and icon were designed by Nathaniel Walpole.
