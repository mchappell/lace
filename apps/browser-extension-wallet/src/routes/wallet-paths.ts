export const walletRoutePaths = {
  activity: '/activity',
  addressBook: '/address-book',
  coinActivity: '/coin/:id/:symbol/:name',
  confirmDelegation: '/delegate/confirm',
  delegate: '/delegate',
  earn: '/earn',
  nftDetail: '/nft/:id',
  nfts: '/nfts',
  assets: '/assets',
  passphraseInterval: '/settings/passphrase-interval',
  receive: '/receive',
  send: '/send/:id',
  settings: '/settings',
  staking: '/staking',
  dapps: '/dapps',
  voting: '/voting',
  setup: {
    home: '/setup',
    create: '/setup/create',
    hardware: '/setup/hardware',
    restore: '/setup/restore'
  },
  newWallet: {
    home: '/new-wallet',
    create: '/new-wallet/create',
    hardware: '/new-wallet/hardware',
    restore: '/new-wallet/restore'
  }
};

export const dAppRoutePaths = {
  dappConfirmTransaction: '/dapp/transaction',
  dappConnect: '/dapp/connect',
  dappTxSignFailure: '/dapp/transaction/failure',
  dappTxSignSuccess: '/dapp/transaction/success',
  dappSignTx: '/dapp/sign-tx',
  dappSubmitTx: '/dapp/submit-tx',
  dappSignData: '/dapp/sign-data',
  dappNoWallet: '/dapp/no-wallet',
  dappSetCollateral: '/dapp/set-collateral'
};
