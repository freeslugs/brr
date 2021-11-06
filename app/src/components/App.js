import React, { useState } from "react";
import { newContextComponents } from "@drizzle/react-components";
// import erc20Abi from '../contracts/ERC20.json'

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState }) => {
  const [addresses, setAddresses] = useState(null);

  React.useEffect(() => {
    async function fetchData() {
      // const addresses = await drizzle.contracts.SimpleStorage.methods.addresses().call()
      // setAddresses(addresses)
    }
    // fetchData();
  });

  return (
    <div className="w-3/5 mx-auto bg-light-main rounded p-4">
      <h1 className="font-bold text-3xl text-light-green">BRRR FINANCE</h1>
      { addresses && addresses.map(address => 
          <p>{address}</p>
      )}
    </div>
  );
};
