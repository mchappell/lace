@DAppConnector
Feature: DAppConnector - Common

  Background:
    Given Wallet is synced
    And I de-authorize all DApps in extended mode
    And I reclaim collateral (if active) in extended mode

  @LW-3760 @Testnet @Mainnet
  Scenario: Extended View - Limited wallet information when wallet is not connected
    When I open test DApp
    Then I see Lace wallet info in DApp when not connected

  @LW-6660 @Testnet @Mainnet
  Scenario: DApp connection modal displayed after clicking "Authorize"
    When I open test DApp
    Then I see DApp authorization window
    When I click "Authorize" button in DApp authorization window
    Then I see DApp connection modal

  @LW-3756 @Testnet @Mainnet
  Scenario: Canceling DApp connection
    When I open test DApp
    Then I see DApp authorization window
    When I click "Cancel" button in DApp authorization window
    Then I don't see DApp window
    And I see Lace wallet info in DApp when not connected
    And I switch to window with Lace
    And I close all remaining tabs except current one
    When I open test DApp
    Then I see DApp authorization window

  @LW-4062 @LW-3753 @Testnet @Mainnet
  Scenario: Authorize app functions as expected when the user chooses 'Only once'
    Given I am on Tokens extended page
    And I save token: "Cardano" balance
    When I open test DApp
    And I see DApp authorization window
    And I click "Authorize" button in DApp authorization window
    And I click "Only once" button in DApp authorization window
    Then I see Lace wallet info in DApp when connected
    And I switch to window with Lace
    And I close all remaining tabs except current one
    When I open test DApp
    Then I see DApp authorization window

  @LW-3754 @LW-4064 @LW-3753 @Smoke @Testnet @Mainnet
  Scenario: Authorize app functions as expected when the user chooses 'Always'
    When I open test DApp
    And I see DApp authorization window
    And I click "Authorize" button in DApp authorization window
    And I click "Always" button in DApp authorization window
    And I switch to window with Lace
    And I am on Tokens extended page
    And I save token: "Cardano" balance
    And I close all remaining tabs except current one
    And I open test DApp
    Then I see Lace wallet info in DApp when connected
    And I don't see DApp window

  @LW-3807 @Testnet @Mainnet
  Scenario: "No wallet" modal displayed after trying to connect Dapp when there is no wallet
    Given I remove wallet
    And "Get started" page is displayed
    When I open test DApp
    Then I see DApp no wallet page
    When I click "Create or restore a wallet" button in DApp no wallet modal
    And I switch to window with Lace
    Then "Get started" page is displayed

  @LW-3758 @Testnet @Mainnet
  Scenario: Unlock Dapp page is displayed when wallet is locked, wallet can be unlocked
    Given I lock my wallet
    When I open test DApp
    Then I see DApp unlock page
    When I fill password input with correct password
    And I click "Unlock" button on unlock screen
    Then I see DApp authorization window

  @LW-7082 @Testnet @Mainnet
  Scenario: "Forgot password" click and cancel on DApp wallet unlock page
    Given I lock my wallet
    When I open test DApp
    Then I see DApp unlock page
    When I click on "Forgot password?" button on unlock screen
    Then I see "Forgot password?" modal
    And I click on "Cancel" button on "Forgot password?" modal
    Then I see DApp unlock page

  @LW-7083 @Testnet @Mainnet
  Scenario: "Forgot password" click and proceed on DApp wallet unlock page
    Given I lock my wallet
    When I open test DApp
    Then I see DApp unlock page
    When I click on "Forgot password?" button on unlock screen
    Then I see "Forgot password?" modal
    And I click on "Proceed" button on "Forgot password?" modal
    Then I see DApp no wallet page
    When I switch to tab with restore wallet process
    Then "Wallet password" page is displayed in forgot password flow

  @LW-7083 @Testnet @Mainnet
  Scenario: "Forgot password" click and proceed on DApp wallet unlock page
    Given I lock my wallet
    When I open test DApp
    Then I see DApp unlock page
    When I click on "Forgot password?" button on unlock screen
    Then I see "Forgot password?" modal
    And I click on "Proceed" button on "Forgot password?" modal
    Then I see DApp no wallet page
    When I switch to tab with restore wallet process
    Then "Wallet password" page is displayed in forgot password flow

  @LW-4060
  Scenario Outline: DApp connector window displayed in <theme> mode
    Given I click the menu button
    And I set theme switcher to <theme> mode
    When I open test DApp
    Then I see DApp authorization window in <theme> mode
    And I click "Authorize" button in DApp authorization window
    And I click "Only once" button in DApp authorization window
    When I click "Set Collateral" button in test DApp
    Then I see DApp collateral window in <theme> mode
    When I click "Confirm" button in DApp collateral window
    Then I see DApp connector "All done" page in <theme> mode
    And I click "Close" button on DApp "All done" page
    When I click "Send ADA" "Run" button in test DApp
    Then I see DApp connector "Confirm transaction" page in <theme> mode
    Examples:
      | theme |
      | light |
      | dark  |

  @LW-7743
  Scenario: DApp connector window theme updated from light to dark while using DApp
    Given I click the menu button
    And I set theme switcher to light mode
    When I open test DApp
    Then I see DApp authorization window in light mode
    And I click "Authorize" button in DApp authorization window
    And I click "Only once" button in DApp authorization window
    And I switch to window with Lace
    And I close all remaining tabs except current one
    And I set theme switcher to dark mode
    And I open and authorize test DApp with "Only once" setting
    When I click "Set Collateral" button in test DApp
    Then I see DApp collateral window in dark mode
    And I click "Confirm" button in DApp collateral window
    Then I see DApp connector "All done" page in dark mode
    And I click "Close" button on DApp "All done" page
    When I click "Send ADA" "Run" button in test DApp
    Then I see DApp connector "Confirm transaction" page in dark mode

  @LW-4071
  Scenario: DApp remains authorised after choosing "Always" and removing & restoring a wallet
    Given I open and authorize test DApp with "Always" setting
    And I switch to window with Lace
    And I close all remaining tabs except current one
    And I remove wallet
    And I restore a wallet
    And Wallet is synced
    And I switch network to: "Preprod" in extended mode
    And Wallet is synced
    And I open settings from header menu
    When I click on "Authorized DApps" setting
    Then I see test DApp on the Authorized DApps list
    When I open test DApp
    Then I don't see DApp window

  @LW-4070
  Scenario: Authorize Dapp with 'Only once' and leaving/closing DApp
    Given I open and authorize test DApp with "Only once" setting
    And I switch to window with DApp
    And I close all remaining tabs except current one
    When I open test DApp
    Then I don't see DApp window
    And I navigate to home page on extended view
    And I close all remaining tabs except current one
    When I open test DApp
    Then I see DApp authorization window
    And I switch to window with Lace
    And I close all remaining tabs except current one
    When I open test DApp
    Then I see DApp authorization window

    @LW-8403 @LW-8406
    Scenario: Automatically trigger collateral setup - happy path
      Given I am on Settings extended page
      And I see collateral as: "Inactive" in settings
      And I click on "Collateral" setting
      And all elements of Inactive collateral drawer are displayed
      And I open and authorize test DApp with "Only once" setting
      When I click "Set Collateral" button in test DApp
      Then I see DApp collateral window
      When I click "Confirm" button in DApp collateral window
      And I see DApp connector "All done" page
      And I click "Close" button on DApp "All done" page
      And I don't see DApp window
      And I switch to window with Lace
      Then all elements of Active collateral drawer are displayed
      When I click "Reclaim collateral" button on collateral drawer
      And I switch to window with DApp
      And I click "Set Collateral" button in test DApp
      Then I see DApp collateral window

  @LW-8404
  Scenario: Automatically trigger collateral setup - click cancel on Collateral modal
    Given I open and authorize test DApp with "Only once" setting
    And I click "Set Collateral" button in test DApp
    And I see DApp collateral window
    When I click "Cancel" button in DApp collateral window
    Then I don't see DApp window
    And I click "Set Collateral" button in test DApp
    And I see DApp collateral window

  @LW-8405
  Scenario: Automatically trigger collateral setup - Do not show automatic collateral window if it has been set manually
    Given I am on Settings extended page
    And I click on "Collateral" setting
    And I fill correct password and confirm collateral
    And I see collateral as: "Active" in settings
    And I open and authorize test DApp with "Only once" setting
    When I click "Set Collateral" button in test DApp
    Then I don't see DApp window

  @LW-8410
  Scenario: Automatically trigger collateral setup - network change
    Given I am on Settings extended page
    And I see collateral as: "Inactive" in settings
    And I click on "Collateral" setting
    And all elements of Inactive collateral drawer are displayed
    And I open and authorize test DApp with "Only once" setting
    And I click "Set Collateral" button in test DApp
    And I see DApp collateral window
    And I click "Confirm" button in DApp collateral window
    And I see DApp connector "All done" page
    And I click "Close" button on DApp "All done" page
    And I don't see DApp window
    And I switch to window with Lace
    And I close all remaining tabs except current one
    And all elements of Active collateral drawer are displayed
    And I close the drawer by clicking close button
    And I switch network to: "Preview" in extended mode
    And Wallet is synced
    And I am on Settings extended page
    And I click on "Collateral" setting
    And all elements of Inactive collateral drawer are displayed
    And I open and authorize test DApp with "Only once" setting
    When I click "Set Collateral" button in test DApp
    Then I see DApp collateral window
