import comm_node from './ledger-comm-node';

import { verifyAddress, neoId, gasId, getPublicKeyEncoded, getAccountsFromPublicKey, getAccountsFromWIFKey, getBalance, transferTransaction, addContract, queryRPC, signatureData, getAPIEndpoint, claimTransaction } from 'neon-js';
import axios from 'axios';

export var ledgerNanoS_PublicKey = undefined;

export var ledgerNanoS_PublicKeyInfo = undefined;

export var ledgerNanoS_DeviceInfo = undefined;

const bip44_path =
  "8000002C"
  + "80000378"
  + "80000000"
  + "00000000"
  + "00000000";

export const ledgerNanoS_AsynchGetInfo = function() {
  ledgerNanoS_DeviceInfo = "Initialising Device Info";
  ledgerNanoS_PublicKeyInfo = "Initialising App Info";

  process.stdout.write( "started ledgerNanoS_AsynchGetInfo  \n" );
  var promiseLedgerDevice = new Promise( getLedgerDeviceInfo );
  process.stdout.write( "success ledgerNanoS_AsynchGetInfo  \n" );


  var catchFn = function( reason ) {
    process.stdout.write( "ledgerNanoS_AsynchGetInfo error reason " + reason + "\n" );
  };

  return promiseLedgerDevice.then( function() {
    var promisePublicKey = new Promise( getPublicKeyInfo );
    return promisePublicKey;
  } ).catch( catchFn );
};

const getLedgerDeviceInfo = function( resolve, reject ) {
  process.stdout.write( "started getLedgerDeviceInfo  \n" );
  ledgerNanoS_DeviceInfo = "Looking for USB Devices";
  comm_node.list_async().then( function( result ) {
    if ( result.length == 0 ) {
      process.stdout.write( "getLedgerDeviceInfo \"No device found\"\n" );
      ledgerNanoS_DeviceInfo = "USB Failure : No device found";
      resolve( ledgerNanoS_DeviceInfo );
    } else {
      comm_node.create_async().then( function( comm ) {
        var deviceInfo = comm.device.getDeviceInfo();
        ledgerNanoS_DeviceInfo = "Found USB " + deviceInfo.manufacturer + " " + deviceInfo.product;
        process.stdout.write( "getLedgerDeviceInfo success  \"" + ledgerNanoS_DeviceInfo + "\"\n" );
        comm.device.close();
        resolve( ledgerNanoS_DeviceInfo );
      } )
      .catch( function( reason ) {
        comm.device.close();
        ledgerNanoS_DeviceInfo = "Finding USB Error :" + reason;
        process.stdout.write( "getLedgerDeviceInfo error reason \"" + reason + "\"\n" );
        resolve( ledgerNanoS_DeviceInfo );
      } );
    }
  } );
  process.stdout.write( "success getLedgerDeviceInfo  \n" );
};

const getPublicKeyInfo = function( resolve, reject ) {
  process.stdout.write( "started getPublicKeyInfo  \n" );
  ledgerNanoS_PublicKey = undefined;
  ledgerNanoS_PublicKeyInfo = undefined;
  comm_node.list_async().then( function( result ) {
    if ( result.length == 0 ) {
      process.stdout.write( "getPublicKeyInfo \"No device found\"\n" );
      ledgerNanoS_PublicKeyInfo = "App Failure : No device found";
      resolve( ledgerNanoS_DeviceInfo );
    } else {
      comm_node.create_async().then( function( comm ) {
        var message = Buffer.from( "8004000000" + bip44_path, "hex" );
        var validStatus = [0x9000];
        comm.exchange( message.toString( "hex" ), validStatus ).then( function( response ) {
          comm.device.close();
          ledgerNanoS_PublicKey = response.substring( 0, 130 );
          ledgerNanoS_PublicKeyInfo = "App Found, Public Key Available";
          process.stdout.write( "getPublicKeyInfo success  \"" + ledgerNanoS_PublicKeyInfo + "\"\n" );
          resolve( ledgerNanoS_PublicKeyInfo );
        } ).catch( function( reason ) {
          comm.device.close();
          process.stdout.write( "getPublicKeyInfo comm.exchange error reason " + reason + "\n" );
          if ( reason == "Invalid status 28160" ) {
            ledgerNanoS_PublicKeyInfo = "NEO App does not appear to be open, request for private key returned error 28160.";
          } else {
            ledgerNanoS_PublicKeyInfo = "Public Key Comm Messaging Error :" + reason;
          }
          resolve( ledgerNanoS_PublicKeyInfo );
        } );
      } )
      .catch( function( reason ) {
        comm.device.close();
        process.stdout.write( "getPublicKeyInfo comm_node.create_async error reason " + reason + "\n" );
        ledgerNanoS_PublicKeyInfo = "Public Key Comm Init Error :" + reason;
        resolve( ledgerNanoS_PublicKeyInfo );
      } );

    }
  } );
  process.stdout.write( "success getPublicKeyInfo  \n" );
};

