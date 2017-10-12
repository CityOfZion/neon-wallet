import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { ledgerNanoS_Login } from '../modules/account';
import { sendEvent, clearTransactionEvent } from '../modules/transactions';

import { ledgerNanoS_AsynchGetInfo, ledgerNanoS_PublicKey, ledgerNanoS_DeviceInfo, ledgerNanoS_PublicKeyInfo } from '../modules/ledgerNanoS';


const logo = require( '../images/neon-logo2.png' );

const onLedgerNanoSChange = ( dispatch, history ) => {
    if ( ledgerNanoS_PublicKey != undefined ) {
        dispatch( ledgerNanoS_Login() );
        history.push('/dashboard');
    }
}


class LoginLedgerNanoS extends Component {
    componentDidMount = () => {
        const self = this;
        process.stdout.write( "started componentDidMount  \n" );
        var thenFn = function() {
            process.stdout.write( "started componentDidMount.forceUpdate  \n" );
            self.forceUpdate();
            process.stdout.write( "success componentDidMount.forceUpdate  \n" );
            };
        var catchFn = function( reason ) {
            process.stdout.write( "componentDidMount error reason " + reason + "\n" );
        }
        ledgerNanoS_AsynchGetInfo().then(thenFn).catch(catchFn);
        process.stdout.write( "success componentDidMount  \n" );
    }
    render = () => {
        const dispatch = this.props.dispatch;
        const history = this.props.history;
        return (
            <div id="loginPage">
                <div className="login">
                    <div className="loginForm">
                        <div className="logo"><img src={logo} width="60px" /></div>
                    </div>
                    <div className="loginButtons">
                        <button onClick={( e ) => onLedgerNanoSChange( dispatch, history )}>Use Ledger Nano S</button>
                        <Link to="/"><button className="altButton">Home</button></Link>
                    </div>
                    <div id="ledger_device_info">{ledgerNanoS_DeviceInfo}</div>
                    <div id="ledger_app_info">{ledgerNanoS_PublicKeyInfo}</div>
                    <div id="footer">Created by Ethan Fast and COZ. Ledger Integration by Coranos. Donations: Adr3XjZ5QDzVJrWvzmsTTchpLRRGSzgS5A</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ( state ) => ( {
} );

LoginLedgerNanoS = connect( mapStateToProps )( LoginLedgerNanoS );

export default LoginLedgerNanoS;
