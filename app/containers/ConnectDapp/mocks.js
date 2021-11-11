export const REQUEST_MOCK = {
  id: 1636407714008317,
  topic: '0835376d2aebd559770cda0584c03601c7aafbd623f26524822ac6a3ebcea7c8',
  request: {
    method: 'invokefunction',
    params: [
      {
        scriptHash: '0xd2a4cff31913016155e38e474a2c06d08be276cf',
        operation: 'transfer',
        args: [
          {
            type: 'Address',
            value: 'NMkSudozST9kTkpNbyNB1EdU7KzfQoF3dY',
          },
          {
            type: 'ScriptHash',
            value: '0x010101c0775af568185025b0ce43cfaa9b990a2a',
          },
          {
            type: 'Integer',
            value: 100000000,
          },
          {
            type: 'Array',
            value: [
              {
                type: 'String',
                value: 'createStream',
              },
              {
                type: 'Address',
                value: 'NMkSudozST9kTkpNbyNB1EdU7KzfQoF3dY',
              },
              {
                type: 'Integer',
                value: 1637185260000,
              },
              {
                type: 'Integer',
                value: 1637196060000,
              },
            ],
          },
        ],
      },
    ],
  },
  chainId: 'neo3:mainnet',
}

export const PROPOSAL_MOCK = {
  relay: {
    protocol: 'waku',
  },
  topic: 'dedcb1834048ce11b88c5582d624a2385f81d090c1e821d30490f97639d4c76d',
  proposer: {
    publicKey:
      'f1a0997f891e1c48f3ff578bd69c2b85d0e5a1ac1f0ea8b9dc30426c7473342c',
    controller: false,
    metadata: {
      name: 'Crypsydra',
      description: 'WalletConnect integration Prototype',
      url: 'https://crypsydra.vercel.app/',
      icons: [
        'https://raw.githubusercontent.com/CityOfZion/visual-identity/develop/_CoZ%20Branding/_Logo/_Logo%20icon/_PNG%20200x178px/CoZ_Icon_DARKBLUE_200x178px.png',
      ],
    },
  },
  signal: {
    method: 'pairing',
    params: {
      topic: '9ed69162519da40f0e9c32a136e8e1f3c541862504e5e12806e2619fcc7977d8',
    },
  },
  permissions: {
    blockchain: {
      chains: ['neo3:testnet'],
    },
    jsonrpc: {
      methods: ['invokefunction'],
    },
    notifications: {
      types: [],
    },
  },
  ttl: 604800,
}

export const TX_STATE_TYPE_MAPPINGS = {
  Any: {
    color: 'rgba(149,149,149,0.7)',
  },
  Signature: {
    color: 'rgba(233,38,92,0.7)',
  },
  Boolean: {
    color: 'rgba(211,85,231,0.7)',
  },
  Integer: {
    color: 'rgba(177,103,242,0.7)',
  },
  Hash160: {
    color: 'rgba(0,133,41,0.7)',
  },
  Address: {
    color: 'rgba(0,133,41,0.7)',
  },
  Null: {
    color: 'rgba(255,255,255,0.7)',
  },
  Hash256: {
    color: 'rgba(29,181,255,0.7)',
  },
  ByteArray: {
    color: 'rgba(13,205,255,0.7)',
  },
  PublicKey: {
    color: 'rgba(0,214,157,0.7)',
  },
  String: {
    color: 'rgba(103,221,139,0.7)',
  },
  ByteString: {
    color: 'rgba(103,221,139,0.7)',
  },
  Array: {
    color: 'rgba(242,143,0,0.7)',
  },
  Buffer: {
    color: 'rgba(242,143,0,0.7)',
  },
  InteropInterface: {
    color: 'rgba(165,0,0,0.7)',
  },
  Void: {
    color: 'rgba(82,141,147,0.7)',
  },
}
