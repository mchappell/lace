/* eslint-disable no-undef */
import { ChainablePromiseElement } from 'webdriverio';
import CommonDappPageElements from './commonDappPageElements';

class ConfirmTransactionPage extends CommonDappPageElements {
  private TRANSACTION_TYPE_TITLE = '[data-testid="dapp-transaction-title"]';
  private TRANSACTION_TYPE = '[data-testid="dapp-transaction-type"]';
  private TRANSACTION_AMOUNT_TITLE = '[data-testid="dapp-transaction-amount-title"]';
  private TRANSACTION_AMOUNT_VALUE = '[data-testid="dapp-transaction-amount-value"]';
  private TRANSACTION_AMOUNT_FEE_TITLE = '[data-testid="tx-fee-title"]';
  private TRANSACTION_AMOUNT_FEE_TITLE_TOOLTIP_ICON = '[data-testid="tx-fee-tooltip-icon"]';
  private TRANSACTION_AMOUNT_FEE_VALUE_ADA = '[data-testid="tx-fee-ada"]';
  private TRANSACTION_AMOUNT_FEE_VALUE_FIAT = '[data-testid="tx-fee-fiat"]';
  private TRANSACTION_AMOUNT_ASSET = '[data-testid="dapp-transaction-asset"]';
  private TRANSACTION_RECIPIENT_TITLE = '[data-testid="dapp-transaction-recipient-title"]';
  private TRANSACTION_RECIPIENT_ADDRESS = '[data-testid="dapp-transaction-recipient-address"]';
  private CONFIRM_BUTTON = '[data-testid="dapp-transaction-confirm"]';
  private CANCEL_BUTTON = '[data-testid="dapp-transaction-cancel"]';

  get transactionTypeTitle(): ChainablePromiseElement<WebdriverIO.Element> {
    return $(this.TRANSACTION_TYPE_TITLE);
  }

  get transactionType(): ChainablePromiseElement<WebdriverIO.Element> {
    return $(this.TRANSACTION_TYPE);
  }

  get transactionAmountTitle(): ChainablePromiseElement<WebdriverIO.Element> {
    return $(this.TRANSACTION_AMOUNT_TITLE);
  }

  get transactionAmountValue(): ChainablePromiseElement<WebdriverIO.Element> {
    return $(this.TRANSACTION_AMOUNT_VALUE);
  }
  get transactionFeeTitle(): ChainablePromiseElement<WebdriverIO.Element> {
    return $(this.TRANSACTION_AMOUNT_FEE_TITLE);
  }

  get transactionFeeTooltipIcon(): ChainablePromiseElement<WebdriverIO.Element> {
    return $(this.TRANSACTION_AMOUNT_FEE_TITLE_TOOLTIP_ICON);
  }

  get transactionFeeValueAda(): ChainablePromiseElement<WebdriverIO.Element> {
    return $(this.TRANSACTION_AMOUNT_FEE_VALUE_ADA);
  }

  get transactionFeeValueFiat(): ChainablePromiseElement<WebdriverIO.Element> {
    return $(this.TRANSACTION_AMOUNT_FEE_VALUE_FIAT);
  }

  get transactionAmountAsset(): ChainablePromiseElement<WebdriverIO.Element> {
    return $(this.TRANSACTION_AMOUNT_ASSET);
  }

  get transactionRecipientTitle(): ChainablePromiseElement<WebdriverIO.Element> {
    return $(this.TRANSACTION_RECIPIENT_TITLE);
  }

  get transactionRecipientAddress(): ChainablePromiseElement<WebdriverIO.Element> {
    return $(this.TRANSACTION_RECIPIENT_ADDRESS);
  }

  get confirmButton(): ChainablePromiseElement<WebdriverIO.Element> {
    return $(this.CONFIRM_BUTTON);
  }

  get cancelButton(): ChainablePromiseElement<WebdriverIO.Element> {
    return $(this.CANCEL_BUTTON);
  }
}

export default new ConfirmTransactionPage();
