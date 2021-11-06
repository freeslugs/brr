import React, { useState } from "react";
import { newContextComponents } from "@drizzle/react-components";
import erc20Abi from '../contracts/ERC20.json'

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState, initialized }) => {
  const [addresses, setAddresses] = useState(null);
  // TODO: UNHARDCODE UPON 3RD PT INTEGRATION
  const [usdcBal, setUsdcBal] = useState(500);

  React.useEffect(() => {
    // async function fetchData() {
    //   const addresses = await drizzle.contracts.SimpleStorage.methods.addresses().call()
    //   setAddresses(addresses)
    // }
    // fetchData();
  });

  return (
    <div className="w-3/5 mx-auto bg-light-main rounded p-4">
      { !initialized ? 
        <img src="./brrrrr.png"/>
      :
      <>
        <h1 className="font-bold text-3xl text-light-green">brrrrr Finance</h1>
        <div className="flex mt-4 items-center flex-wrap">
          <h2 className="text-white text-2xl font-bold w-1/2 lg:w-1/3">Balance</h2>
          <h2 className="text-white text-2xl text-white w-1/2 lg:w-1/3">{usdcBal} USDC</h2>
          <button className="rounded px-2 py-1 bg-orange text-white cursor-pointer lg:w-1/3">Top Up</button>
        </div>
      </>
      }
    </div>
  );
};
