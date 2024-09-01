/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import Image from 'next/image';

import { QuerySpore } from '@/hooks/useQuery/type';
import { BI } from '@ckb-lumos/lumos';
import Link from 'next/link';
import { boxData } from '@/types/BlindBox';
import {
  DobRenderOutput,
  QueryDobByAdderssItem,
} from '@/hooks/useQueryDobByAddress';
import { getPrevBgTrait } from '@/utils/getMedia';
import useWindowSize from '@/hooks/useQueryWidth';
import { getImageUrlById } from '@/utils/backgroundImageSettings';
import { getClusterInfoById } from '@/utils/getClusterInfo';
import { fixedPointFrom, fixedPointToString } from '@ckb-ccc/ccc';
import { ccc } from '@ckb-ccc/core';

interface ItemProps {
  gift: QueryDobByAdderssItem;
  isSelected: boolean;
  onSelect: () => void;
  viewMode: 'list' | 'grid';
  interactionType?: number;
  isDisabled?: boolean;
}

const ListItem: React.FC<ItemProps> = ({
  gift,
  isSelected,
  onSelect,
  viewMode,
  interactionType,
  isDisabled,
}) => {
  const isQuerySpore = (gift: QuerySpore): gift is QuerySpore => {
    return (gift as QuerySpore).cell !== undefined;
  };
  const width = useWindowSize();
  const isSpore = isQuerySpore(gift);
  const listView = viewMode === 'list';
  const image = getPrevBgTrait(gift.dobDecodeOutput?.render_output!!);

  useEffect(() => {
    console.log(width);
  }, [width]);

  const listItemContent = (
    <div
      className={`relative w-48 md:w-52 lg:w-64 ${width < 640 && '!w-96'} ${
        isSelected && !listView
          ? 'border-success-function border-2'
          : 'border-white009'
      } ${isSelected && 'bg-selected'} relative cursor-pointer
        ${
          listView ? 'flex items-center px-4 border-t-[1px]' : 'border rounded'
        } `}
      onClick={interactionType && interactionType > 1 ? onSelect : undefined}
    >
      {isDisabled && (
        <div className="z-10 absolute inset-0 bg-gray-500 opacity-50 flex justify-center items-center cursor-not-allowed"></div>
      )}
      <div
        className={`relative ${
          width < 640 ? '!w-96 !h-96' : ''
        } w-48 md:w-52 lg:w-64 relative`}
      >
        <img
          className="absolute"
          src={getImageUrlById(gift.clusterId)}
          alt="cluster bg"
        ></img>
        <img
          alt={gift.id!}
          src={`https://dobfs.dobby.market/${image}`}
          className="relative rounded object-cover h-full w-full z-10"
        />
      </div>
      <div className="w-full bg-primary008 h-[60px] flex-grow flex flex-col items-start justify-center">
        <div className="w-full flex justify-between px-2">
          {gift && (
            <>
              <p className="font-SourceSanPro text-labelmb text-white001">
                {getClusterInfoById(gift.clusterId).name}
              </p>
              <a
                href={`${getClusterInfoById(gift.clusterId).txHashUrl}`}
                className="underline font-SourceSanPro text-labelmb text-white001"
              >
                {gift.id.slice(0, 4)}...
                {gift.id.slice(gift.id.length - 4, gift.id.length)}
              </a>
            </>
          )}
        </div>
        <div className="w-full flex gap-2 items-center px-2">
          {gift && (
            <>
              <img
                src={`/img/nervos.png`}
                alt="nervos ckb"
                className="w-4 h-4 rounded-full"
              />
              <p className="font-SourceSanPro text-labelmb text-white001">
                {fixedPointToString(ccc.numFrom(gift.capacity), 8)} CKB
              </p>
            </>
          )}
        </div>
      </div>
      {isSelected && (
        <div
          className={`absolute ${
            listView ? 'right-4' : 'top-2 right-2'
          } w-6 h-6 rounded-full bg-green-500 border-green-500 flex items-center justify-center`}
        >
          <img
            src="/svg/icon-check.svg"
            width={24}
            height={24}
            alt="Selected"
          />
        </div>
      )}
    </div>
  );
  return interactionType && interactionType > 1 ? (
    listItemContent
  ) : (
    <Link href={`/gift/${gift.id}`}>{listItemContent}</Link>
  );
};

export default ListItem;
