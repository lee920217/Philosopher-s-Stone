import { graphql } from '@/gql';
import { QuerySpore } from './type';
import { graphQLClient } from '@/utils/graphql';
import { useRefreshableQuery } from './useRefreshableQuery';
import { RequestDocument } from 'graphql-request';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setSpores } from '@/store/sporeListSlice';
import { ccc, useSigner } from '@ckb-ccc/connector-react';
import { useEffect, useState } from 'react';

const sporesByAddressQueryDocument = graphql(`
  query GetSporesByAddress($address: String!) {
    spores(filter: { addresses: [$address] }) {
      id
      contentType
      capacityMargin

      cell {
        cellOutput {
          capacity
          lock {
            args
            codeHash
            hashType
          }
        }
        outPoint {
          txHash
          index
        }
      }
    }
  }
`);

function useAddress() {
  const [address, setAddress] = useState<string | null>(null);
  const signer = useSigner();

  useEffect(() => {
    const fetchAddress = async () => {
      if (signer) {
        const addr = await signer.getRecommendedAddress();
        setAddress(addr);
      }
    };
    fetchAddress();
  }, [signer]);

  return address;
}

export function useSporesByAddressQuery(enabled = true) {
  const address = useAddress();
  const { data, ...rest } = useRefreshableQuery(
    {
      queryKey: ['sporesByAddress', address],
      queryFn: async ctx => {
        return graphQLClient.request(
          sporesByAddressQueryDocument,
          { address: address! },
          ctx.meta?.headers as Headers,
        );
      },
      enabled: !!address && enabled,
    },
    true,
  );
  const spores: QuerySpore[] = data?.spores ?? [];
  const isLoading = rest.isLoading || rest.isPending;
  // dispatch(setSpores(spores))
  return {
    ...rest,
    data: spores,
    isLoading,
  };
}
