# Neon Wallet

![wallet](/wallet.png)

The aim of this project is to port the current NEO web wallet to electron with a better UI.

## Installation

A standalone app will be available soon. For now, you will need to build the wallet manually. This project uses the current LTS node version, which is `v6.11.0`. You'll also need to have webpack installed globally `npm install -g webpack`

To install the development version and its dependencies, move into the project directory and run `npm install`.
Then install the neon-js pack by running `npm install --save git+https://github.com/CityOfZion/neon-js.git`
Then build the project with `webpack` or `webpack --watch` (for auto-updates).

To run the wallet: `npm start`
