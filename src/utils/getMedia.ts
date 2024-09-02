import { DobRenderOutput } from '@/hooks/useQueryDobByAddress';

export const getPrevBgTrait = (
  renderOutputs: DobRenderOutput[],
): string | undefined => {
  if (!renderOutputs || !renderOutputs.length) return;
  const prevBgItem = renderOutputs.find(item => item.name === 'prev.bg');
  return prevBgItem?.traits[0].String!!;
};
