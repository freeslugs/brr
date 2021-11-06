import Web3 from "web3";
// import ComplexStorage from "./contracts/ComplexStorage.json";
import SimpleStorage from "./contracts/SimpleStorage.json";
import TutorialToken from "./contracts/TutorialToken.json";
import { Magic } from 'magic-sdk';

// const magic = new Magic('pk_live_925E22A1B237DBBB', { network: 'rinkeby' });

const options = {
  web3: {
    // block: false,
    // customProvider: new Web3(magic.rpcProvider)
  },
  contracts: [SimpleStorage, TutorialToken],
  events: {
    SimpleStorage: ["StorageSet"],
  },
};

export default options;
