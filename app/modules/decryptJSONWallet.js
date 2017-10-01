import FS from 'fs';
import Crypto from 'crypto';
import BaseX from 'base-x';
import { getWIFFromPrivateKey } from 'neon-js';

const Base58 = BaseX('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');

const ERRORS = {
  MISSING_ACCOUNT: 'Missing account information in wallet JSON file.',
  MISSING_KEY: 'Missing key information in wallet JSON file.'
};

/**
 * @summary HEX string to bytes
 *
 * @param {String} string
 * @returns {Uint8Array} bytes
 */
const hexToBytes = (string) => {
  const bytes = new Uint8Array(string.length / 2);
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(string.substr(i * 2, 2), 16);
  return bytes;
};

/**
 * @summary Encode a string to a UTF8 Uint8Array
 *
 * @param {String} string
 * @returns {Uint8Array}
 */
const utf8Encode = (string) => new TextEncoder().encode(string);

/**
 * @summary UTF8 encode and hash twice a string
 *
 * @param {String} string
 * @returns {Uint8Array}
 */
const toHashKey = (string) => {
  const encodedString = utf8Encode(string);

  let hash = Crypto.createHash('sha256');
  hash.update(encodedString);
  const fstLayer = hash.digest();
  hash = Crypto.createHash('sha256');
  hash.update(fstLayer);
  const sndLayer = hash.digest();
  const passwordKey = new Uint8Array(sndLayer);

  return passwordKey;
}

/**
 * @summary Try to parse a JSON string
 *
 * @param {String} json - JSON string
 * @returns {Promise} object
 */
export const tryParse = (json) => {
  try {
    return Promise.resolve(JSON.parse(json));
  } catch(error) {
    return Promise.reject(error)
  }
}

/**
 * @summary Restructure the wallet JSON into a more succinct object
 *
 * @param {Object} json - wallet JSON data
 * @returns {Promise} object containing name, accounts, and key fields
 */
export const restructureNeoWallet = (walletObject) => {
  let accounts = [];
  let key = {};
  // 'wallet' seems to be the default
  let walletName = 'wallet';

  for (const listing of walletObject) {
    if (listing.table === 'Account') {
      accounts = listing.content;

    } else if (listing.table === 'Key') {
      for (const keyField of listing.content) {
        key[keyField.name] = keyField.value;
      }

    } else if (listing.table === 'Wallet') {
      walletName = listing.content.name;
    }
  }

  if (accounts.length > 0 && key) {
    return Promise.resolve({
      name,
      accounts,
      key
    });

  } else {
    let errorMessage = [];
    if (!accounts.length) errorMessage.push(ERRORS.MISSING_ACCOUNT);
    if (!key) errorMessage.push(ERROR.MISSING_KEY);

    return Promise.reject(errorMessage.join(' '));
  }
}

/**
 * @summary Read a file
 *
 * @param {String} filepath
 * @returns {String}
 */
const readFile = (filepath) => {
  return new Promise((accept, reject) => {
    FS.readFile(filepath, 'utf8', (error, data) => {
      accept(data)
    })
  })
}

/**
 * @summary Decrypt private key
 *
 * @param {Object} account
 * @param {Uint8Array} masterKey
 * @param {Uint8Array} iv
 * @returns {Uint8Array}
 */
const decryptPrivateKey = (account, masterKey, iv) => {
  const privateKeyEncryptedBytes = hexToBytes(account.privateKeyEncrypted)

  const decipher = Crypto.createDecipheriv('aes-256-cbc', masterKey, iv)
  let privateKey = new Uint8Array(decipher.update(privateKeyEncryptedBytes))
  decipher.final()

  const slicedKey = privateKey.slice(privateKey.byteLength - 32, privateKey.byteLength)

  return slicedKey
}

/**
 * @summary Private key to WIF
 *
 * @param {Uint8Array} privateKey
 * @returns {String} WIF
 */
const privateKeyToWIF = (privateKey) => {
  let data = new Uint8Array(38)
  data[0] = 0x80
  data.set(privateKey, 1)
  data[33] = 0x01

  let hash = Crypto.createHash('sha256')
  hash.update(new Uint8Array(data.buffer, 0, data.byteLength - 4))
  const fstLayer = hash.digest()
  hash = Crypto.createHash('sha256')
  hash.update(fstLayer)
  const sndLayer = hash.digest()
  
  const checksum = new Uint8Array(sndLayer.buffer, 0, 4)

  data.set(checksum, data.byteLength - 4)

  return Base58.encode(data)
}

/**
 * @summary Decrypt wallet JSON
 * @function
 * @public
 *
 * @param {Object} wallet - wallet object containing accounts and keys
 * @returns {String} WIF
 */
export const decryptWallet = (password, { accounts, key }) => {
  const { IV, MasterKey } = key
  const ivBytes = hexToBytes(IV)
  const encryptedMasterKeyBytes = hexToBytes(MasterKey)
  const passwordKey = toHashKey(password)

  const decipher = Crypto.createDecipheriv('aes-256-cbc', passwordKey, ivBytes)
  let masterKey = new Uint8Array(decipher.update(encryptedMasterKeyBytes))
  decipher.final()

  const privateKey = decryptPrivateKey(accounts[0], masterKey, ivBytes)
  const base58privateKey = privateKeyToWIF(privateKey)

  return base58privateKey
}

/**
 * @summary Parse JSON and decrypt wallet key
 * @function
 * @public
 *
 * @param {String}
 * @param {String}
 * @returns {String} Base58 private key, or WIF
 */
export const readAndDecrypt = (filepath, password) => {
  return readFile(filepath).then(tryParse).then(restructureNeoWallet).then((wallet) => {
    return decryptWallet(password, wallet)
  });
}
