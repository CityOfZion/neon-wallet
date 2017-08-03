import ecurve from 'ecurve';
import BigInteger from 'bigi';
import { ec } from 'elliptic';
import CryptoJS from 'crypto-js';
import WIF from 'wif';
const BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
import { ab2str,
  str2ab,
  hexstring2ab,
  ab2hexstring,
  reverseArray,
  numStoreInMemory,
  stringToBytes } from './utils';

var base58 = require('base-x')(BASE58)
import secureRandom from 'secure-random';
import buffer from 'buffer';


// All of this stuff was wrapped in a class before, but really unnecessary as none of these were stateful
// This flat structure should be more interpretable, and we can export them all as a module instead

// TODO: exporting ALL of these, but some of them are probably helpers and don't need to be exported
// TODO: go through and add at least a basic description of everything these methods are doing

export const getWIFFromPrivateKey = (privateKey) => {
    const hexKey = ab2hexstring(privateKey);
    return WIF.encode(128, new Buffer(hexKey, 'hex'), true)
};

export const getTxHash = ($data) => {
	var DataHexString = CryptoJS.enc.Hex.parse($data);
	var DataSha256 = CryptoJS.SHA256(DataHexString);
	var DataSha256_2 = CryptoJS.SHA256(DataSha256);

	return DataSha256_2.toString();
};

// TODO: this needs a lot of documentation, also better name!
export const getInputData = ($coin, $amount) => {
	// sort
	var coin_ordered = $coin['list'];
	for (let i = 0; i < coin_ordered.length - 1; i++) {
		for (let j = 0; j < coin_ordered.length - 1 - i; j++) {
			if (parseFloat(coin_ordered[j].value) < parseFloat(coin_ordered[j + 1].value)) {
				var temp = coin_ordered[j];
				coin_ordered[j] = coin_ordered[j + 1];
				coin_ordered[j + 1] = temp;
			}
		}
	}

	// calc sum
	var sum = 0;
	for (let i = 0; i < coin_ordered.length; i++) {
		sum = sum + parseFloat(coin_ordered[i].value);
	}

	// if sum < amount then exit;
	var amount = parseFloat($amount);
	if (sum < amount) return -1;

	// find input coins
	var k = 0;
	while (parseFloat(coin_ordered[k].value) <= amount) {
		amount = amount - parseFloat(coin_ordered[k].value);
		if (amount == 0) break;
		k = k + 1;
	}

	/////////////////////////////////////////////////////////////////////////
	// coin[0]- coin[k]
	var data = new Uint8Array(1 + 34 * (k + 1));

	// input num
	var inputNum = numStoreInMemory((k + 1).toString(16), 2);
	data.set(hexstring2ab(inputNum));

	// input coins
	for (var x = 0; x < k + 1; x++) {

		// txid
		var pos = 1 + (x * 34);
		data.set(reverseArray(hexstring2ab(coin_ordered[x]['txid'])),pos);
		//data.set(hexstring2ab(coin_ordered[x]['txid']), pos);

		// index
		pos = 1 + (x * 34) + 32;
		let inputIndex = numStoreInMemory(coin_ordered[x]['index'].toString(16),4);
		//inputIndex = numStoreInMemory(coin_ordered[x]['n'].toString(16), 2);
		data.set(hexstring2ab(inputIndex), pos);
	}

	/////////////////////////////////////////////////////////////////////////

	// calc coin_amount
	var coin_amount = 0;
	for (let i = 0; i < k + 1; i++) {
		coin_amount = coin_amount + parseFloat(coin_ordered[i].value);
	}

	/////////////////////////////////////////////////////////////////////////

	return {
		amount: coin_amount,
		data: data
	}
};

