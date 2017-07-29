const explorers = [
  {
    id: 'neotracker',
    name: 'NEO Tracker',
    main: 'https://neotracker.io',
    test: 'https://testnet.neotracker.io',
    getTransactionLink(net, txid) {
      const base = net === 'MainNet' ? this.main : this.test;
      return base + '/tx/' + txid;
    },
  },
  {
    id: 'antchain',
    name: 'Antchain',
    main: 'http://antcha.in',
    test: 'http://testnet.antcha.in',
    getTransactionLink(net, txid) {
      const base = net === 'MainNet' ? this.main : this.test;
      return base + '/tx/hash/' + txid;
    },
  },
];
const idToExplorer = {};
explorers.forEach(explorer => {
  idToExplorer[explorer.id] = explorer;
});

export const BLOCKCHAIN_EXPLORERS = idToExplorer;
