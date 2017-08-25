import bs58check from 'bs58check';
import wif from 'wif';
import { SHA256, AES, enc } from 'crypto-js'
import C from 'crypto-js'
import scrypt from 'scryptsy'
import { getAccountsFromWIFKey, getAccountsFromPrivateKey, generatePrivateKey, getWIFFromPrivateKey } from 'neon-js';

const ab2hexstring = arr => {
  var result = "";
  for (var i = 0; i < arr.length; i++) {
    var str = arr[i].toString(16);
    str = str.length == 0 ? "00" :
      str.length == 1 ? "0" + str :
        str;
    result += str;
  }
  return result;
}

const NEP_HEADER = "0142"
const NEP_FLAG = "e0"

const hexXor = (str1, str2) => {
  console.log(str1, str2);
  if (str1.length !== str2.length) throw new Error()
  if (str1.length % 2 !== 0) throw new Error()
  const result = []
  for (let i = 0; i < str1.length; i += 2) {
    const num1 = parseInt(str1.substr(i, 2), 16)
    const num2 = parseInt(str2.substr(i, 2), 16)
    result.push(num1 ^ num2)
  }
  console.log(result);
  return ab2hexstring(result)
}

export const generateEncryptedWif = (passphrase) => {
  const newPrivateKey = generatePrivateKey();
  const newWif = getWIFFromPrivateKey(newPrivateKey);
  return encrypt_wif(newWif, passphrase).then((encWif) => {
    const loadAccount = getAccountsFromWIFKey(newWif);
    console.log("loaded account", loadAccount);
    return {
      wif: newWif,
      address: loadAccount[0].address,
      encryptedWif: encWif,
      passphrase: passphrase
    };
  });
};

const encrypt = (wifKey, keyphrase, progressCallback) => {
    const address = getAccountsFromWIFKey(wifKey)[0].address
    const privateKey = getAccountsFromWIFKey(wifKey)[0].privatekey
    console.log("private key enc", privateKey);
    // SHA Salt (use the first 4 bytes)
    const addressHash = SHA256(SHA256(enc.Latin1.parse(address))).toString().slice(0, 8)
    //console.log(addressHash)
    // Perform Unicode Normalization
    // TODO
    // Scrypt
    const derived = scrypt(Buffer.from(keyphrase, 'utf8'), Buffer.from(addressHash, 'hex'), 16384, 8, 8, 64, progressCallback).toString('hex')
    const derived1 = derived.slice(0, 64)
    const derived2 = derived.slice(64)
    //AES Encrypt
    const xor = hexXor(privateKey, derived1)
    const encrypted = AES.encrypt(enc.Hex.parse(xor), enc.Hex.parse(derived2), { mode: C.mode.ECB, padding: C.pad.NoPadding })
    //Construct
    const assembled = NEP_HEADER + NEP_FLAG + addressHash + encrypted.ciphertext.toString()
    return bs58check.encode(Buffer.from(assembled, 'hex'))
};

const decrypt = (encryptedKey, keyphrase, progressCallback) => {
    const assembled = ab2hexstring(bs58check.decode(encryptedKey))
    const addressHash = assembled.substr(6, 8)
    const encrypted = assembled.substr(-64)
    const derived = scrypt(Buffer.from(keyphrase, 'utf8'), Buffer.from(addressHash, 'hex'), 16384, 8, 8, 64, progressCallback).toString('hex')
    const derived1 = derived.slice(0, 64)
    const derived2 = derived.slice(64)
    const ciphertext = { ciphertext: enc.Hex.parse(encrypted), salt: "" }
    const decrypted = AES.decrypt(ciphertext, enc.Hex.parse(derived2), { mode: C.mode.ECB, padding: C.pad.NoPadding })
    const privateKey = hexXor(decrypted.toString(), derived1)
    console.log("private key dec", privateKey);
    const address = getAccountsFromPrivateKey(privateKey)[0].address
    const newAddressHash = SHA256(SHA256(enc.Latin1.parse(address))).toString().slice(0, 8)
    if (addressHash !== newAddressHash) throw new Error("Wrong Password!")
    return getWIFFromPrivateKey(Buffer.from(privateKey, 'hex'));
};

export const encrypt_wif = (wif, passphrase) => {
  return (new Promise((success, reject) => {
    success(encrypt(wif, passphrase));
  }));
};

export const decrypt_wif = (encrypted_wif, passphrase) => {
  return (new Promise((success, reject) => {
    success(decrypt(encrypted_wif, passphrase));
  }));
};
