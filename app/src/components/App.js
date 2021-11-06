import React, { useState } from "react";
import { newContextComponents } from "@drizzle/react-components";
import erc20Abi from '../contracts/ERC20.json'

import Shitcoins from './TokenList'
import TokenList from "./TokenList";

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState, initialized }) => {
  const [addresses, setAddresses] = useState(null);
  // TODO: UNHARDCODE usdc bal
  const [usdcBal, setUsdcBal] = useState(500);

  React.useEffect(() => {
    // async function fetchData() {
    //   const addresses = await drizzle.contracts.SimpleStorage.methods.addresses().call()
    //   setAddresses(addresses)
    // }
    // fetchData();
  });

  const handleTopUp = () => {
    console.log('top up')
  }

  return (
    <div className="w-full md:w-3/5 mx-auto bg-light-main rounded p-2 md:p-4">
      {/* { !initialized ? 
        <img src="./brrrrr.png"/>
      : */}
      <>
        <h1 className="font-bold text-3xl text-light-green">brrrrr Finance</h1>
        <div className="flex mt-4 items-center w-full flex-wrap">
          <h2 className="text-white text-2xl font-bold w-1/2 lg:w-1/3">Balance</h2>
          <h2 className="text-white text-2xl text-white w-1/2 ml-auto lg:ml-0 text-right lg:text-left lg:w-1/3">{usdcBal} USDC</h2>
          <button className="rounded px-2 py-1 bg-white text-black cursor-pointer w-full lg:w-1/3" onClick={handleTopUp}>Top Up</button>
        </div>

        <TokenList setUsdcBal={setUsdcBal}/>
      </>
    </div>
  );
};
