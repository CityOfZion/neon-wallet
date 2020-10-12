const BASE = {
  '--base-scrollbar-track': '#2E3542',
  '--base-scrollbar-thumb': '#5c677f',
  '--base-main-background': '#242933',
  '--base-text': '#fff',
  '--base-link-color': '#6bdaf6',
}

const BUTTON = {
  '--button-disabled': '#5C677F',
  '--button-primary-box-shadow': `-12px -12px 36px 0 rgba(70, 77, 83, 0.5),
    12px 12px 36px 0 rgba(18, 21, 23, 0.99),
    inset -1px -1px 0 0 rgba(0, 0, 0, 0.32),
    inset 1px 1px 0 0 rgba(214, 210, 210, 0.14)`,
  '--button-primary-disabled-background-image':
    'linear-gradient(180deg, #313e46 0%, #20292f 100%)',
  '--button-primary-disabled-text-color': '#4a5d59',
  '--button-primary-disabled-background-color': '#3D4D56',
  '--button-active': '#4CFFB3',
  '--button-active-text': '#242933',
  '--button-secondary-background': '#3B3B4F',
  '--button-primary-background': '#4CFFB3',
  '--button-primary-hover': '#4CFFB3',
  '--button-secondary-hover': '#3B3B4F',
  '--button-primary-text': '#242933',
  '--button-secondary-text': '#394152',
  '--button-icon-color': '#242933',
  '--button-active-hover': '#4CFFB3',
  '--secondary-button-icon-color': '#fff',
  '--button-priority-transfer-background': '#2E3542',
  '--button-priority-transfer-color': '#fff',
  '--button-priority-transfer-disabled': '#2E3542',
  '--button-max-amount-background': '#8D98AE',
  '--button-max-amount-text': '#394152',
  '--button-flag-icon-color': '#fff',
  '--button-flag-icon-opacity': 0.6,
}

const INPUT = {
  '--input-background': '#394152',
  '--input-error': '#ee6d66',
  '--input-error-text': '#fff',
  '--input-text': '#fff',
  '--input-label-opacity': 0.5,
  '--input-label': '#fff',
  '--input-select-hover': '#3B3B4F',
  '--input-active':
    'linear-gradient(#f2f2f2, #f2f2f2), radial-gradient(circle at top left, #4CFFB3, #6bdaf6)',
  '--input-icon': '#9ca0a9',
  '--input-placeholder': 'rgba(255, 255, 255, 0.5)',
}

const HEADER_BAR = {
  '--header-bar-default-icon-color': '#4CFFB3',
}

const TAB = {
  '--tab-text': '#394152',
  '--tab-border': '#394152',
}

const PANEL = {
  '--panel-icon': '#4CFFB3',
  '--panel-header': '#1B2029',
  '--panel-header-text': '#fff',
  '--panel-background': '#2E3542',
  '--panel-header-border': '#8d98ae',
  '--panel-label-text': '#8d98ae',
  '--panel-full-height-background': '#2E3542',
  '--panel-full-height-nav-background': '#292F3B',
  '--panel-full-height-instructions-text': 'rgba(255, 255, 255, 0.5)',
  '--panel-full-height-instructions-border': '#8D98AE',
  '--panel-full-height-header-icon-color': '#fff',
  '--panel-receive-explanation': '#394152',
}

const MODAL = {
  '--modal-overlay': 'rgba(248, 248, 248, 0.21)',
}

const AUTH_STYLES = {
  '--auth-main-container-background': '#2E3542',
  '--auth-secondary-button-background': '#2E3542',
  '--auth-scan-qr-border': '#5c677f',
}

const DASHBOARD = {
  '--dashboard-market-data-line': '#4CFFB3',
  '--dashboard-asset-panel-total-background': '#343B4A',
  '--dashboard-total-wallet-value-odd-row': '#343B4A',
  '--dashboard-total-wallet-value-total-text': '#fff',
  '--dashboard-asset-panel-asset-name': 'rgba(255, 255, 255, 0.9)',
  '--dashboard-token-balances-divider-line': '#343B4A',
  '--dashboard-price-history-current-price': '#fff',
}

const SIDEBAR = {
  '--sidebar-background': '#2A333B',
  '--side-bar-disabled-item-background': '#1B2029',
  '--sidebar-icon': '#9CA0A8',
  '--sidebar-active-border': '#4CFFB3',
  '--sidebar-active-background': '#1B2029',
  '--sidebar-active-icon': '#fff',
}

const TX_LIST = {
  '--tx-list-odd-row': '#343B4A',
  '--tx-list-button-icon': '#4CFFB3',
  '--tx-list-copy-icon': '#4CFFB3',
}

const SETTINGS = {
  '--settings-item-label': '#fff',
  '--settings-item-icon': 'rgba(255, 255, 255, 0.5)',
  '--settings-item-border-color': '#8D98AE',
  '--settings-link-text': '#4CFFB3',
  '--settings-select-value-text': '#4CFFB3',
  '--settings-donation-text': '#F2F2F2',
  '--settings-spacer': 'rgba(170, 178, 189, 0.3)',
}

const NODE_SELECT = {
  '--node-select-header-background': '#1B2029',
  '--node-select-icon-color': '#4CFFB3',
  '--node-select-automatic-select-button-text': '#FFFFFF',
  '--node-select-refresh-icon': '#4CFFB3',
  '--node-select-node-count': 'rgba(255, 255, 255, 0.5)',
}

const AMOUNTS_PANEL = {
  '--amounts-panel-first-row-background': '#1B2029',
  '--amounts-panel-second-row-background': '#12161E',
  '--amounts-panel-asset-name-text': 'rgba(255, 255, 255, 0.5)',
  '--amounts-panel-asset-amount-text': '#fff',
  '--amounts-panel-asset-worth-text': '#CCD0D9',
}

const CONTACTS = {
  '--contacts-odd-numbered-row': '#343B4A',
  '--contacts-group-header-background': '#20272F',
  '--contacts-group-header-text': '#8297A0',
}

const SEND = {
  '--send-success-row-info': '#cccccc',
}

const QR_SCANNER = {
  '--qr-scan-paused': '#4CFFB3',
  '--qr-scan-animation-start': '#4CFFB3',
  '--qr-scan-animation-end': 'rgba(102, 237, 135, 0)',
}

const NEWS = {
  '--news-content-border-color': 'rgba(141, 152, 174, .5)',
}

export const DARK_NETWORK_CONFIG_TOOLTIP = {
  '--network-config-tooltip-label': '#8D98AE',
  '--network-config-tooltip-background': '#1b2029',
  '--network-config-tooltip-color': '#fff',
}

export const NOTIFICATIONS = {
  '--notifications-error-icon-color': '#eb70ff',
  '--notifications-success-icon-color': '#4cffb3',
}

export default {
  ...NEWS,
  ...CONTACTS,
  ...AMOUNTS_PANEL,
  ...NODE_SELECT,
  ...MODAL,
  ...AUTH_STYLES,
  ...BASE,
  ...BUTTON,
  ...INPUT,
  ...PANEL,
  ...TAB,
  ...DASHBOARD,
  ...SIDEBAR,
  ...HEADER_BAR,
  ...TX_LIST,
  ...SETTINGS,
  ...SEND,
  ...QR_SCANNER,
  ...DARK_NETWORK_CONFIG_TOOLTIP,
  ...NOTIFICATIONS,
}
