import React, { createContext } from "react";
import { Magic } from "magic-sdk";
import Web3 from 'web3';

const magic = new Magic('pk_live_925E22A1B237DBBB', {
  network:  {
    rpcUrl: 'https://rinkeby.infura.io/v3/53513b65120149818318397e817df238',
    chainId: 4,
  }
})
const web3 = new Web3(magic.rpcProvider);

export const Web3Context = createContext(web3);
export const MagicContext = createContext(magic);

