import CKBConnector from '@/connectors/base';
import MetaMaskConnector from '@/connectors/metamask';
import SporeService from '@/spore';
import { RootState } from '@/store/store';
import { WalletInfo } from '@/store/walletSlice';
import { sporeConfig } from '@/utils/config';
import { Script, Transaction, config, helpers } from '@ckb-lumos/lumos';
import { enqueueSnackbar } from 'notistack';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSelector } from 'react-redux';

export const ConnectContext = createContext<{
  autoConnect?: boolean;
  connectors: CKBConnector[];
}>({
  autoConnect: false,
  connectors: [],
});

export const ConnectProvider = ConnectContext.Provider;

export const useConnect = () => {
  const { connectors, autoConnect } = useContext(ConnectContext);
  const walletInfo = useSelector((state: RootState) => state.wallet.wallet);
  const address = walletInfo?.address;
  const connectorType = walletInfo?.walletType;
  const [autoConnected, setAuthConnected] = useState(false);
  const connected = !!address;

  const getCells = async () => {
    let cells = await SporeService.shared.getNewOmnilock();
    return cells[0];
  };

  const lock = useMemo(() => {
    if (!address) return undefined;
    return helpers.parseAddress(address, { config: sporeConfig.lumos });
  }, [address]);

  const connector = useMemo(
    () =>
      connectors.find(
        connector =>
          connector.type.toLowerCase() === connectorType?.toLowerCase(),
      ),
    [connectors, connectorType],
  );

  useEffect(() => {
    if (autoConnected) {
      return;
    }

    if (address && autoConnect && !connector?.isConnected) {
      setAuthConnected(true);
      if (connector?.type === 'MetaMask') {
        connector?.connect().catch(e => {
          enqueueSnackbar((e as Error).message, { variant: 'error' });
        });
      }
    }
  }, [autoConnected, autoConnect, connector, address]);

  const isOwned = useCallback(
    (lock: Script) => {
      if (!connector) {
        return false;
      }
      return connector.isOwned(lock);
    },
    [connector],
  );

  const disconnect = useCallback(() => {
    if (!connector) {
      throw new Error(`Connector ${connectorType} not found`);
    }
    connector.disconnect();
  }, [connector, connectorType]);

  const connect = useCallback(() => {
    if (connectors.length === 0) {
      throw new Error('No connector found');
    }
    if (connectors.length === 1) {
      try {
        const [connector] = connectors;
        // connector.connect();
        return;
      } catch (e) {
        enqueueSnackbar((e as Error).message, { variant: 'error' });
      }
    }
    return connectors;
  }, [connectors]);

  const getAnyoneCanPayLock = useCallback(() => {
    if (!connector) {
      throw new Error(`Connector ${connectorType} not found`);
    }
    const lock = connector.getAnyoneCanPayLock();
    return lock;
  }, [connector, connectorType]);

  return {
    address,
    lock,
    connect,
    isOwned,
    disconnect,
    getAnyoneCanPayLock,
  };
};