// TODO: We many not need to keep this function in the API
// for now, leaving as reference
export const issueTransaction = ($issueAssetID, $issueAmount, $publicKeyEncoded) => {
	var signatureScript = createSignatureScript($publicKeyEncoded);
	//console.log( signatureScript.toString('hex') );

	var myProgramHash = getHash(signatureScript);
	//console.log( myProgramHash.toString() );

	////////////////////////////////////////////////////////////////////////
	// data
	var data = "01";

	// version
	data = data + "00";

	// attribute
	data = data + "00";

	// Inputs
	data = data + "00";

	// Outputs len
	data = data + "01";

	// Outputs[0] AssetID
	data = data + $issueAssetID

	// Outputs[0] Amount
	const num1 = $issueAmount * 100000000;
	const num1str = numStoreInMemory(num1.toString(16), 16);
	data = data + num1str;

	// Outputs[0] ProgramHash
	data = data + myProgramHash.toString()

	//console.log(data);

	return data;
};

// TODO: we probably don't need to keep this function in the API, people aren't going to be using the wallet to register new assets
// for now, leaving as reference
export const registerTransaction = ($assetName, $assetAmount, $publicKeyEncoded) => {
	var ecparams = ecurve.getCurveByName('secp256r1');
	var curvePt = ecurve.Point.decodeFrom(ecparams,new Buffer($publicKeyEncoded,"hex"));
	var curvePtX = curvePt.affineX.toBuffer(32);
	var curvePtY = curvePt.affineY.toBuffer(32);
	var publicKey = buffer.concat([new Buffer([0x04]), curvePtX, curvePtY]);

	var signatureScript = createSignatureScript($publicKeyEncoded);

	var myProgramHash = getHash(signatureScript);

	// data
	var data = "40";

	// version
	data = data + "00";

	// asset name
	var assetName = ab2hexstring(stringToBytes($assetName));
	var assetNameLen = (assetName.length / 2).toString()
	if (assetNameLen.length == 1) assetNameLen = "0" + assetNameLen;
	data = data + assetNameLen + assetName;

	// asset precision
	data = data + "00";

	// asset type
	data = data + "01";

	// asset recordtype
	data = data + "00";

	// asset amount
	const num1 = $assetAmount * 100000000;
	const num1str = numStoreInMemory(num1.toString(16), 16);
	data = data + num1str;

	// publickey
	var publicKeyXStr = curvePtX.toString('hex');
	var publicKeyYStr = curvePtY.toString('hex');

	data = data + "20" + publicKeyXStr + "20" + publicKeyYStr;
	data = data + myProgramHash.toString();
	data = data + "000000";

	return data;
};

// TODO: this is important
// Also, likely want some high level wrapper that combines TransferTransaction, addContract, and signatureData
export const addContract =( $txData, $sign, $publicKeyEncoded ) => {
	var signatureScript = createSignatureScript($publicKeyEncoded);
  // console.log(signatureScript);
	// sign num
	var data = $txData + "01";
	// sign struct len
	data = data + "41";
	// sign data len
	data = data + "40";
	// sign data
	data = data + $sign;
	// Contract data len
	data = data + "23";
	// script data
	data = data + signatureScript;
  // console.log(data);
	return data;
};

// verify that an ANS address is valid
export const verifyAddress = ( $toAddress ) => {
	var ProgramHash = base58.decode($toAddress);
	var ProgramHexString = CryptoJS.enc.Hex.parse(ab2hexstring(ProgramHash.slice(0, 21)));
	var ProgramSha256 = CryptoJS.SHA256(ProgramHexString);
	var ProgramSha256_2 = CryptoJS.SHA256(ProgramSha256);
	var ProgramSha256Buffer = hexstring2ab(ProgramSha256_2.toString());

	if (ab2hexstring(ProgramSha256Buffer.slice(0, 4)) != ab2hexstring(ProgramHash.slice(21, 25))) {
		//address verify failed.
		return false;
	}

	return true;
}

