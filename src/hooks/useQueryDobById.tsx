import useSWR from 'swr';
import { QueryDobByAdderssData } from './useQueryDobByAddress';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const useQueryDobById = (sporeId: string) => {
  const network =
    process.env.NODE_ENV === 'development' ? 'testnet' : 'mainnet';
  const { data, error } = useSWR<QueryDobByAdderssData>(
    `https://ckb-lambda-server.shuttleapp.rs/spore/${sporeId}?network=${network}&decode_dobs=true`,
    fetcher,
  );

  return {
    data,
    loading: !error && !data,
    error,
  };
};

export default useQueryDobById;
