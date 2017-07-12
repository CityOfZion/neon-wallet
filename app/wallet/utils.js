const ab2str = buf => { return String.fromCharCode.apply(null, new Uint8Array(buf)); }

const str2ab = str => {
  var bufView = new Uint8Array(str.length);
	for (var i = 0, strLen = str.length; i < strLen; i++) {
		bufView[i] = str.charCodeAt(i);
	}
	return bufView;
}

const hexstring2ab = str => {
  var result = [];
	while (str.length >= 2) {
		result.push(parseInt(str.substring(0, 2), 16));
		str = str.substring(2, str.length);
	}

	return result;
}

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

const reverseArray = arr => {
  var result = new Uint8Array(arr.length);
  for (var i = 0; i < arr.length; i++) {
    result[i] = arr[arr.length - 1 - i];
  }

  return result;
}

const numStoreInMemory = (num, length) => {
  for (var i = num.length; i < length; i++) {
    num = '0' + num;
  }
  var data = reverseArray(new Buffer(num, "HEX"));

  return ab2hexstring(data);
}

const stringToBytes = str => {
  var utf8 = unescape(encodeURIComponent(str));

  var arr = [];
  for (var i = 0; i < utf8.length; i++) {
    arr.push(utf8.charCodeAt(i));
  }

  return arr;
}

const getTransferTxData = (txData) => {
  var ba = new Buffer(txData, "hex");
  const Transaction = () => {
      this.type = 0;
      this.version = 0;
      this.attributes = "";
      this.inputs = [];
      this.outputs = [];
  };

  var tx = new Transaction();

  // Transfer Type
  if (ba[0] != 0x80) return;
  tx.type = ba[0];

  // Version
  tx.version = ba[1];

  // Attributes
  var k = 2;
  var len = ba[k];
  for (i = 0; i < len; i++) {
      k = k + 1;
  }

  // Inputs
  k = k + 1;
  len = ba[k];
  for (i = 0; i < len; i++) {
      tx.inputs.push({
          txid: ba.slice(k + 1, k + 33),
          index: ba.slice(k + 33, k + 35)
      });
      //console.log( "txid:", tx.inputs[i].txid );
      //console.log( "index:", tx.inputs[i].index );
      k = k + 34;
  }

  // Outputs
  k = k + 1;
  len = ba[k];
  for (i = 0; i < len; i++) {
      tx.outputs.push({
          assetid: ba.slice(k + 1, k + 33),
          value: ba.slice(k + 33, k + 41),
          scripthash: ba.slice(k + 41, k + 61)
      });
      //console.log( "outputs.assetid:", tx.outputs[i].assetid );
      //console.log( "outputs.value:", tx.outputs[i].value );
      //console.log( "outputs.scripthash:", tx.outputs[i].scripthash );
      k = k + 60;
  }

  return tx;
}

export {
  ab2str,
  str2ab,
  hexstring2ab,
  ab2hexstring,
  reverseArray,
  numStoreInMemory,
  stringToBytes
}
