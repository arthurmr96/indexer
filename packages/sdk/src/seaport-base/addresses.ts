import { ChainIdToAddress, Network } from "../utils";

export const OpenseaConduitKey: ChainIdToAddress = {
  [Network.Ethereum]: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
  [Network.EthereumGoerli]: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
  [Network.Optimism]: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
  [Network.Gnosis]: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
  [Network.Polygon]: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
  [Network.PolygonMumbai]: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
  [Network.Arbitrum]: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
  [Network.Avalanche]: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
  [Network.AvalancheFuji]: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
};

export const ReservoirConduitKey: ChainIdToAddress = {
  [Network.Ethereum]: "0xf3d63166f0ca56c3c1a3508fce03ff0cf3fb691e000000000000000000000000",
  [Network.EthereumGoerli]: "0xf3d63166f0ca56c3c1a3508fce03ff0cf3fb691e000000000000000000000000",
  [Network.Optimism]: "0xf3d63166f0ca56c3c1a3508fce03ff0cf3fb691e000000000000000000000000",
  [Network.Gnosis]: "0xf3d63166f0ca56c3c1a3508fce03ff0cf3fb691e000000000000000000000000",
  [Network.Polygon]: "0xf3d63166f0ca56c3c1a3508fce03ff0cf3fb691e000000000000000000000000",
  [Network.PolygonMumbai]: "0xf3d63166f0ca56c3c1a3508fce03ff0cf3fb691e000000000000000000000000",
  [Network.Arbitrum]: "0xf3d63166f0ca56c3c1a3508fce03ff0cf3fb691e000000000000000000000000",
  [Network.Avalanche]: "0xf3d63166f0ca56c3c1a3508fce03ff0cf3fb691e000000000000000000000000",
  [Network.AvalancheFuji]: "0xf3d63166f0ca56c3c1a3508fce03ff0cf3fb691e000000000000000000000000",
};

export const OriginConduitKey: ChainIdToAddress = {
  [Network.Ethereum]: "0x52b868f7b0d20b689d059ab141677c673d5d2b7e000000000000000000000000",
  [Network.EthereumGoerli]: "0x52b868f7b0d20b689d059ab141677c673d5d2b7e000000000000000000000000",
  [Network.Polygon]: "0x52b868f7b0d20b689d059ab141677c673d5d2b7e000000000000000000000000",
};

export const ConduitController: ChainIdToAddress = {
  [Network.Ethereum]: "0x00000000f9490004c11cef243f5400493c00ad63",
  [Network.EthereumGoerli]: "0x00000000f9490004c11cef243f5400493c00ad63",
  [Network.Optimism]: "0x00000000f9490004c11cef243f5400493c00ad63",
  [Network.Gnosis]: "0x00000000f9490004c11cef243f5400493c00ad63",
  [Network.Polygon]: "0x00000000f9490004c11cef243f5400493c00ad63",
  [Network.PolygonMumbai]: "0x00000000f9490004c11cef243f5400493c00ad63",
  [Network.Arbitrum]: "0x00000000f9490004c11cef243f5400493c00ad63",
  [Network.Avalanche]: "0x00000000f9490004c11cef243f5400493c00ad63",
  [Network.AvalancheFuji]: "0x00000000f9490004c11cef243f5400493c00ad63",
};

// https://github.com/ProjectOpenSea/seaport/blob/0a8e82ce7262b5ce0e67fa98a2131fd4c47c84e9/contracts/conduit/ConduitController.sol#L493
export const ConduitControllerCodeHash: ChainIdToAddress = {
  [Network.Ethereum]: "0x023d904f2503c37127200ca07b976c3a53cc562623f67023115bf311f5805059",
  [Network.EthereumGoerli]: "0x023d904f2503c37127200ca07b976c3a53cc562623f67023115bf311f5805059",
  [Network.Optimism]: "0x023d904f2503c37127200ca07b976c3a53cc562623f67023115bf311f5805059",
  [Network.Gnosis]: "0x023d904f2503c37127200ca07b976c3a53cc562623f67023115bf311f5805059",
  [Network.Polygon]: "0x023d904f2503c37127200ca07b976c3a53cc562623f67023115bf311f5805059",
  [Network.PolygonMumbai]: "0x023d904f2503c37127200ca07b976c3a53cc562623f67023115bf311f5805059",
  [Network.Arbitrum]: "0x023d904f2503c37127200ca07b976c3a53cc562623f67023115bf311f5805059",
  [Network.Avalanche]: "0x023d904f2503c37127200ca07b976c3a53cc562623f67023115bf311f5805059",
  [Network.AvalancheFuji]: "0x023d904f2503c37127200ca07b976c3a53cc562623f67023115bf311f5805059",
};

export const OperatorFilterRegistry: ChainIdToAddress = {
  [Network.Ethereum]: "0x000000000000aaeb6d7670e522a718067333cd4e",
  [Network.EthereumGoerli]: "0x000000000000aaeb6d7670e522a718067333cd4e",
  [Network.Optimism]: "0x000000000000aaeb6d7670e522a718067333cd4e",
  [Network.Gnosis]: "0x000000000000aaeb6d7670e522a718067333cd4e",
  [Network.Polygon]: "0x000000000000aaeb6d7670e522a718067333cd4e",
  [Network.PolygonMumbai]: "0x000000000000aaeb6d7670e522a718067333cd4e",
  [Network.Arbitrum]: "0x000000000000aaeb6d7670e522a718067333cd4e",
  [Network.Avalanche]: "0x000000000000aaeb6d7670e522a718067333cd4e",
  [Network.AvalancheFuji]: "0x000000000000aaeb6d7670e522a718067333cd4e",
};