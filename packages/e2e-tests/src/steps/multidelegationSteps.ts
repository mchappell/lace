import { Given, Then, When } from '@cucumber/cucumber';
import MultiDelegationBetaModal from '../elements/multidelegation/MultiDelegationBetaModal';
import MultidelegationPageAssert from '../assert/multidelegation/MultidelegationPageAssert';
import MultidelegationPage from '../elements/multidelegation/MultidelegationPage';
import { parseSearchTerm } from '../utils/multiDelegationUtils';
import testContext from '../utils/testContext';
import { getStakePoolById, getStakePoolByName } from '../data/expectedStakePoolsData';
import extensionUtils from '../utils/utils';
import stakePoolDetailsAssert from '../assert/multidelegation/StakePoolDetailsAssert';
import StakePoolDetailsDrawer from '../elements/multidelegation/StakePoolDetailsDrawer';
import ChangingStakingPreferencesModal from '../elements/multidelegation/ChangingStakingPreferencesModal';
import ManageStakingDrawer from '../elements/multidelegation/ManageStakingDrawer';
import StakingConfirmationDrawer from '../elements/multidelegation/StakingConfirmationDrawer';
import { getTestWallet, TestWalletName, WalletConfig } from '../support/walletConfiguration';
import StakingPasswordDrawer from '../elements/multidelegation/StakingPasswordDrawer';
import StakingSuccessDrawerAssert from '../assert/multidelegation/StakingSuccessDrawerAssert';
import StakingSuccessDrawer from '../elements/multidelegation/StakingSuccessDrawer';
import transactionDetailsAssert from '../assert/transactionDetailsAssert';
import StakingPasswordDrawerAssert from '../assert/multidelegation/StakingPasswordDrawerAssert';
import StakingConfirmationDrawerAssert from '../assert/multidelegation/StakingConfirmationDrawerAssert';
import StakingManageDrawerAssert from '../assert/multidelegation/StakingManageDrawerAssert';
import { StakingInfoComponent } from '../elements/staking/stakingInfoComponent';
import StartStakingPageAssert from '../assert/multidelegation/StartStakingPageAssert';
import TokensPageObject from '../pageobject/tokensPageObject';
import localStorageInitializer from '../fixture/localStorageInitializer';
import mainMenuPageObject from '../pageobject/mainMenuPageObject';
import StartStakingPage from '../elements/multidelegation/StartStakingPage';

Given(/^I click (Overview|Browse pools) tab$/, async (tabToClick: 'Overview' | 'Browse pools') => {
  await MultidelegationPage.clickOnTab(tabToClick);
});

When(/^I close Multi-delegation beta modal$/, async () => {
  await MultiDelegationBetaModal.clickGoItButton();
});

Then(/^I wait until delegation info card shows staking to "(\d+)" pool\(s\)$/, async (poolsCount: number) => {
  await MultidelegationPageAssert.assertSeeStakingOnPoolsCounter(poolsCount);
});

When(/^I wait until "([^"]*)" pool is on "Your pools" list$/, async (poolName: string) => {
  poolName = poolName === 'OtherStakePool' ? testContext.load('currentStakePoolName') : poolName;
  await MultidelegationPageAssert.assertSeeStakingPoolOnYourPoolsList(poolName);
});

Then(
  /^I pick "(\d+)" pools for delegation from browse pools view: "([^"]*)"$/,
  async (_ignored: number, poolsToStake: string) => {
    await MultidelegationPage.markPoolsForDelegation(poolsToStake);
  }
);

Then(/^I click "Next" button on staking (portfolio bar|manage staking|confirmation)$/, async (section: string) => {
  await MultidelegationPage.clickNextButtonOnDrawerSection(section);
});

Then(/^I see Delegation card displaying correct data$/, async () => {
  await MultidelegationPageAssert.assertSeeDelegationCardDetailsInfo();
});

Then(/^I see Delegation title displayed for multidelegation$/, async () => {
  await MultidelegationPageAssert.assertSeeTitle();
});

Then(/^I see Delegation pool cards are displayed for popup view$/, async () => {
  await MultidelegationPageAssert.assertSeeDelegatedPoolCardsPopup();
});

When(/^I save identifiers of stake pools currently in use$/, async () => {
  await MultidelegationPage.saveIDsOfStakePoolsInUse();
});

When(/^I input "([^"]*)" into stake pool search bar$/, async (term: string) => {
  const searchTerm = await parseSearchTerm(term);
  await MultidelegationPage.fillSearch(searchTerm);
  await MultidelegationPage.searchLoader.waitForDisplayed({ reverse: true, timeout: 10_000 });
});

When(/^I click on the stake pool with name "([^"]*)"$/, async (poolName: string) => {
  poolName = poolName === 'OtherStakePool' ? testContext.load('currentStakePoolName') : poolName;
  await MultidelegationPage.clickOnStakePoolWithName(poolName);
});