// verify that public key is valid
export const verifyPublicKeyEncoded = ( $publicKeyEncoded ) => {
	var publicKeyArray = hexstring2ab( $publicKeyEncoded );
	if ( publicKeyArray[0] != 0x02 && publicKeyArray[0] != 0x03 ) {
		return false;
	}

	var ecparams = ecurve.getCurveByName('secp256r1');
	var curvePt = ecurve.Point.decodeFrom(ecparams,new Buffer($publicKeyEncoded,"hex"));
	var curvePtX = curvePt.affineX.toBuffer(32);
	var curvePtY = curvePt.affineY.toBuffer(32);

	// console.log( "publicKeyArray", publicKeyArray );
	// console.log( "curvePtX", curvePtX );
	// console.log( "curvePtY", curvePtY );

	if ( publicKeyArray[0] == 0x02 && curvePtY[31] % 2 == 0 ) {
		return true;
	}

	if ( publicKeyArray[0] == 0x03 && curvePtY[31] % 2 == 1 ) {
		return true;
	}

	return false;
};

// TODO: important, requires significant documentation
// all of these arguments should be documented and made clear, what $coin looks like etc.
// also, remove $ variable names, most likey
export const transferTransaction = ($coin, $publicKeyEncoded, $toAddress, $Amount) => {
	var ProgramHash = base58.decode($toAddress);
	var ProgramHexString = CryptoJS.enc.Hex.parse(ab2hexstring(ProgramHash.slice(0, 21)));
	var ProgramSha256 = CryptoJS.SHA256(ProgramHexString);
	var ProgramSha256_2 = CryptoJS.SHA256(ProgramSha256);
	var ProgramSha256Buffer = hexstring2ab(ProgramSha256_2.toString());

	if (ab2hexstring(ProgramSha256Buffer.slice(0, 4)) != ab2hexstring(ProgramHash.slice(21, 25))) {
		//address verify failed.
		return -1;
	}

	ProgramHash = ProgramHash.slice(1, 21)

	var signatureScript = createSignatureScript($publicKeyEncoded);
	var myProgramHash = getHash(signatureScript);
	// INPUT CONSTRUCT
	var inputData = getInputData($coin, $Amount);
	if (inputData == -1) return null;
	// console.log('wallet inputData', inputData );

	var inputLen = inputData.data.length;
	var inputAmount = inputData.amount;

  // console.log(inputLen, inputAmount, $Amount);
	// Set SignableData Len
	var signableDataLen = 124 + inputLen;
	if (inputAmount == $Amount) {
		signableDataLen = 64 + inputLen;
	}

	// CONSTRUCT
	var data = new Uint8Array(signableDataLen);

	// type
	data.set(hexstring2ab("80"), 0);

	// version
	data.set(hexstring2ab("00"), 1);

	// Attributes
	data.set(hexstring2ab("00"), 2);

	// INPUT
	data.set(inputData.data, 3);

	// OUTPUT
	if (inputAmount == $Amount) {
		// only one output

		// output num
		data.set(hexstring2ab("01"), inputLen + 3);

		////////////////////////////////////////////////////////////////////
		// OUTPUT - 0

		// output asset
		data.set(reverseArray(hexstring2ab($coin['assetid'])),inputLen+4);
		//data.set(hexstring2ab($coin['assetid']), inputLen + 4);

		// output value
		const num1 = parseInt($Amount * 100000000);
		const num1str = numStoreInMemory(num1.toString(16), 16);
		data.set(hexstring2ab(num1str), inputLen + 36);

		// output ProgramHash
		data.set(ProgramHash, inputLen + 44);

		////////////////////////////////////////////////////////////////////

	} else {

		// output num
		data.set(hexstring2ab("02"), inputLen + 3);

		////////////////////////////////////////////////////////////////////
		// OUTPUT - 0

		// output asset
		data.set(reverseArray(hexstring2ab($coin['assetid'])),inputLen+4);
		//data.set(hexstring2ab($coin['assetid']), inputLen + 4);

		// output value
		const num1 = parseInt($Amount * 100000000);
		const num1str = numStoreInMemory(num1.toString(16), 16);
		data.set(hexstring2ab(num1str), inputLen + 36);

		// output ProgramHash
		data.set(ProgramHash, inputLen + 44);

		////////////////////////////////////////////////////////////////////
		// OUTPUT - 1

		// output asset
		data.set(reverseArray(hexstring2ab($coin['assetid'])),inputLen+64);
		//data.set(hexstring2ab($coin['assetid']), inputLen + 64);

		// output value
		const num2 = parseInt(inputAmount * 100000000 - num1);
		const num2str = numStoreInMemory(num2.toString(16), 16);
		data.set(hexstring2ab(num2str), inputLen + 96);

		// output ProgramHash
		data.set(hexstring2ab(myProgramHash.toString()), inputLen + 104);

		////////////////////////////////////////////////////////////////////

		//console.log( "Signature Data:", ab2hexstring(data) );
	}

	return ab2hexstring(data);
};

