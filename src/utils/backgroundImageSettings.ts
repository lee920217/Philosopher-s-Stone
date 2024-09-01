type ImageConfig = {
  [key: string]: string;
};

const imageConfig: ImageConfig = {
  '0x5032194bcd8ba54743b9e2ac5eea24f50f1c2397e26b702bd2493b0a95603e0f':
    '/img/bg.png',
  '0x29c1012f72d916461c9dabcca1315b9e6082ed179210214c1fa335ae66719818':
    '/img/bg.png',
  '0x7256076bed1e37e21b1dfe2117b27534573ffcc13a95c3d2716a76727589c5a1':
    '/img/bg.png',
  '0x6becd6a3ab94814e7bc6221f1208a715e74e94308f81fc8e46e793a3cd925c85':
    '/img/bg.png',
  '0x86eaeaf552a8550c282e6ba14c7fa433f8590cc08375597df0d3964125a98775':
    '/img/bg.png',
};

export const getImageUrlById = (id: string): string | undefined => {
  const formattedId = id.startsWith('0x') ? id : `0x${id}`;
  return imageConfig[formattedId];
};