Then(/^I see stake pool details drawer for "([^"]*)" stake pool$/, async (stakePoolName: string) => {
  let stakePool;
  if (stakePoolName === 'OtherStakePool') {
    stakePool = getStakePoolByName(testContext.load('currentStakePoolName'));
  } else {
    const network = extensionUtils.isMainnet() ? 'mainnet' : 'testnet';
    stakePool = getStakePoolByName(stakePoolName, network);
  }
  await stakePoolDetailsAssert.assertSeeStakePoolDetailsPage(stakePool, false);
});

Then(/^I see stake pool details drawer for stake pool without metadata$/, async () => {
  const stakePool = getStakePoolById(testContext.load('currentStakePoolId'));
  await stakePoolDetailsAssert.assertSeeStakePoolDetailsPage(stakePool, false, true);
});

When(
  /^I click on "(Stake all on this pool|Select pool for multi-staking)" button on stake pool details drawer$/,
  async (button: 'Stake all on this pool' | 'Select pool for multi-staking') => {
    switch (button) {
      case 'Select pool for multi-staking':
        await StakePoolDetailsDrawer.selectPoolForMultiStakingButton.waitForClickable();
        await StakePoolDetailsDrawer.selectPoolForMultiStakingButton.click();
        break;
      case 'Stake all on this pool':
        await StakePoolDetailsDrawer.stakeAllOnThisPoolButton.waitForClickable();
        await StakePoolDetailsDrawer.stakeAllOnThisPoolButton.click();
        break;
      default:
        throw new Error(`Unsupported button name: ${button}`);
    }
  }
);

When(
  /^I click "(Cancel|Fine by me)" button on "Changing staking preferences\?" modal$/,
  async (button: 'Cancel' | 'Fine by me') => {
    switch (button) {
      case 'Cancel':
        await ChangingStakingPreferencesModal.cancelButton.waitForClickable();
        await ChangingStakingPreferencesModal.cancelButton.click();
        break;
      case 'Fine by me':
        await ChangingStakingPreferencesModal.fineByMeButton.waitForClickable();
        await ChangingStakingPreferencesModal.fineByMeButton.click();
        break;
      default:
        throw new Error(`Unsupported button name: ${button}`);
    }
  }
);

When(/^I click on "Next" button on staking preferences drawer$/, async () => {
  await ManageStakingDrawer.nextButton.waitForClickable();
  await ManageStakingDrawer.nextButton.click();
});

When(/^I click on "Next" button on staking confirmation drawer$/, async () => {
  await StakingConfirmationDrawer.nextButton.waitForClickable();
  await StakingConfirmationDrawer.nextButton.click();
});

When(
  /^I enter (correct|incorrect|newly created) wallet password and confirm staking$/,
  async (type: 'correct' | 'incorrect' | 'newly created') => {
    let password;
    switch (type) {
      case 'newly created':
        password = String((testContext.load('newCreatedWallet') as WalletConfig).password);
        break;
      case 'incorrect':
        password = 'somePassword';
        break;
      case 'correct':
      default:
        password = String(getTestWallet(TestWalletName.TestAutomationWallet).password);
    }
    await StakingPasswordDrawer.fillPassword(password);
    await StakingPasswordDrawer.confirmStaking();
  }
);

Then(/^(Initial|Switching) staking success drawer is displayed$/, async (process: 'Initial' | 'Switching') => {
  await StakingSuccessDrawerAssert.assertSeeStakingSuccessDrawer(process);
});

Then(/^I click "Close" button on staking success drawer$/, async () => {
  await StakingSuccessDrawer.clickCloseButton();
});

Then(
  /^the transaction details are displayed for staking (with|without) metadata$/,
  async (metadata: 'with' | 'without') => {
    const expectedActivityDetails =
      metadata === 'with'
        ? {
            transactionDescription: 'Delegation\n1 token',
            status: 'Success',
            poolName: String(testContext.load('poolName')),
            poolTicker: String(testContext.load('poolTicker')),
            poolID: String(testContext.load('poolID'))
          }
        : {
            transactionDescription: 'Delegation\n1 token',
            status: 'Success',
            poolID: String(testContext.load('poolID'))
          };

    await transactionDetailsAssert.assertSeeActivityDetails(expectedActivityDetails);
  }
);

When(/^I save stake pool details$/, async () => {
  await StakePoolDetailsDrawer.saveStakePoolDetails();
});

Then(/^I see the Network Info component with the expected content$/, async () => {
  await MultidelegationPageAssert.assertNetworkContainerExistsWithContent();
});

Then(/^I see the stake pool search control with appropriate content$/, async () => {
  await MultidelegationPageAssert.assertSeeSearchComponent();
});

Then(
  /^there are (\d+) stake pools returned for "([^"]*)" search term$/,
  async (resultsCount: number, searchTerm: string) => {
    await MultidelegationPageAssert.assertSeeSearchResults(resultsCount, searchTerm);
  }
);

