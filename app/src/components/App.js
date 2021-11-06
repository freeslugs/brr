import React, { useState, useEffect } from "react";
import erc20Abi from '../contracts/ERC20.json'

export default ({ drizzle, drizzleState, initialized }) => {
  const [addresses, setAddresses] = useState(null);
  const [usdcBal, setUsdcBal] = useState(null);

  useEffect(() => { 
    async function fetchData() {
      const addresses = await drizzle.contracts.SimpleStorage.methods.addresses().call()
      setAddresses(addresses)

      const myAccount = (await drizzle.web3.eth.getAccounts())[0];
      console.log(`myAccount: ${myAccount}`)
      const usdcBal = await drizzle.contracts.USDC.methods.balanceOf(myAccount).call()
      const usdcDecimals = await drizzle.contracts.USDC.methods.decimals().call()
      setUsdcBal(usdcBal / 10**usdcDecimals)
      console.log(`usdc bal: ${(usdcBal / 10**usdcDecimals)}`)
    }
    if(initialized) {
      const usdcContract = new drizzle.web3.eth.Contract(erc20Abi.abi, "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b")
      drizzle.addContract({ contractName: "USDC", web3Contract: usdcContract })

      fetchData();    
    }
  },[initialized]);

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
