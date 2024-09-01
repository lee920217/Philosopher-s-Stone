import { useSigner } from '@ckb-ccc/connector-react';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export interface DobRenderOutput {
  name: string;
  traits: Array<{ String?: string; Number?: number }>;
}

export interface DobDecodeOutput {
  render_output: DobRenderOutput[];
  dob_content: string | Record<string, any>;
}

export interface QueryDobByAdderssItem {
  id: string;
  clusterId: string;
  contentType: string;
  content: string;
  txHash: string;
  index: number;
  owner: string;
  capacity: number;
  dobDecodeOutput?: DobDecodeOutput;
}

export type QueryDobByAdderssData = QueryDobByAdderssItem[];

interface UseFetchDataProps {
  address: string;
  network: string;
}

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

const fetcher = (url: string) => fetch(url).then(res => res.json());

const useQueryDobByAddress = () => {
  const address = useAddress();
  const network =
    process.env.NODE_ENV === 'development' ? 'testnet' : 'mainnet';
  const { data, error } = useSWR<QueryDobByAdderssData>(
    `https://ckb-lambda-server.shuttleapp.rs/address/${address}/spore/all?network=${network}&decode_dobs=true`,
    fetcher,
  );

  return {
    data,
    loading: !error && !data,
    error,
  };
};

export default useQueryDobByAddress;