Then(
  /^\(if applicable\) first stake pool search result has "([^"]*)" name and "([^"]*)" ticker$/,
  async (expectedName: string, expectedTicker: string) => {
    if ((await MultidelegationPage.poolsItems.length) > 0) {
      await MultidelegationPageAssert.assertSeeFirstSearchResultWithNameAndTicker(expectedName, expectedTicker);
    }
  }
);

When(/^I hover over "(ROS|Saturation)" column name in stake pool list$/, async (columnName: 'ROS' | 'Saturation') => {
  await MultidelegationPage.hoverOverColumnWithName(columnName);
});

Then(/^tooltip for "(ROS|Saturation)" column is displayed$/, async (columnName: 'ROS' | 'Saturation') => {
  await MultidelegationPageAssert.assertSeeTooltipForColumn(columnName);
});

Then(/^staking password drawer is displayed$/, async () => {
  await StakingPasswordDrawerAssert.assertSeeStakingPasswordDrawer();
});

Then(/^Stake pool details drawer is not opened$/, async () => {
  await stakePoolDetailsAssert.assertStakePoolDetailsDrawerIsNotOpened();
});

When(/^I'm on a delegation flow "([^"]*)"$/, async (delegationStep: string) => {
  const password = String(getTestWallet(TestWalletName.TestAutomationWallet).password);
  const manageStaking = 'manage staking';

  switch (delegationStep) {
    case 'success':
      await MultidelegationPage.clickNextButtonOnDrawerSection(manageStaking);
      await MultidelegationPage.clickNextButtonOnDrawerSection('confirmation');
      await StakingPasswordDrawer.fillPassword(password);
      await StakingPasswordDrawer.confirmStaking();
      await StakingSuccessDrawerAssert.assertSeeStakingSuccessDrawer('Switching');
      break;
    case 'password':
      await MultidelegationPage.clickNextButtonOnDrawerSection(manageStaking);
      await MultidelegationPage.clickNextButtonOnDrawerSection('confirmation');
      await StakingPasswordDrawerAssert.assertSeeStakingPasswordDrawer();
      break;
    case 'confirmation':
      await MultidelegationPage.clickNextButtonOnDrawerSection(manageStaking);
      await StakingConfirmationDrawerAssert.assertSeeStakingConfirmationDrawer();
      break;
    case 'manage':
      await StakingManageDrawerAssert.assertSeeStakingManageDrawer();
      break;
  }
});

When(
  /^I hover over (last reward|total staked|total rewards) in currently staking component$/,
  async (elementToHover: string) => {
    switch (elementToHover) {
      case 'last reward':
        await new StakingInfoComponent().hoverOverLastRewardValue();
        break;
      case 'total staked':
        await new StakingInfoComponent().hoverOverTotalStakedValue();
        break;
      case 'total rewards':
        await new StakingInfoComponent().hoverOverTotalRewardsValue();
        break;
      default:
        throw new Error(`Unsupported element: ${elementToHover}`);
    }
  }
);

Then(/^I see tooltip for element in currently staking component$/, async () => {
  await MultidelegationPageAssert.assertSeeCurrentlyStakingTooltip();
});

Then(/^I see Start Staking page in (extended|popup) mode$/, async (mode: 'extended' | 'popup') => {
  const cardanoBalance = String(await TokensPageObject.loadTokenBalance('Cardano'));
  await StartStakingPageAssert.assertSeeStartStakingPage(cardanoBalance, mode);
});

Given(/^I am on Start Staking page in (extended|popup) mode$/, async (mode: 'extended' | 'popup') => {
  await TokensPageObject.waitUntilCardanoTokenLoaded();
  await TokensPageObject.saveTokenBalance('Cardano');
  await localStorageInitializer.disableShowingMultidelegationBetaBanner();
  await localStorageInitializer.disableShowingMultidelegationPersistenceBanner();
  await mainMenuPageObject.navigateToSection('Staking', mode);
  const cardanoBalance = String(await TokensPageObject.loadTokenBalance('Cardano'));
  await StartStakingPageAssert.assertSeeStartStakingPage(cardanoBalance, mode);
});

Then(/^I click "Get Started" step ([12]) link$/, async (linkNumber: '1' | '2') => {
  await (linkNumber === '1'
    ? StartStakingPage.clickGetStartedStep1Link()
    : StartStakingPage.clickGetStartedStep2Link());
});

Given(/^I click "Expand view" on Start Staking page$/, async () => {
  await StartStakingPage.clickExpandedViewBannerButton();
});

When(/^I wait for stake pool list to be populated$/, async () => {
  await MultidelegationPage.waitForStakePoolListToLoad();
});

Then(/^Each stake pool list item contains: logo, name, ticker, ROS and saturation$/, async () => {
  await MultidelegationPageAssert.assertSeeStakePoolRows();
});