export const claimTransaction = (claims, publicKeyEncoded, toAddress, amount) => {

	var signatureScript = createSignatureScript(publicKeyEncoded);
	var myProgramHash = getHash(signatureScript);

	// Type = ClaimTransaction
	let data = "02";

	// Version is always 0 in protocol for now
	data = data + "00";

	// Transaction-specific attributs: claims

	// 1) store number of claims (txids)
	let len = claims.length;
	let lenstr = numStoreInMemory(len.toString(16), 2);
	data = data + lenstr;

  let total_amount = 0;

  // 2) iterate over claim txids
	for ( let k=0; k<len; k++ ) {
    // get the txid
		let txid = claims[k]['txid'];
    // add txid to data
		data = data + ab2hexstring(reverseArray(hexstring2ab(txid)));

		let vout = claims[k]['index'].toString(16);
		data = data + numStoreInMemory(vout, 4);
	}

	// Don't need any attributes
	data = data + "00";

	// Don't need any inputs
	data = data + "00";

	// One output for where the claim will be sent
	data = data + "01";

	// First add assetId for GAS
	data = data + ab2hexstring(reverseArray(hexstring2ab("602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7")))

	// Net add total amount of the claim
	const num1str = numStoreInMemory(amount.toString(16), 16);
	data = data + num1str;

	// Finally add program hash
	data = data + myProgramHash.toString();

	//console.log(data);

	return data;
};

export const toAddress = ($ProgramHash) => {
	var data = new Uint8Array(1 + $ProgramHash.length);
	data.set([23]);
	data.set($ProgramHash, 1);
	//console.log(ab2hexstring(data));

	var ProgramHexString = CryptoJS.enc.Hex.parse(ab2hexstring(data));
	var ProgramSha256 = CryptoJS.SHA256(ProgramHexString);
	var ProgramSha256_2 = CryptoJS.SHA256(ProgramSha256);
	var ProgramSha256Buffer = hexstring2ab(ProgramSha256_2.toString());
	//console.log(ab2hexstring(ProgramSha256Buffer));

	var datas = new Uint8Array(1 + $ProgramHash.length + 4);
	datas.set(data);
	datas.set(ProgramSha256Buffer.slice(0, 4), 21);
	//console.log(ab2hexstring(datas));

	return base58.encode(datas);
};

export const generateRandomArray = ($arrayLen) => {
 	return secureRandom($arrayLen);
}

export const generatePrivateKey = () => {
	return secureRandom(32);
};

export const getPrivateKeyFromWIF = ($wif) => {
	var data = base58.decode($wif);

	if (data.length != 38 || data[0] != 0x80 || data[33] != 0x01) {
    // basic encoding errors
		return -1;
	}

	var dataHexString = CryptoJS.enc.Hex.parse(ab2hexstring(data.slice(0, data.length - 4)));
	var dataSha256 = CryptoJS.SHA256(dataHexString);
	var dataSha256_2 = CryptoJS.SHA256(dataSha256);
	var dataSha256Buffer = hexstring2ab(dataSha256_2.toString());

	if (ab2hexstring(dataSha256Buffer.slice(0, 4)) != ab2hexstring(data.slice(data.length - 4, data.length))) {
		//wif verify failed.
		return -2;
	}

	return data.slice(1, 33).toString("hex");
};


