'use client';

import GuestHome from './_components/GuestHome/GuestHome';
import UserHome from './_components/UserHome/UserHome';
import { useGiftReceiveModal } from '@/hooks/Modal/useGiftReceiveModal';
import ReceiveGiftModal from './_components/common/ReceiveGiftModal/ReceiveGiftModal';
import { ccc } from '@ckb-ccc/connector-react';
export const dynamic = 'force-dynamic';

export default function Home() {
  const { wallet } = ccc.useCcc();
  const { isGiftReceiveModalOpen, closeGiftReceiveModal } =
    useGiftReceiveModal();

  return (
    <main className="universe-bg max-w-3xl flex-1 rounded-3xl">
      <ReceiveGiftModal
        isReceiveGiftModalOpen={isGiftReceiveModalOpen}
        closeReceiveGiftModal={closeGiftReceiveModal}
      />
      {wallet ? <UserHome /> : <GuestHome />}
    </main>
  );
}