export const ledgerNanoS_doSendAsset = ( net, toAddress, fromWif, assetType, amount ) => {
  return new Promise( function( resolve, reject ) {
    process.stdout.write( "started ledgerNanoS_doSendAsset \n" );
    let assetId, assetName, assetSymbol;
    if ( assetType === "Neo" ) {
      assetId = neoId;
    } else {
      assetId = gasId;
    }

    var fromAccount;
    if ( fromWif == undefined ) {
      const publicKey = ledgerNanoS_PublicKey;
      const publicKeyEncoded = getPublicKeyEncoded( publicKey );
      fromAccount = getAccountsFromPublicKey( publicKeyEncoded )[0];
    } else {
      fromAccount = getAccountsFromWIFKey( fromWif )[0];
    }
    process.stdout.write( "interim ledgerNanoS_doSendAsset fromAccount \"" + JSON.stringify( fromAccount ) + "\" \n" );

    return getBalance( net, fromAccount.address ).then(( response ) => {
      process.stdout.write( "interim ledgerNanoS_doSendAsset getBalance response \"" + JSON.stringify( response ) + "\" \n" );

      const coinsData = {
          "assetid": assetId,
          "list": response.unspent[assetType],
          "balance": response[assetType],
          "name": assetType
      }
      process.stdout.write( "interim ledgerNanoS_doSendAsset transferTransaction \n" );

      const txData = transferTransaction( coinsData, fromAccount.publickeyEncoded, toAddress, amount );

      process.stdout.write( "interim ledgerNanoS_doSendAsset txData \"" + txData + "\" \n" );

      ledgerNanoS_signAndAddContractAndSendTransaction(fromWif, net, txData, fromAccount).then( function( response ) {
        resolve( response );
      } );
    } );
  } );
};

const ledgerNanoS_signAndAddContractAndSendTransaction = async function(fromWif, net, txData, account ) {
  return new Promise( function( resolve, reject ) {
    if ( fromWif == undefined ) {
      createSignatureAsynch( txData ).then( function( sign ) {
        process.stdout.write( "interim ledgerNanoS_signAndAddContractAndSendTransaction sign Ledger \"" + sign + "\" \n" );
        ledgerNanoS_addContractAndSendTransaction( net, txData, sign, account.publickeyEncoded ).then( function( response ) {
          resolve( response );
        } );
      } );
    } else {
      let sign = signatureData( txData, account.privatekey );
      process.stdout.write( "interim ledgerNanoS_signAndAddContractAndSendTransaction sign fromWif \"" + sign + "\" \n" );
      ledgerNanoS_addContractAndSendTransaction( net, txData, sign, account.publickeyEncoded ).then( function( response ) {
        resolve( response );
      } );
    }
  } );
}

const ledgerNanoS_addContractAndSendTransaction = async function( net, txData, sign, publickeyEncoded ) {
  return new Promise( function( resolve, reject ) {
    process.stdout.write( "interim ledgerNanoS_addContractAndSendTransaction txData \"" + txData + "\" \n" );
    process.stdout.write( "interim ledgerNanoS_addContractAndSendTransaction sign \"" + sign + "\" \n" );
    const txRawData = addContract( txData, sign, publickeyEncoded );
    process.stdout.write( "interim ledgerNanoS_addContractAndSendTransaction txRawData \"" + txRawData + "\" \n" );
    queryRPC( net, "sendrawtransaction", [txRawData], 4 ).then( function( response ) {
      process.stdout.write( "interim ledgerNanoS_addContractAndSendTransaction response \"" + JSON.stringify( response ) + "\" \n" );
      resolve( response );
    } );
  } );
};


export const ledgerNanoS_doClaimAllGas = ( net, fromWif ) => {
  return new Promise( function( resolve, reject ) {
    process.stdout.write( "started ledgerNanoS_doClaimAllGas \n" );
    const apiEndpoint = getAPIEndpoint( net );

    var account;
    if ( fromWif == undefined ) {
      const publicKey = ledgerNanoS_PublicKey;
      const publicKeyEncoded = getPublicKeyEncoded( publicKey );
      account = getAccountsFromPublicKey( publicKeyEncoded )[0];
    } else {
      account = getAccountsFromWIFKey( fromWif )[0];
    }

    // TODO: when fully working replace this with mainnet/testnet switch
    return axios.get( apiEndpoint + "/v2/address/claims/" + account.address ).then(( response ) => {
      const claims = response.data["claims"];
      const total_claim = response.data["total_claim"];
      const txData = claimTransaction( claims, account.publickeyEncoded, account.address, total_claim );
      process.stdout.write( "interim ledgerNanoS_doSendAsset txData \"" + txData + "\" \n" );

      ledgerNanoS_signAndAddContractAndSendTransaction(fromWif, net, txData, account).then( function( response ) {
        resolve( response );
      } );
    } );
  } );
}

