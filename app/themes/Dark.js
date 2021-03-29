var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var BASE = {
    '--base-scrollbar-track': '#39404c',
    '--base-scrollbar-thumb': '#5c677f',
    '--base-main-background': '#242B31',
    '--base-text': '#fff',
    '--base-link-color': '#6bdaf6',
};
var BUTTON = {
    '--button-primary-disabled-box-shadow': '-12px -12px 36px 0 rgba(70,77,83,0.50), 12px 12px 36px 0 rgba(18,21,23,0.99), inset -1px -1px 0 0 rgba(0,0,0,0.32), inset 1px 1px 0 0 rgba(214,210,210,0.14)',
    '--button-primary-box-shadow': '-4px -4px 20px 0 rgba(94,101,107,0.50), 4px 4px 20px 0 rgba(18,21,23,0.81), inset -1px -1px 0 0 rgba(0,0,0,0.32), inset 1px 1px 0 0 rgba(214,210,210,0.14)',
    '--button-primary-disabled-background-image': 'linear-gradient(180deg, #313e46 0%, #20292f 100%)',
    '--button-primary-disabled-text-color': '#4C5763',
    '--button-primary-disabled-background-color': '#4C5763',
    '--button-primary-background-image': 'linear-gradient(180deg, #42535D 0%, #273139 100%)',
    '--button-primary-hover-background-image': ' linear-gradient(180deg, #566A76 0%, #33414A 100%)',
    '--button-active': 'linear-gradient(180deg, #273139 0%, #313D45 100%)',
    '--button-active-text': '#4CFFB3',
    '--button-secondary-background': 'transparent',
    '--button-primary-background': '#4CFFB3',
    '--button-primary-hover': '#4CFFB3',
    '--button-secondary-hover': 'transparent',
    '--button-primary-text': '#4CFFB3',
    '--button-secondary-text': '#394152',
    '--button-icon-color': '#4CFFB3',
    '--button-active-hover': 'linear-gradient(180deg, #273139 0%, #313D45 100%)',
    '--button-priority-active-hover': 'linear-gradient(180deg, #273139 0%, #313D45 100%)',
    '--secondary-button-icon-color': '#fff',
    '--button-priority-standard-icon-color': '#4CFFB3',
    '--button-priority-transfer-background': 'linear-gradient(180deg, #42535D 0%, #273139 100%)',
    '--button-priority-transfer-color': '#9DB2BB',
    '--button-priority-transfer-disabled-color': '#495460',
    '--button-priority-disabled-opacity': '.6',
    '--button-priority-transfer-disabled': 'linear-gradient(180deg, #2E3B44 0%, #20292F 100%)',
    '--button-max-amount-background': '#8D98AE',
    '--button-max-amount-text': '#394152',
    '--button-flag-icon-color': '#fff',
    '--button-flag-icon-opacity': 0.6,
    '--button-priority-conditional-box-shadow': ' -12px -12px 36px 0 rgba(70, 77, 83, 0.46), 12px 12px 36px 0 rgba(18, 21, 23, 0.99), inset -1px -1px 0 0 rgba(0, 0, 0, 0.32), inset 1px 1px 0 0 rgba(214, 210, 210, 0.14)',
    '--secondary-raised-base-text': '#fff',
};
var INPUT = {
    '--input-background': '#28313A',
    '--input-error': '#ee6d66',
    '--input-error-text': '#fff',
    '--input-text': '#fff',
    '--input-label-opacity': 0.5,
    '--input-label': '#fff',
    '--input-select-hover': '#39404c',
    '--input-active': '#4CFFB3',
    '--input-icon': '#9ca0a9',
    '--input-placeholder': 'rgba(255, 255, 255, 0.5)',
    '--input-active-border': '#4CFFB3',
};
var HEADER_BAR = {
    '--header-bar-default-icon-color': '#4CFFB3',
};
var TAB = {
    '--tab-text': '#394152',
    '--tab-border': '#394152',
};
var PANEL = {
    '--panel-icon': '#4CFFB3',
    '--panel-header': '#21242C',
    '--panel-header-text': '#fff',
    '--panel-background': '#303740',
    '--panel-header-border': '#8d98ae',
    '--panel-label-text': '#8d98ae',
    '--panel-full-height-background': '#333D46',
    '--panel-full-height-nav-background': '#21242C',
    '--panel-full-height-instructions-text': '#fff',
    '--panel-full-height-instructions-border': '#8D98AE',
    '--panel-full-height-header-icon-color': '#fff',
    '--panel-receive-explanation': '#394152',
    '--view-layout-header-icon-color': '#4CFFB3',
};
var MODAL = {
    '--modal-overlay': 'rgba(0,0,0,0.60)',
};
var AUTH_STYLES = {
    '--auth-main-container-background': '#333D46',
    '--auth-secondary-button-background': 'transparent',
    '--auth-scan-qr-border': '#5c677f',
};
var DASHBOARD = {
    '--dashboard-market-data-line': '#4CFFB3',
    '--dashboard-asset-panel-total-background': '#343B4A',
    '--dashboard-total-wallet-value-odd-row': '#343B4A',
    '--dashboard-total-wallet-value-total-text': '#fff',
    '--dashboard-asset-panel-asset-name': 'rgba(255, 255, 255, 0.9)',
    '--dashboard-token-balances-divider-line': '#343B4A',
    '--dashboard-price-history-current-price': '#fff',
};
var SIDEBAR = {
    '--sidebar-background': '#2A333B',
    '--side-bar-disabled-item-background': '#1B2029',
    '--sidebar-icon': '#9CA0A8',
    '--sidebar-active-border': '#4CFFB3',
    '--sidebar-active-background': '#1B2029',
    '--sidebar-active-icon': '#fff',
};
var TX_LIST = {
    '--tx-list-odd-row': '#39404c',
    '--tx-list-button-icon': '#4CFFB3',
    '--tx-list-copy-icon': '#4CFFB3',
    '--tx-icon-color': '#4CFFB3',
};
var SETTINGS = {
    '--settings-item-label': '#fff',
    '--settings-item-icon': 'rgba(255, 255, 255, 0.5)',
    '--settings-item-border-color': '#8D98AE',
    '--settings-link-text': '#4CFFB3',
    '--settings-select-value-text': '#4CFFB3',
    '--settings-donation-text': '#F2F2F2',
    '--settings-spacer': 'rgba(170, 178, 189, 0.3)',
};
var NODE_SELECT = {
    '--node-select-header-background': '#1B2029',
    '--node-select-icon-color': '#4CFFB3',
    '--node-select-automatic-select-button-text': '#FFFFFF',
    '--node-select-refresh-icon': '#4CFFB3',
    '--node-select-node-count': 'rgba(255, 255, 255, 0.5)',
};
var AMOUNTS_PANEL = {
    '--amounts-panel-first-row-background': '#1B2029',
    '--amounts-panel-second-row-background': '#12161E',
    '--amounts-panel-asset-name-text': 'rgba(255, 255, 255, 0.5)',
    '--amounts-panel-asset-amount-text': '#fff',
    '--amounts-panel-asset-worth-text': '#CCD0D9',
};
var CONTACTS = {
    '--contacts-odd-numbered-row': '#343B4A',
    '--contacts-group-header-background': '#20272F',
    '--contacts-group-header-text': '#8297A0',
    '--contacts-delete-contact-name': '#4CFFB3',
};
var SEND = {
    '--send-success-row-info': '#cccccc',
};
var QR_SCANNER = {
    '--qr-scan-paused': '#4CFFB3',
    '--qr-scan-animation-start': '#4CFFB3',
    '--qr-scan-animation-end': 'rgba(102, 237, 135, 0)',
};
var NEWS = {
    '--news-content-border-color': 'rgba(141, 152, 174, .5)',
};
export var DARK_NETWORK_CONFIG_TOOLTIP = {
    '--network-config-tooltip-label': '#8D98AE',
    '--network-config-tooltip-background': '#21242C',
    '--network-config-tooltip-color': '#fff',
};
export var NOTIFICATIONS = {
    '--notifications-error-icon-color': '#eb70ff',
    '--notifications-success-icon-color': '#4cffb3',
};
export var RELEASE_NOTES = {
    '--release-notes-date': '#8297a0',
    '--release-notes-text': '#8c97a2',
    '--release-notes-button-color': '#394152',
};
export var MOBILE = {
    '---mobile-export-card-background': '#37414b',
    '--mobile-header-instructions-icon': '#7E858D',
};
export default __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, NEWS), CONTACTS), AMOUNTS_PANEL), NODE_SELECT), MODAL), AUTH_STYLES), BASE), BUTTON), INPUT), PANEL), TAB), DASHBOARD), SIDEBAR), HEADER_BAR), TX_LIST), SETTINGS), SEND), QR_SCANNER), DARK_NETWORK_CONFIG_TOOLTIP), NOTIFICATIONS), RELEASE_NOTES), MOBILE);
