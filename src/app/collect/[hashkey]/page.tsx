'use client';

import { SporeItem } from '@/types/Hashkey';
import { formatString } from '@/utils/common';
import {
  fetchGiftAPI,
  fetchHashkeyAPI,
  fetchWalletAPI,
} from '@/utils/fetchAPI';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import WalletModal from '@/app/_components/WalletModal/WalletModal';
import Image from 'next/image';
import Button from '@/app/_components/Button/Button';
import DobImage from '@/app/_components/common/DobImage/DobImage';
import { getImageUrlById } from '@/utils/backgroundImageSettings';
import useQueryDobById from '@/hooks/useQueryDobById';
import { QueryDobByAdderssItem } from '@/hooks/useQueryDobByAddress';
import { getPrevBgTrait } from '@/utils/getMedia';
import { ccc } from '@ckb-ccc/connector-react';

const Hashkey: React.FC = () => {
  const pathName = usePathname();
  const router = useRouter();
  const pathAddress = pathName.split('/')[pathName.split('/').length - 1];
  const [giftMessage, setGiftMessage] = useState<string>('');
  const [sporeInfo, setSporeInfo] = useState<SporeItem>();
  const [receiveProcessing, setReceiveProcessing] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>();
  const [showHeaderModal, setHeaderShowModal] = useState(false);
  const [giftStatus, setGiftStatus] = useState<
    'pending' | 'success' | 'notfound'
  >('pending');
  const [imgData, setImgData] = useState<string>();
  const [sporeId, setSporeId] = useState<string>('');
  const [dobData, setDobData] = useState<QueryDobByAdderssItem>();

  const { wallet, open, disconnect } = ccc.useCcc();

  const signer = ccc.useSigner();

  const getHashkeyGift = async (key: string) => {
    let rlt = await fetchHashkeyAPI({
      action: 'getHashKeyGift',
      key,
    });
    if (rlt.data) {
      setSporeInfo(rlt.data);
      getGiftInfo(rlt.data.sporeId);
      setDobData(rlt.data.dobData);
      setGiftStatus('success');
    } else {
      setGiftStatus('notfound');
    }
  };

  const getGiftInfo = async (key: string) => {
    let rlt = await fetchGiftAPI({
      action: 'getGiftInfo',
      key,
    });
    if (rlt.data && rlt.data.giftMessage) {
      setGiftMessage(rlt.data.giftMessage);
    }
  };

  const deleteHashkey = async (key: string) => {
    let rlt = await fetchHashkeyAPI({
      action: 'deleteHash',
      key,
    });
    return rlt;
  };

  const receiveGift = async (sporeId: string) => {
    if (!wallet) {
      setHeaderShowModal(true);
    }
    setReceiveProcessing(true);
    const receiverAccounts = await signer?.getRecommendedAddress();
    console.log(sporeId);
    const txHash = await fetchWalletAPI({
      action: 'signAndSendTransaction',
      sporeId,
      receiverAccounts,
    });
    setReceiveProcessing(false);
    deleteHashkey(pathAddress);
    router.push(
      `/receipt/${txHash.txHash}?date=${sporeInfo?.date}&type=receive`,
    );
  };

  useEffect(() => {
    if (pathAddress) {
      getHashkeyGift(pathAddress);
    } else {
      //TODO
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathAddress]);

  useEffect(() => {
    if (dobData) {
      setImgData(getPrevBgTrait(dobData.dobDecodeOutput?.render_output!!));
    }
  }, [dobData]);

  return (
    <div className="universe-bg px-4 flex-1 flex flex-col rounded-3xl">
      {giftStatus === 'success' && (
        <>
          {showHeaderModal && (
            <WalletModal onClose={() => setHeaderShowModal(false)} />
          )}
          <div className="relative mt-10 w-full flex flex-col items-center py-8 px-4 bg-primary008 rounded-md font-SourceSanPro text-white001">
            <Image
              className="absolute top-[6px] left-[6px]"
              src="/svg/bg-fireworks.svg"
              width={111}
              height={108}
              alt="decor"
            />
            <Image
              className="absolute top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
              src="/svg/avatar-sender.svg"
              width={48}
              height={48}
              alt="sender's avatar"
            />
            <div className="w-full flex justify-center text-body1mb">
              From:{' '}
              {sporeInfo
                ? formatString(sporeInfo?.senderWalletAddress!!)
                : '*****'}
            </div>
            <div className="w-full flex justify-center mt-4 text-labelmb text-white003">
              {sporeInfo
                ? new Date(sporeInfo?.date!!).toLocaleDateString()
                : '*****'}
            </div>
            {dobData && (
              <DobImage
                bgUrl={getImageUrlById(dobData.clusterId) || ''}
                imgUrl={`https://dobfs.dobby.market/${imgData}`}
              ></DobImage>
            )}
            <div className="w-full flex justify-center mt-4 items-center">
              {giftMessage && <p className="text-body1mb">{giftMessage}</p>}
            </div>
          </div>
          <Button
            type="solid"
            label={receiveProcessing ? 'Claiming...' : 'Claim Now'}
            className="mt-8 flex justify-center items-center"
            onClick={() => {
              if (dobData) {
                receiveGift(`0x${dobData?.id}`);
              }
            }}
            disabled={receiveProcessing}
          />
        </>
      )}
      {giftStatus === 'pending' && (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="relativemt-12 flex flex-col items-center mt-12">
            <Image
              alt={'collect-pending'}
              src={`/svg/collect-gift-processing.svg`}
              className="rounded mb-8"
              width={170}
              height={170}
            />
            <p className=" text-hd2mb font-Montserrat text-white001 text-center">
              A Magical Surprise Awaits &ndash; Will It Be Yours?
            </p>
            <p className=" text-labelmb font-SourceSanPro text-white003 text-center mt-8">
              This magical surprise is up for grabs &ndash; first come, first
              served! Are you the lucky one to claim it? Let&apos;s find out!
            </p>
          </div>
        </div>
      )}
      {giftStatus === 'notfound' && (
        <div className="w-full h-full flex flex-col items-center justify-center mt-12">
          <div className="relativemt-12 flex flex-col items-center">
            <Image
              alt={'collect-pending'}
              src={`/svg/fail-collect.svg`}
              className="rounded mb-8"
              width={170}
              height={170}
            />
            <p className=" text-hd2mb font-SourceSanPro text-white001 text-center">
              🎈 Uh-oh! Looks like you just missed the surprise.
            </p>
            <p className=" text-labelmb font-SourceSanPro text-white003 text-center mt-8">
              This gift was claimed by someone else. But don&apos;t worry, there
              are plenty more surprises. Keep an eye out for the next magical
              Gift crafted with Philosopher&apos;s Stone! 🌟
            </p>
          </div>
          <Button
            className="mt-8 flex justify-center items-center"
            type="solid"
            label="Come back later"
            href={'/'}
          />
        </div>
      )}
    </div>
  );
};

export default Hashkey;
