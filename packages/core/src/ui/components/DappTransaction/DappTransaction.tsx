/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import { ErrorPane } from '@lace/common';
import { Wallet } from '@lace/cardano';
import { DappInfo, DappInfoProps } from '../DappInfo';
import { DappTxHeader } from './DappTxHeader/DappTxHeader';
import { DappTxAsset, DappTxAssetProps } from './DappTxAsset/DappTxAsset';
import { DappTxOutput, DappTxOutputProps } from './DappTxOutput/DappTxOutput';
import styles from './DappTransaction.module.scss';
import { useTranslate } from '@src/ui/hooks';
import { TransactionFee } from '@ui/components/ActivityDetail';

type TransactionDetails = {
  fee: string;
  outputs: DappTxOutputProps[];
  type: 'Send' | 'Mint';
  mintedAssets?: DappTxAssetProps[];
  burnedAssets?: DappTxAssetProps[];
};

export interface DappTransactionProps {
  /** Transaction details such as type, amount, fee and address */
  transaction: TransactionDetails;
  /** dApp information such as logo, name and url */
  dappInfo: Omit<DappInfoProps, 'className'>;
  /** Optional error message */
  errorMessage?: string;
  fiatCurrencyCode?: string;
  fiatCurrencyPrice?: number;
  coinSymbol?: string;
}

export const DappTransaction = ({
  transaction: { type, outputs, fee, mintedAssets, burnedAssets },
  dappInfo,
  errorMessage,
  fiatCurrencyCode,
  fiatCurrencyPrice,
  coinSymbol
}: DappTransactionProps): React.ReactElement => {
  const { t } = useTranslate();
  return (
    <div>
      <DappInfo {...dappInfo} className={styles.dappInfo} />
      {errorMessage && <ErrorPane error={errorMessage} className={styles.error} />}
      <div data-testid="dapp-transaction-container" className={styles.details}>
        {type === 'Mint' && mintedAssets?.length > 0 && (
          <>
            <DappTxHeader
              title={t('package.core.dappTransaction.transaction')}
              subtitle={t('package.core.dappTransaction.mint')}
            />
            {mintedAssets.map((asset) => (
              <DappTxAsset key={asset.name} {...asset} />
            ))}
          </>
        )}
        {type === 'Mint' && burnedAssets?.length > 0 && (
          <>
            <DappTxHeader
              title={mintedAssets?.length > 0 ? undefined : t('package.core.dappTransaction.transaction')}
              subtitle={t('package.core.dappTransaction.burn')}
            />
            {burnedAssets.map((asset) => (
              <DappTxAsset key={asset.name} {...asset} />
            ))}
          </>
        )}
        {type === 'Send' && (
          <>
            <DappTxHeader
              title={t('package.core.dappTransaction.transaction')}
              subtitle={t('package.core.dappTransaction.send')}
            />
            {outputs.map((output) => (
              <DappTxOutput key={output.recipient} {...output} />
            ))}
          </>
        )}
        {fee && fee !== '-' && (
          <TransactionFee
            fee={fee}
            amountTransformer={(ada: string) =>
              `${Wallet.util.convertAdaToFiat({ ada, fiat: fiatCurrencyPrice })} ${fiatCurrencyCode}`
            }
            coinSymbol={coinSymbol}
          />
        )}
      </div>
    </div>
  );
};
