type RecursiveStructure = { [key: string]: '' | RecursiveStructure };

export type ConstructTranslationKeyUnion<T extends RecursiveStructure, K extends keyof T = keyof T> = K extends string
  ? T[K] extends ''
    ? K
    : T[K] extends RecursiveStructure
    ? `${K}.${ConstructTranslationKeyUnion<T[K]>}`
    : never
  : never;

type KeysStructure = {
  general: {
    button: {
      confirm: '';
      close: '';
    };
  };
  activity: {
    rewardsHistory: {
      title: '';
      noStakingActivityYet: '';
    };
    rewardsChart: {
      title: '';
      epochs: '';
      epoch: '';
      last: '';
      all: '';
      rewards: '';
    };
  };
  browsePools: {
    stakePoolTableBrowser: {
      searchInputPlaceholder: '';
      tableHeader: {
        poolName: '';
        ros: {
          title: '';
          tooltip: '';
        };
        cost: '';
        saturation: {
          title: '';
          tooltip: '';
        };
      };
      emptyMessage: '';
      stake: '';
      unselect: '';
      addPool: '';
      disabledTooltip: '';
    };
  };
  drawer: {
    title: '';
    titleSecond: '';
    sign: {
      confirmation: {
        title: '';
      };
      passwordPlaceholder: '';
      enterWalletPasswordToConfirmTransaction: '';
      error: {
        invalidPassword: '';
      };
    };
    success: {
      title: '';
      subTitle: '';
      switchedPools: {
        title: '';
        subTitle: '';
      };
    };
    failure: {
      title: '';
      subTitle: '';
      button: {
        close: '';
        back: '';
        retry: '';
      };
    };
    details: {
      metrics: {
        activeStake: '';
        apy: '';
        delegators: '';
        saturation: '';
      };
      status: {
        delegating: '';
        retired: '';
        retiring: '';
        saturated: '';
      };
      stakeOnPoolButton: '';
      selectForMultiStaking: '';
      addStakingPool: '';
      unselectPool: '';
      manageDelegation: '';
      statistics: '';
      information: '';
      social: '';
      poolIds: '';
      owners: '';
    };
    confirmation: {
      title: '';
      subTitle: '';
      cardanoName: '';
      transactionCost: {
        title: '';
      };
      transactionReturn: {
        title: '';
      };
      transactionTotal: {
        title: '';
      };
      chargedDepositAmountInfo: '';
      reclaimDepositAmountInfo: '';
      stakingDeposit: '';
      errors: {
        utxoFullyDepleted: '';
        utxoBalanceInsufficient: '';
      };
      transactionFee: '';
      theAmountYoullBeChargedToProcessYourTransaction: '';
      button: {
        continueInAdvancedView: '';
        confirmWithDevice: '';
        signing: '';
        confirm: '';
      };
    };
    preferences: {
      selectedStakePools: '';
      addPoolButton: '';
      pickMorePools: '';
      confirmButton: '';
      rebalanceButton: '';
      removePoolButton: '';
      ctaButtonTooltip: {
        zeroPercentageSliderError: '';
        invalidAllocation: '';
      };
      poolDetails: {
        savedRatio: '';
        savedRatioTooltip: '';
        actualRatio: '';
        actualRatioTooltip: '';
        actualStake: '';
        actualStakeTooltip: '';
      };
    };
  };
  modals: {
    changingPreferences: {
      title: '';
      description: '';
      buttons: {
        cancel: '';
        confirm: '';
      };
    };
    beta: {
      pill: '';
      title: '';
      description: '';
      button: '';
      portfolioPersistence: {
        title: '';
        description: '';
      };
    };
    poolsManagement: {
      title: '';
      buttons: {
        cancel: '';
        confirm: '';
      };
      description: {
        reduction: '';
        adjustment: '';
      };
    };
  };
  overview: {
    delegationCard: {
      label: {
        status: '';
        balance: '';
        pools: '';
      };
      statuses: {
        multiDelegation: '';
        overAllocated: '';
        noSelection: '';
        simpleDelegation: '';
        underAllocated: '';
      };
    };
    banners: {
      pendingFirstDelegation: {
        title: '';
        message: '';
      };
      pendingPortfolioModification: {
        title: '';
        message: '';
      };
      portfolioDrifted: {
        title: '';
        message: '';
      };
      saturatedOrRetiredPool: {
        title: '';
        message: '';
      };
    };
    stakingInfoCard: {
      fee: '';
      margin: '';
      lastReward: '';
      ros: '';
      totalRewards: '';
      totalStaked: '';
      poolRetired: '';
      poolRetiring: '';
      poolSaturated: '';
      tooltipFiatLabel: '';
    };
    yourPoolsSection: {
      heading: '';
      manageButtonLabel: '';
    };
    noFunds: {
      title: '';
      description: '';
      button: '';
    };
    noStaking: {
      title: '';
      description: '';
      balanceTitle: '';
      getStarted: '';
      followSteps: '';
      searchForPoolDescription: '';
      searchForPoolTitle: '';
      selectPoolsDescription: '';
      selectPoolsTitle: '';
    };
  };
  root: {
    title: '';
    nav: {
      activityTitle: '';
      browsePoolsTitle: '';
      title: '';
      overviewTitle: '';
    };
  };
  portfolioBar: {
    selectedPools: '';
    maxPools: '';
    clear: '';
    next: '';
  };
  popup: {
    expandBanner: {
      button: '';
      description: '';
      title: '';
    };
  };
};

export type TranslationKey = ConstructTranslationKeyUnion<KeysStructure>;

export type Translations = { [key in TranslationKey]: string };
