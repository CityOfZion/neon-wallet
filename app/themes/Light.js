const BASE = {
  '--base-main-background': '#e6e6e6',
  '--base-text': '#394152',
  '--base-link-color': '#3063c9'
}

const BUTTON = {
  '--button-disabled': '#d6d9e0',
  '--button-active': 'linear-gradient(-216deg, #66ed87 0%, #6ad8ff 100%)',
  '--button-secondary-background': '#fff',
  '--button-primary-background':
    'linear-gradient(-216deg, #66ed87 0%, #6ad8ff 100%)',
  '--button-primary-hover': '#66edcd',
  '--button-secondary-hover': '#f2f2f2',
  '--button-primary-text': '#394152',
  '--button-secondary-text': '#394152',
  '--button-icon-color': '#394152',
  '--button-active-hover': '#66edcd',
  '--secondary-button-icon-color': '#394152',
  '--button-priority-transfer-background': '#fff',
  '--button-priority-transfer-color': '#394152',
  '--button-priority-transfer-disabled': '#fff',
  '--button-max-amount-background': '#e6e6e6',
  '--button-max-amount-text': '#8f939b'
}

const INPUT = {
  '--input-background': '#f2f2f2',
  '--input-error': '#ee6d66',
  '--input-error-text': '#fff',
  '--input-text': '#282828',
  '--input-label': '#5c677f',
  '--input-label-opacity': 0.5,
  '--input-select-hover': '#e6e6e6',
  '--input-active':
    'linear-gradient(#f2f2f2, #f2f2f2), radial-gradient(circle at top left, #66eb8e, #6bdaf6)',
  '--input-icon': '#9ca0a9',
  '--input-placeholder': 'rgba(40, 40, 40, 0.5)'
}

const HEADER_BAR = {
  '--header-bar-default-icon-color': '#394152'
}

const TAB = {
  '--tab-text': '#394152',
  '--tab-border': '#394152'
}

const PANEL = {
  '--panel-icon': '#69e27e',
  '--panel-header': '#f2f2f2',
  '--panel-header-text': '#394152',
  '--panel-background': '#fff',
  '--panel-header-border': '#8d98ae',
  '--panel-label-text': '#8d98ae',
  '--panel-full-height-background': '#fff',
  '--panel-full-height-nav-background': '#f2f2f2',
  '--panel-full-height-instructions-text': '#5c677f',
  '--panel-full-height-instructions-border': 'rgba(0, 0, 0, 0.15)',
  '--panel-full-height-header-icon-color': '#394152',
  '--panel-receive-explanation': 'rgba(242, 242, 242, .5)'
}

const MODAL = {
  '--modal-overlay': 'rgba(26, 54, 80, 0.25)'
}

const AUTH_STYLES = {
  '--auth-main-container-background': '#fff',
  '--auth-scan-qr-border': '#f2f2f2'
}

const DASHBOARD = {
  '--dashboard-market-data-line': '#3fd0ae',
  '--dashboard-asset-panel-total-background': 'rgba(230, 230, 230, 0.28)',
  '--dashboard-total-wallet-value-odd-row': '#f8f8f8',
  '--dashboard-total-wallet-value-total-text': '#394152',
  '--dashboard-asset-panel-asset-name': '#5c677f',
  '--dashboard-token-balances-divider-line': '#f2f2f2',
  '--dashboard-price-history-current-price': '#394152'
}

const SIDEBAR = {
  '--sidebar-background': '#fff',
  '--side-bar-disabled-item-background': '#fff',
  '--sidebar-icon': '#9599a2',
  '--sidebar-active-border': '#66edcd',
  '--sidebar-active-background': '#f2f2f2',
  '--sidebar-active-icon': '#394152'
}

const TX_HISTORY = {
  '--tx-history-odd-row': '#f2f2f2',
  '--tx-history-button-icon': '#394152',
  '--tx-history-copy-icon': '#9599a2'
}

const SETTINGS = {
  '--settings-item-label': '#343b4a',
  '--settings-item-icon': '#cccccc',
  '--settings-item-border-color': '#f2f2f2',
  '--settings-link-text': '#69e27e',
  '--settings-select-value-text': '#69e27e',
  '--settings-donation-text': '#5c677f',
  '--settings-spacer': 'rgba(170, 178, 189, 0.3)'
}

const NODE_SELECT = {
  '--node-select-header-background': '#f2f2f2',
  '--node-select-icon-color': '#69e27e',
  '--node-select-automatic-select-button-text': '#5c677f',
  '--node-select-refresh-icon': '#394152',
  '--node-select-node-count': '#5c677f'
}

const AMOUNTS_PANEL = {
  '--amounts-panel-first-row-background': '#f2f2f2',
  '--amounts-panel-second-row-background': '#fff',
  '--amounts-panel-asset-name-text': '#515151',
  '--amounts-panel-asset-amount-text': '#515151',
  '--amounts-panel-asset-worth-text': '#515151'
}

const CONTACTS = {
  '--contacts-odd-numbered-row': 'rgba(230, 230, 230, 0.1)',
  '--contacts-group-header-background': '#f6f7f8',
  '--contacts-group-header-text': '#394152'
}

const SEND = {
  '--send-success-row-info': '#394152'
}

export default {
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
  ...TX_HISTORY,
  ...SETTINGS,
  ...HEADER_BAR,
  ...CONTACTS,
  ...SEND
}
