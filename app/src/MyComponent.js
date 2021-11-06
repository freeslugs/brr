import React, { useState } from "react";
import { newContextComponents } from "@drizzle/react-components";
import logo from "./logo.png";
import erc20Abi from './contracts/ERC20.json'

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState }) => {
  const [addresses, setAddresses] = useState(null);
  const [usdcBalance, setUSDCBalance] = useState(null);

  React.useEffect(() => {
    const usdcContract = new drizzle.web3.eth.Contract(erc20Abi.abi, "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b")
    drizzle.addContract({ contractName: "USDC", web3Contract: usdcContract })

    async function fetchData() {
      const addresses = await drizzle.contracts.SimpleStorage.methods.addresses().call()
      setAddresses(addresses)

      const myAccount = (await drizzle.web3.eth.getAccounts())[0];
      
      const usdcBalance = await drizzle.contracts.USDC.methods.balanceOf(myAccount).call()
      const usdcDecimals = await drizzle.contracts.USDC.methods.decimals().call()
      setUSDCBalance(usdcBalance / 10**usdcDecimals)
    }
    fetchData();    
  },[]);

  return (
    <div className="App">
      <div className="section">
        <p>USDC balance {usdcBalance}</p>
        <h2>buy meme tokens</h2>
        
        { addresses && addresses.map(address => 
          <p key={address}>{address}</p>
        )}
      </div>
    </div>
  );
};
