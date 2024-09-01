// components/GiftList/GiftList.tsx
import React from 'react';
import ListItem from './ListItem';
import { QueryDobByAdderssData } from '@/hooks/useQueryDobByAddress';
import useWindowSize from '@/hooks/useQueryWidth';

interface GiftListProps {
  gifts: QueryDobByAdderssData;
  onGiftClick: (id: string) => void;
  isGiftSelected: (id: string) => boolean;
  onNewGiftClick?: () => void;
  selectedList?: string[];
  viewMode: 'list' | 'grid';
  disableList?: string[];
  /**
   * @interactionType
   * 1 => redirect to gift page
   * 2 => support select single item
   * 3 => support select multi item
   */
  interactionType?: number;
}

const List: React.FC<GiftListProps> = ({
  gifts,
  onGiftClick,
  isGiftSelected,
  onNewGiftClick,
  viewMode,
  interactionType = 1,
  disableList,
}) => {
  const width = useWindowSize();
  return (
    <div className="mb-8">
      <div
        className={`${
          width < 640
            ? 'flex flex-col items-center gap-4'
            : 'flex flex-wrap justify-between gap-4'
        } mt-4`}
      >
        {gifts.map(gift => {
          const isDisabled = disableList?.includes(gift.id);
          return (
            <ListItem
              key={gift.id}
              gift={gift}
              isDisabled={isDisabled}
              isSelected={isGiftSelected(gift.id)}
              onSelect={() => !isDisabled && onGiftClick(gift.id)}
              viewMode={viewMode}
              interactionType={interactionType}
            />
          );
        })}
      </div>
    </div>
  );
};

export default List;
