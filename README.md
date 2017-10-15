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

- View Gas and Neo balances
- Login via Wif and encrypted private keys
- Send Neo to other addresses

## Installation

A standalone app will be available soon. For now, you will need to build the wallet manually.

### Required Tools and Dependencies

  - Node (This project uses the current LTS node version, which is `v6.11.0`)
  - Yarn (https://yarnpkg.com/lang/en/docs/install/)

### Developing and Running

Execute these commands in the project's root directory:

  - `yarn install` Installing node dependencies
  - `yarn run assets` or `yarn run assets-watch` for live reload.
  - `yarn start` for running the project or `yarn start-dev` to run with verbose console logging.
  - `yarn test` or `yarn run test-watch` for live testing.

### Support

A gentle reminder, github issues is meant to be used by developers for maintaining and improving the codebase, and is not the proper location for support issues. Questions such as

- *"Why can't I log in?"*
- *"I lost my private key, is there anyway to recover it?"*
- *"Why is my balance not showing?"*

should be asked in proper support channels such as the [NEO subreddit](https://www.reddit.com/r/NEO/), or the official [NEO slack](https://neosmarteconomy.slack.com). You should also check the list of [frequently asked questions (FAQ)](https://github.com/CityOfZion/awesome-neo/blob/master/resources/faq.md) to see if your question has been answered there already.
