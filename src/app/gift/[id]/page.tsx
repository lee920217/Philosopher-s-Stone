/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { meltSpore as _meltSpore } from '@spore-sdk/core';
import Link from 'next/link';
import { enqueueSnackbar } from 'notistack';
import { useSporeQuery } from '@/hooks/useQuery/useQuerybySpore';
import { BI } from '@ckb-lumos/lumos';
import MeltGiftModal from '@/app/_components/MeltModal/MeltModal';
import { useMutation } from '@tanstack/react-query';
import useLoadingOverlay from '@/hooks/useLoadOverlay';
import LoadingOverlay from '@/app/_components/LoadingOverlay/LoadingOverlay';
import {
  fetchBlindBoxAPI,
  fetchGiftAPI,
  fetchHistoryAPI,
} from '@/utils/fetchAPI';
import { formatNumberWithCommas } from '@/utils/common';
import { sporeConfig } from '@/utils/config';
import Button from '@/app/_components/Button/Button';
import { ccc } from '@ckb-ccc/connector-react';
import useQueryDobById from '@/hooks/useQueryDobById';
import { getPrevBgTrait } from '@/utils/getMedia';
import { getImageUrlById } from '@/utils/backgroundImageSettings';
import { DobRenderOutput } from '@/hooks/useQueryDobByAddress';
import DobImage from '@/app/_components/common/DobImage/DobImage';

const Gift: React.FC = () => {
  const router = useRouter();
  const pathName = usePathname();
  const signer = ccc.useSigner();
  const pathAddress = pathName.split('/')[pathName.split('/').length - 1];

  const [occupied, setOccupied] = useState<string>('');
  const [isMeltModal, setIsMeltModal] = useState<boolean>(false);
  const [giftMessage, setGiftMessage] = useState<string>('');
  const [address, setAddress] = useState<string>();
  const [imgData, setImgData] = useState<string>();
  const [renderData, setRenderData] = useState<DobRenderOutput[]>();
  const { data: spore, isLoading: isSporeLoading } = useSporeQuery(
    pathAddress as string,
  );
  const { data: dobData, loading: isDobLoading } = useQueryDobById(pathAddress);
  const {
    isVisible,
    showOverlay,
    hideOverlay,
    progressStatus,
    setProgressStatus,
  } = useLoadingOverlay();
  const texts = [
    'Unmatched Flexibility and Interopera­bility',
    'Supreme Security and Decentrali­zation',
    'Inventive Tokenomics',
  ];

  const handleCopy = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      enqueueSnackbar('Copied Successful', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar('Copied Fail', { variant: 'error' });
    }
  };

  const handleMeltModal = () => {
    setIsMeltModal(!isMeltModal);
  };

  const meltSpore = useCallback(
    async (...args: Parameters<typeof _meltSpore>) => {
      const { txSkeleton } = await _meltSpore(...args);
      const txHash = await signer?.sendTransaction(
        ccc.Transaction.fromLumosSkeleton(txSkeleton),
      );
      return txHash;
    },
    [],
  );

  const meltSporeMutation = useMutation({
    mutationFn: meltSpore,
    onSuccess: () => {
      enqueueSnackbar('Melt Successful', { variant: 'success' });
    },
  });

  const handleMelt = async () => {
    if (!address || !spore) {
      return;
    }
    handleMeltModal();
    showOverlay();
    await meltSporeMutation.mutateAsync({
      outPoint: spore!.cell!.outPoint!,
      config: sporeConfig,
    });
    setProgressStatus('done');
    setTimeout(() => {
      hideOverlay();
    }, 1000);
    router.push('/');
  };

  useEffect(() => {
    if (dobData) {
      setImgData(getPrevBgTrait(dobData[0].dobDecodeOutput?.render_output!!));
      setRenderData(dobData[0].dobDecodeOutput?.render_output);
    }
  }, [dobData]);

  useEffect(() => {
    if (
      !isSporeLoading &&
      spore &&
      spore.cell &&
      spore?.cell?.cellOutput &&
      spore.cell.cellOutput.capacity
    ) {
      let occupied = formatNumberWithCommas(
        BI.from(spore?.cell?.cellOutput.capacity).toNumber() / 10 ** 8,
      );
      setOccupied(occupied);
    }
    console.log(spore);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSporeLoading, spore?.cell?.cellOutput.capacity]);

  useEffect(() => {
    if (!signer) return;
    (async () => {
      setAddress(await signer.getRecommendedAddress());
    })();
  }, [signer]);

  return (
    <div className="universe-bg flex flex-col items-center px-4 pb-12 rounded-3xl">
      <LoadingOverlay
        isVisible={isVisible}
        texts={texts}
        progressStatus={progressStatus}
      />
      <MeltGiftModal
        onClose={handleMeltModal}
        amount={occupied}
        onMelt={handleMelt}
        isOpen={isMeltModal}
      />
      <div className="w-full flex justify-between my-8">
        <div className="flex items-center">
          <button onClick={() => router.back()} className="self-start">
            <img
              src="/svg/icon-arrow-left.svg"
              width={24}
              height={24}
              alt="Go back"
            />
          </button>
          <div className="text-white001 font-SourceSanPro text-subheadermb ml-3">
            {pathAddress.slice(0, 6)}...
            {pathAddress.slice(pathAddress.length - 6, pathAddress.length)}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              handleCopy(pathAddress);
            }}
            className="mr-4"
          >
            <img
              src="/svg/icon-copy.svg"
              width={24}
              height={24}
              alt="Copy address"
            />
          </button>
          <Link
            href={`https://explorer.nervos.org/transaction/${spore?.cell?.outPoint?.txHash}`}
            target="_blank"
          >
            <img
              src="/svg/icon-globe.svg"
              width={24}
              height={24}
              alt="Check on CKB Explorer"
            />
          </Link>
        </div>
      </div>
      {dobData && imgData && (
        <DobImage
          bgUrl={getImageUrlById(dobData[0].clusterId) || ''}
          imgUrl={`https://dobfs.dobby.market/${imgData}`}
        ></DobImage>
      )}
      <div className="w-full flex flex-col gap-2">
        {dobData &&
          dobData[0] &&
          dobData[0].dobDecodeOutput &&
          dobData[0].dobDecodeOutput?.render_output.map((item, index) => {
            const trait = item.traits[0]; // Get the first trait
            const value = trait.String || trait.Number || ''; // Get the value (String or Number)

            return (
              <div
                className="flex w-full bg-primary004 py-4 px-2 rounded justify-between"
                key={index}
              >
                <p className="text-primary011 font-semibold">{item.name}</p>
                <p className="max-w-[250px] truncate">{value}</p>
              </div>
            );
          })}
      </div>
      <div className="text-white001 font-Montserrat text-hd2mb my-6">
        {occupied} CKB
      </div>
      {giftMessage && (
        <p className="pb-4 font-SourceSanPro text-white001 text-body1mb">
          “{giftMessage}”
        </p>
      )}
      <Button
        type="solid"
        label="Send as Gift"
        className="flex justify-center mb-4 items-center"
        href={`/send?hasGift=${pathAddress}`}
      />
      <Button type="outline" label="Melt into CKB" onClick={handleMeltModal} />
    </div>
  );
};

export default Gift;
