import {
  forkSporeConfig,
  predefinedSporeConfigs,
  setSporeConfig,
  SporeConfig,
} from '@spore-sdk/core';

const sporeConfig: SporeConfig =
  process.env.NODE_ENV === 'development'
    ? predefinedSporeConfigs.Testnet
    : predefinedSporeConfigs.Mainnet;
// initializeConfig(sporeConfig.lumos);
// setSporeConfig(sporeConfig);
export { sporeConfig };
