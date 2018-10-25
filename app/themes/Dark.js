const BASE = {
  '--base-main-background': '#242933',
  '--base-text': '#fff',
  '--base-link-color': '#6bdaf6'
}

const BUTTON = {
  '--button-disabled': '#5C677F',
  '--button-active': '#66ED87',
  '--button-secondary-background': '#3B3B4F',
  '--button-primary-background': '#66ED87',
  '--button-primary-hover': '#69E27E',
  '--button-secondary-hover': '#3B3B4F',
  '--button-primary-text': '#242933',
  '--button-secondary-text': '#394152',
  '--button-icon-color': '#242933',
  '--button-active-hover': '#69E27E',
  '--secondary-button-icon-color': '#fff',
  '--button-priority-transfer-background': '#2E3542',
  '--button-priority-transfer-color': '#fff',
  '--button-priority-transfer-disabled': '#2E3542',
  '--button-max-amount-background': '#8D98AE',
  '--button-max-amount-text': '#394152'
}

const INPUT = {
  '--input-background': '#394152',
  '--input-error': '#ee6d66',
  '--input-error-text': '#fff',
  '--input-text': '#fff',
  '--input-label-opacity': 1,
  '--input-label': '#fff',
  '--input-select-hover': '#3B3B4F',
  '--input-active':
    'linear-gradient(#f2f2f2, #f2f2f2), radial-gradient(circle at top left, #66eb8e, #6bdaf6)',
  '--input-icon': '#9ca0a9',
  '--input-placeholder': 'rgba(255, 255, 255, 0.5)'
}

const HEADER_BAR = {
  '--header-bar-default-icon-color': '#66ED87'
}

const TAB = {
  '--tab-text': '#394152',
  '--tab-border': '#394152'
}

const PANEL = {
  '--panel-icon': '#69e27e',
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
  '--panel-receive-explanation': '#394152'
}

const MODAL = {
  '--modal-overlay': 'rgba(248, 248, 248, 0.21)'
}

const AUTH_STYLES = {
  '--auth-main-container-background': '#2E3542',
  '--auth-secondary-button-background': '#2E3542',
  '--auth-scan-qr-border': '#5c677f'
}

const DASHBOARD = {
  '--dashboard-market-data-line': '#66ED87',
  '--dashboard-asset-panel-total-background': '#343B4A',
  '--dashboard-total-wallet-value-odd-row': '#343B4A',
  '--dashboard-total-wallet-value-total-text': '#fff',
  '--dashboard-asset-panel-asset-name': 'rgba(255, 255, 255, 0.5)',
  '--dashboard-token-balances-divider-line': '#343B4A',
  '--dashboard-price-history-current-price': '#fff'
}

const SIDEBAR = {
  '--sidebar-background': '#1B2029',
  '--side-bar-disabled-item-background': '#1B2029',
  '--sidebar-icon': '#9CA0A8',
  '--sidebar-active-border': '#66ED87',
  '--sidebar-active-background': '#1B2029',
  '--sidebar-active-icon': '#fff'
}

const TX_HISTORY = {
  '--tx-history-odd-row': '#343B4A',
  '--tx-history-button-icon': '#66ED87',
  '--tx-history-copy-icon': '#66ED87'
}

const SETTINGS = {
  '--settings-item-label': '#fff',
  '--settings-item-icon': 'rgba(255, 255, 255, 0.5)',
  '--settings-item-border-color': '#8D98AE',
  '--settings-link-text': '#66ED87',
  '--settings-select-value-text': '#66ED87',
  '--settings-donation-text': '#F2F2F2',
  '--settings-spacer': 'rgba(170, 178, 189, 0.3)'
}

const NODE_SELECT = {
  '--node-select-header-background': '#1B2029',
  '--node-select-icon-color': '#66ED87',
  '--node-select-automatic-select-button-text': '#FFFFFF',
  '--node-select-refresh-icon': '#66ED87',
  '--node-select-node-count': 'rgba(255, 255, 255, 0.5)'
}

const AMOUNTS_PANEL = {
  '--amounts-panel-first-row-background': '#1B2029',
  '--amounts-panel-second-row-background': '#12161E',
  '--amounts-panel-asset-name-text': 'rgba(255, 255, 255, 0.5)',
  '--amounts-panel-asset-amount-text': '#fff',
  '--amounts-panel-asset-worth-text': '#CCD0D9'
}

const CONTACTS = {
  '--contacts-odd-numbered-row': '#343B4A',
  '--contacts-group-header-background': '#AAB2BD',
  '--contacts-group-header-text': '#171B24'
}

const SEND = {
  '--send-success-row-info': '#cccccc'
}

export default {
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
  ...TX_HISTORY,
  ...SETTINGS,
  ...SEND
}
