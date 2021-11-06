import React, { useState, useEffect } from "react";
import erc20Abi from '../contracts/ERC20.json'
import { Magic } from "magic-sdk";

import Shitcoins from './TokenList'
import TokenList from "./TokenList";

const USDC_ADDRESS = '0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b'

export default ({ drizzle, drizzleState, initialized }) => {
  const [addresses, setAddresses] = useState(null);
  const [usdcBal, setUsdcBal] = useState(0);

  useEffect(() => { 
    async function fetchData() {
      // const addresses = await drizzle.contracts.SimpleStorage.methods.addresses().call()
      // setAddresses(addresses)

      const myAccount = (await drizzle.web3.eth.getAccounts())[0];
      const usdcBal = await drizzle.contracts.USDC.methods.balanceOf(myAccount).call()
      const usdcDecimals = await drizzle.contracts.USDC.methods.decimals().call()
      setUsdcBal(usdcBal / 10**usdcDecimals)
    }

    async function magicLink() {
      const magic = new Magic('pk_live_925E22A1B237DBBB')
      const isLoggedIn = await magic.user.isLoggedIn();
      console.log('loggedd in?? ')
      console.log(isLoggedIn)
    }

    // magicLink();

    if(initialized) {
      console.log('initialized, fetch USDC')
      const usdcContract = new drizzle.web3.eth.Contract(erc20Abi.abi, USDC_ADDRESS)
      drizzle.addContract({ contractName: "USDC", web3Contract: usdcContract })

      fetchData();    
    }
  },[initialized]);

  const handleTopUp = () => {
    console.log('top up')
  }

  return (
    <div className="w-full md:w-3/5 mx-auto bg-light-main rounded p-2 md:p-4">
      {/* { !initialized ? 
        <img src="./brrrrr.png"/>
      : */}
      <>
        <h1 className="font-bold text-3xl text-light-green">💸 brrrrr finance 💸</h1>
        <div className="flex mt-4 items-center w-full flex-wrap">
          <h2 className="text-white text-2xl font-bold w-1/2 lg:w-1/3">Balance</h2>
          <h2 className="text-white text-2xl text-white w-1/2 ml-auto lg:ml-0 text-right lg:text-left lg:w-1/3">{usdcBal} USDC</h2>
          <button className="rounded px-2 py-1 bg-white text-black cursor-pointer w-full lg:w-1/3" onClick={handleTopUp}>Top Up</button>
        </div>

        <TokenList setUsdcBal={setUsdcBal} drizzle={drizzle} drizzleState={drizzleState} initialized={initialized}/>
      </>
    </div>
  );
};
