import { images as blockchainImages } from "./data/blockchains"
import { images as protocolImages } from "./data/protocols"
import { result as blockchains } from "./data/queries/blockchains"
import { result as eins } from "./data/queries/1"
import { result as acht } from "./data/queries/8"
import { result as siebenDrei } from "./data/queries/37"
import { result as achtAcht } from "./data/queries/88"
import { result as vierEinsDrei } from "./data/queries/413"
import { result as vierEinsAcht } from "./data/queries/418"

export const getNetworkImage = (networkImage) => {
  return blockchainImages[networkImage];
};

export const getProtocolImage = (protocolImage) => {
  return protocolImages[protocolImage];
};

export const getBlockchains = () => {
  return blockchains;
}

export const getProjects = (networkId) => {
  switch (networkId) {
    case 1:
      return eins;
    case 8:
      return acht;
    case 37:
      return siebenDrei;
    case 88:
      return achtAcht;
    case 413:
      return vierEinsDrei;
    case 418:
      return vierEinsAcht;
    default:
      return [];
  }
}
