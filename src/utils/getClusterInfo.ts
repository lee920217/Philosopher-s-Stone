type ClusterInfo = {
  name: string;
  description: string;
  txHashUrl: string;
};

const clusterData: { [key: string]: ClusterInfo } = {
  '0x5032194bcd8ba54743b9e2ac5eea24f50f1c2397e26b702bd2493b0a95603e0f': {
    name: 'Nervape Handheld',
    description:
      'Handheld gadgets/items that simplify, entertain, protect, and keep Nervapes connected on the go.',
    txHashUrl:
      'https://explorer.nervos.org/transaction/0x4dc35bcae68acf664ef7e27a89fa68581baf5d5cd437e3f52c401a11b0b03f4e',
  },
  '0x29c1012f72d916461c9dabcca1315b9e6082ed179210214c1fa335ae66719818': {
    name: 'Nervape Handheld',
    description:
      'Handheld gadgets/items that simplify, entertain, protect, and keep Nervapes connected on the go.',
    txHashUrl:
      'https://explorer.nervos.org/transaction/0x4dc35bcae68acf664ef7e27a89fa68581baf5d5cd437e3f52c401a11b0b03f4e',
  },
  '0x7256076bed1e37e21b1dfe2117b27534573ffcc13a95c3d2716a76727589c5a1': {
    name: 'Nervape Handheld',
    description:
      'Handheld gadgets/items that simplify, entertain, protect, and keep Nervapes connected on the go.',
    txHashUrl:
      'https://explorer.nervos.org/transaction/0x4dc35bcae68acf664ef7e27a89fa68581baf5d5cd437e3f52c401a11b0b03f4e',
  },
  '0x86eaeaf552a8550c282e6ba14c7fa433f8590cc08375597df0d3964125a98775': {
    name: 'Nervape Handheld',
    description:
      'Handheld gadgets/items that simplify, entertain, protect, and keep Nervapes connected on the go.',
    txHashUrl:
      'https://explorer.nervos.org/transaction/0x4dc35bcae68acf664ef7e27a89fa68581baf5d5cd437e3f52c401a11b0b03f4e',
  },
  '0xc62fc8d75b8fb5b3f7c65f4dfc4063488d02f2480366c5010825b90c363c1a5d': {
    name: 'Nervape Handheld',
    description:
      'Handheld gadgets/items that simplify, entertain, protect, and keep Nervapes connected on the go.',
    txHashUrl:
      'https://explorer.nervos.org/transaction/0x4dc35bcae68acf664ef7e27a89fa68581baf5d5cd437e3f52c401a11b0b03f4e',
  },
  '0x6becd6a3ab94814e7bc6221f1208a715e74e94308f81fc8e46e793a3cd925c85': {
    name: 'Nervape Accessory',
    description: 'Accessories highlight and elevate a Nervape’s outfit.',
    txHashUrl:
      'https://explorer.nervos.org/transaction/0x364983c6061bfad48fde4791cfad21456a748a296a725e6b48ce1d61d9e42e83',
  },
  '0x57de7ae055fa69b9bcf949ffeda3f73495f63fd88252c2e5812acfbac100225a': {
    name: 'Nervape Accessory',
    description: 'Accessories highlight and elevate a Nervape’s outfit.',
    txHashUrl:
      'https://explorer.nervos.org/transaction/0x364983c6061bfad48fde4791cfad21456a748a296a725e6b48ce1d61d9e42e83',
  },
  '0x08f71890cb84e492b5a6aaf4bdc0f25e714dd8b8540126f1a9328f0ece7f3f6b': {
    name: 'Nervape Headwear',
    description:
      "Headwear for a Nervape isn't just a fashion statement, it can also shield you from the rocks life throws at you.",
    txHashUrl:
      'https://explorer.nervos.org/transaction/0xe4b515467eb44d94f387dde36d32ef05ce576294e2de06f8c3d1102b2f69a40e',
  },
  '0x1a2ca0c10daadb9f9e087283fecdc72c136dfd0d050d8041f2d4a4cf012d5149': {
    name: 'Nervape Headwear',
    description:
      "Headwear for a Nervape isn't just a fashion statement, it can also shield you from the rocks life throws at you.",
    txHashUrl:
      'https://explorer.nervos.org/transaction/0xe4b515467eb44d94f387dde36d32ef05ce576294e2de06f8c3d1102b2f69a40e',
  },
  '0xf923785f4f44b808c3e6655e66c7d8bb0fbec0e9507f3143734ed67799be0f86': {
    name: 'Nervape Eyewear',
    description:
      'Nervape eyewear ensures clear vision, UV protection, and adds style points.',
    txHashUrl:
      'https://explorer.nervos.org/transaction/0x290fbb152f82681e9ad91e5ec30922ebe4422b32f805039b19c642da52d8d276',
  },
  '0x482cc386a3d6ed2a5f645a31d8198cbb3be2b7151d53c80468ecbc2c97d6da60': {
    name: 'Nervape Eyewear',
    description:
      'Nervape eyewear ensures clear vision, UV protection, and adds style points.',
    txHashUrl:
      'https://explorer.nervos.org/transaction/0x290fbb152f82681e9ad91e5ec30922ebe4422b32f805039b19c642da52d8d276',
  },
  '0x797989888e0d93294d777ce7e2a2b8b9f4e61b6be0190f70d08adf6ef7eea151': {
    name: 'Nervape Lower Body',
    description:
      'Lower body gear is custom-made to provide comfort, mobility, and fashion for our short-legged Nervapes, gearing them up for whatever adventure lies ahead.',
    txHashUrl:
      'https://explorer.nervos.org/transaction/0x68224d1bf0960aa13bff29f8d4610d862b24ec92b6e16e3d100e3d99324a069e',
  },
  '0x4321a4e5201ad5abba69962a3aec78ff5c1af489af7db28614314258850f7ccf': {
    name: 'Nervape Lower Body',
    description:
      'Lower body gear is custom-made to provide comfort, mobility, and fashion for our short-legged Nervapes, gearing them up for whatever adventure lies ahead.',
    txHashUrl:
      'https://explorer.nervos.org/transaction/0x68224d1bf0960aa13bff29f8d4610d862b24ec92b6e16e3d100e3d99324a069e',
  },
  '0xbe655dc598f3cdc23ce935e76d827288e460e3cf62f8bc9b2f5c59b47a4750da': {
    name: 'Nervape Mouth',
    description:
      'Nervape mouth gear is for communication, expression, and connection. Also, they can be tasty!',
    txHashUrl:
      'https://explorer.nervos.org/transaction/0xf4d5f3d03ad99ffbb30eaae5e21ea33555486712a1a91b1f3b688aab8cb9de66',
  },
  '0xf2d14e1d6e57faaea4140ac52724a8e1e8e7d8a254e49b4aa2eebb9a051a2680': {
    name: 'Nervape Ears',
    description:
      'Ear gear for Nervapes are essential for music, focus, and tuning in or tuning out the world.',
    txHashUrl:
      'https://explorer.nervos.org/transaction/0x028ef04eb491b145703a6b90e994059e884888a1c9ae35bbcfaaa05101efa20f',
  },
  '0x95a56c18700cbc3f4e98895fe7063094f592fd89964d49ba5a5c1da1f66b7169': {
    name: 'Nervape Mask',
    description:
      "A Nervape mask isn't just a disguise; it’s a tool for transformation, anonymity, and endless possibilities.",
    txHashUrl:
      'https://explorer.nervos.org/transaction/0x49ef61ca7384fe83ffe591f486c91347687cc1ff080097ad8a550d04ce1e4a91',
  },
  '0x6e6c9500958d3962d880a50ba792d3a3f408533e10666751a141148a6bf01938': {
    name: 'Nervape Tattoo',
    description:
      'Tattoos tell the story of each Nervape and mark the progress of their journey.',
    txHashUrl:
      'https://explorer.nervos.org/transaction/0x85c7b78684d19106d2f716526c4988bbe22ffc29e2fbc126bf8ba89b8e070e1c',
  },
  '0xc22de62b3933f741e203714a189a2f468779e384fa33307fb9902d11aa648080': {
    name: 'Chinese Mahjong',
    description: 'gūng héi faat chòih',
    txHashUrl:
      'https://explorer.nervos.org/transaction/0x2dc268f530297fa812aceec5ef0d1f401f7519dde7298d151a1888d886154ceb',
  },
};

export const getClusterInfoById = (clusterId: string): ClusterInfo => {
  const id = clusterId.startsWith('0x') ? clusterId : `0x${clusterId}`;
  return clusterData[id];
};
