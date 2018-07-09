<p align="center">
  <img
    src="http://res.cloudinary.com/vidsy/image/upload/v1503160820/CoZ_Icon_DARKBLUE_200x178px_oq0gxm.png"
    width="125px;">
</p>

<h1 align="center">Neon Wallet</h1>

<p align="center">
  Electron wallet for the <b>NEO</b> blockchain.
</p>

<p align="center">
  <a href="https://circleci.com/gh/CityOfZion/neon-wallet">
    <img src="https://circleci.com/gh/CityOfZion/neon-wallet.svg?style=svg">
  </a>
  <a href='https://coveralls.io/github/CityOfZion/neon-wallet?branch=dev'>
    <img src='https://coveralls.io/repos/github/CityOfZion/neon-wallet/badge.svg?branch=dev' alt='Coverage Status' />
  </a>
</p>

<p align="center">
  <img src="/wallet.png">
</p>

## Overview

### What does it currently do

* Create a wallet
* Encrypt a Private Key
* Login with Ledger, Private Key, Encrypted Private Key or a stored account.
* Import/Export wallet accounts (NEP6 Standard)
* View balance
* View prices for GAS and NEO in multiple currencies
* Send GAS, NEO and any NEP5 token
* Claim GAS
* Send to multiple recipients
* Address book
* Switch networks (Test/Main)

## Installation

Standalone apps can be found [here](https://neonwallet.com/), to build manually see the steps below.

### Required Tools and Dependencies

* Node (This project uses the current LTS node version, which is `v6.13.1`)
* Yarn (https://yarnpkg.com/lang/en/docs/install/)

### Developing and Running

Execute these commands in the project's root directory:

Setup:

* `yarn install` - Installing node dependencies
  * If you get any errors related to the node-hid package, please check installation instructions here: https://github.com/node-hid/node-hid#compiling-from-source. On Linux you may need to run `sudo apt install libusb-1.0-0 libusb-1.0-0-dev`, for example.
* `./node_modules/.bin/electron -v` confirm electron is version 1.8.4
* Electron may take anywhere from 10 to 15 seconds to fully start using the commands below. Be patient.

Developing:

* `yarn dev` - Live reload

Running (for production):

* `yarn assets`
* `yarn start`

Testing:

* `yarn test` or `yarn run test-watch` for live testing.

### Support

A gentle reminder, github issues is meant to be used by developers for maintaining and improving the codebase, and is not the proper location for support issues. Questions such as

* _"Why can't I log in?"_
* _"I lost my private key, is there anyway to recover it?"_
* _"Why is my balance not showing?"_

should be asked in proper support channels such as the [NEO subreddit](https://www.reddit.com/r/NEO/), or the official [NEO Discord Channel](https://discord.gg/R8v48YA). You should also check the list of [frequently asked questions (FAQ)](https://github.com/CityOfZion/awesome-NEO/blob/master/resources/faq.md) to see if your question has been answered there already.