export const getPublicKey = ($privateKey, $encode) => {
	var ecparams = ecurve.getCurveByName('secp256r1');
	var curvePt = ecparams.G.multiply(BigInteger.fromBuffer(hexstring2ab($privateKey)));
	return curvePt.getEncoded($encode);
};

export const getPublicKeyEncoded = ($publicKey) => {
	var publicKeyArray = hexstring2ab($publicKey);
	if ( publicKeyArray[64] % 2 == 1 ) {
		return "03" + ab2hexstring(publicKeyArray.slice(1, 33));
	} else {
		return "02" + ab2hexstring(publicKeyArray.slice(1, 33));
	}
};

export const createSignatureScript = ($publicKeyEncoded) => {
	return "21" + $publicKeyEncoded.toString('hex') + "ac";
};

export const getHash = ($SignatureScript) => {
	var ProgramHexString = CryptoJS.enc.Hex.parse($SignatureScript);
	var ProgramSha256 = CryptoJS.SHA256(ProgramHexString);
	return CryptoJS.RIPEMD160(ProgramSha256);
};

export const signatureData = ($data, $privateKey) => {
	var msg = CryptoJS.enc.Hex.parse($data);
	var msgHash = CryptoJS.SHA256(msg);
  const msgHashHex = new Buffer(msgHash.toString(), "hex")
  const privateKeyHex = new Buffer($privateKey, "hex");
	// console.log( "msgHash:", msgHashHex.toString('hex'));
  // console.log('buffer', privateKeyHex.toString('hex'));

  var elliptic = new ec('p256');
  const sig = elliptic.sign(msgHashHex, $privateKey, null);
  const signature = {
    signature: Buffer.concat([
      sig.r.toArrayLike(Buffer, 'be', 32),
      sig.s.toArrayLike(Buffer, 'be', 32)
    ])
  }
	return signature.signature.toString('hex');
};

export const fetchAccountsFromPublicKeyEncoded = ($publicKeyEncoded) => {
	if ( !verifyPublicKeyEncoded( $publicKeyEncoded ) ) {
		// verify failed.
		return -1
	}

	var accounts = [];

	var publicKeyHash = getHash($publicKeyEncoded);
	//console.log( publicKeyHash );

	var script = createSignatureScript($publicKeyEncoded);
	//console.log( script );

	var programHash = getHash(script);
	//console.log( programHash );

	var address = toAddress(hexstring2ab(programHash.toString()));
	//console.log( address );

	accounts[0] = {
		privatekey: '',
		publickeyEncoded: $publicKeyEncoded,
		publickeyHash: publicKeyHash.toString(),
		programHash: programHash.toString(),
		address: address,
	};

	return accounts;
};

// TODO: why does this wrap return info in a list? seems unnecessary
// ditto for all the other GetAccounts methods
export const getAccountsFromPrivateKey = ($privateKey) => {
	if ($privateKey.length != 64) {
		return -1;
	}

	var accounts = [];
	var publicKeyEncoded = getPublicKey($privateKey, true);
	//console.log( publicKeyEncoded );

	var publicKeyHash = getHash(publicKeyEncoded.toString('hex'));
	//console.log( publicKeyHash );

	var script = createSignatureScript(publicKeyEncoded);
	//console.log( script );

	var programHash = getHash(script);
	//console.log( programHash );

	var address = toAddress(hexstring2ab(programHash.toString()));
	//console.log( address );

	accounts[0] = {
		privatekey: $privateKey,
		publickeyEncoded: publicKeyEncoded.toString('hex'),
		publickeyHash: publicKeyHash.toString(),
		programHash: programHash.toString(),
		address: address,
	};

	return accounts;
};

// lookup account data (publicKey, privateKey, address, etc. from WIF)
// returns -1 for basic encoding errors
// returns -2 for WIF verify fail
export const getAccountsFromWIFKey = ($WIFKey) => {
	var privateKey = getPrivateKeyFromWIF($WIFKey);
	if (privateKey == -1 || privateKey == -2) {
		return privateKey;
	}

	return getAccountsFromPrivateKey(privateKey);
};
