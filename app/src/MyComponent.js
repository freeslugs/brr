import React, { useState } from "react";
import { newContextComponents } from "@drizzle/react-components";
import logo from "./logo.png";
import erc20Abi from './contracts/ERC20.json'

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState }) => {
  const [addresses, setAddresses] = useState(null);

  React.useEffect(() => {
    async function fetchData() {
      const addresses = await drizzle.contracts.SimpleStorage.methods.addresses().call()
      setAddresses(addresses)
    }
    fetchData();
  });

  return (
    <div className="App">
      <div className="section">
        <h2>buy meme tokens</h2>
        
        { addresses && addresses.map(address => 
          <p>{address}</p>
        )}
      </div>
    </div>
  );
};