const createSignatureAsynch = function( txData ) {
  return new Promise( function( resolve, reject ) {
    var signatureInfo = "Ledger Signing Text of Length [" + txData.length + "], Please Confirm Using the Device's Buttons. " + txData;

    const signData = txData + bip44_path;
    
    process.stdout.write( signatureInfo + "\n" );

    const validStatus = [0x9000];

    const messages = [];

    const bufferSize = 255 * 2;
    let offset = 0;
    while ( offset < signData.length ) {
      let chunk;
      let p1;
      if ( ( signData.length - offset ) > bufferSize ) {
        chunk = signData.substring( offset, offset + bufferSize );
      } else {
        chunk = signData.substring( offset );
      }
      if ( ( offset + chunk.length ) == signData.length ) {
        p1 = "80";
      } else {
        p1 = "00";
      }

      const chunkLength = chunk.length / 2;

      process.stdout.write( "Ledger Signature chunkLength " + chunkLength + "\n" );

      let chunkLengthHex = chunkLength.toString( 16 );
      while ( chunkLengthHex.length < 2 ) {
        chunkLengthHex = "0" + chunkLengthHex;
      }

      process.stdout.write( "Ledger Signature chunkLength hex " + chunkLengthHex + "\n" );

      messages.push( "8002" + p1 + "00" + chunkLengthHex + chunk );
      offset += chunk.length;
    }

    comm_node.create_async( 0, false ).then( function( comm ) {
      for ( let ix = 0; ix < messages.length; ix++ ) {
        let message = messages[ix];
        process.stdout.write( "Ledger Message (" + ix + "/" + messages.length + ") " + message + "\n" );

        comm.exchange( message, validStatus ).then( function( response ) {
          process.stdout.write( "Ledger Signature Response " + response + "\n" );
          if ( response != "9000" ) {
            comm.device.close();

            /**
             * https://stackoverflow.com/questions/25829939/specification-defining-ecdsa-signature-data <br>
             * the signature is TLV encoded. the first byte is 30, the "signature" type<br>
             * the second byte is the length (always 44)<br>
             * the third byte is 02, the "number: type<br>
             * the fourth byte is the length of R (always 20)<br>
             * the byte after the encoded number is 02, the "number: type<br>
             * the byte after is the length of S (always 20)<br>
             * <p>
             * eg:
             * 304402200262675396fbcc768bf505c9dc05728fd98fd977810c547d1a10c7dd58d18802022069c9c4a38ee95b4f394e31a3dd6a63054f8265ff9fd2baf68a9c4c3aa8c5d47e9000
             * is 30LL0220RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR0220SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
             */

            let rLenHex = response.substring( 6, 8 );
            // process.stdout.write( "Ledger Signature rLenHex " + rLenHex + "\n" );
            let rLen = parseInt( rLenHex, 16 ) * 2;
            // process.stdout.write( "Ledger Signature rLen " + rLen + "\n" );
            let rStart = 8;
            // process.stdout.write( "Ledger Signature rStart " + rStart + "\n" );
            let rEnd = rStart + rLen;
            // process.stdout.write( "Ledger Signature rEnd " + rEnd + "\n" );

            while ( ( response.substring( rStart, rStart + 2 ) == "00" ) && ( ( rEnd - rStart ) > 64 ) ) {
              rStart += 2;
            }

            let r = response.substring( rStart, rEnd );
            process.stdout.write( "Ledger Signature R [" + rStart + "," + rEnd + "]:" + ( rEnd - rStart ) + " " + r + "\n" );
            let sLenHex = response.substring( rEnd + 2, rEnd + 4 );
            // process.stdout.write( "Ledger Signature sLenHex " + sLenHex + "\n" );
            let sLen = parseInt( sLenHex, 16 ) * 2;
            // process.stdout.write( "Ledger Signature sLen " + sLen + "\n" );
            let sStart = rEnd + 4;
            // process.stdout.write( "Ledger Signature sStart " + sStart + "\n" );
            let sEnd = sStart + sLen;
            // process.stdout.write( "Ledger Signature sEnd " + sEnd + "\n" );

            while ( ( response.substring( sStart, sStart + 2 ) == "00" ) && ( ( sEnd - sStart ) > 64 ) ) {
              sStart += 2;
            }

            let s = response.substring( sStart, sEnd );
            process.stdout.write( "Ledger Signature S [" + sStart + "," + sEnd + "]:" + ( sEnd - sStart ) + " " + s + "\n" );

            let msgHashStart = sEnd + 4;
            let msgHashEnd = msgHashStart + 64;
            let msgHash = response.substring( msgHashStart, msgHashEnd );
            process.stdout.write( "Ledger Signature msgHash [" + msgHashStart + "," + msgHashEnd + "] " + msgHash + "\n" );

            let signature = r + s;
            let signatureInfo = "Signature of Length [" + signature.length + "] : " + signature;
            process.stdout.write( signatureInfo + "\n" );


            resolve( signature );
          }
        } )
        .catch( function( reason ) {
          comm.device.close();
          signatureInfo = "An error occured[1]: " + reason;
          process.stdout.write( "Signature Reponse " + signatureInfo + "\n" );
          reject( signatureInfo );
        } );
      }
    } )
    .catch( function( reason ) {
      comm.device.close();
      signatureInfo = "An error occured[2]: " + reason;
      process.stdout.write( "Signature Reponse " + signatureInfo + "\n" );
      reject( signatureInfo );
    } );
  } );
}
