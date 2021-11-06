import React, { useState } from "react";

export default ({ drizzle, drizzleState, initialized }) => {
  const [tokens, setTokens] = useState(null);

  React.useEffect(() => {
    const tokensMock = [
      {name: 'IzumuInu', contract: '0xbedb8258687fb5216e66ab91150d22abc44751c2', 'pair': '0x09ac5a1a7f0f1ed08fdf15bb7ff5f8536ad0d15f', price: '$0.09299149', bal: 0}
      ,{name: 'IzumuInu2', contract: '0xbedb8258687fb5216e66ab91150d22abc44751c2', 'pair': '0x09ac5a1a7f0f1ed08fdf15bb7ff5f8536ad0d15f', price: '$0.19299149', bal: 100}
      ,{name: 'IzumuIn3', contract: '0xbedb8258687fb5216e66ab91150d22abc44751c2', 'pair': '0x09ac5a1a7f0f1ed08fdf15bb7ff5f8536ad0d15f', price: '$0.29299149', bal: 1000000000}
    ]
  
    setTokens(tokensMock)
  }, []);

  return (
    <div className="w-full mt-6">
      <h1 className="">Shitcoins</h1>
      { tokens && tokens.map(token => {
        return (
          <div className="rounded bg-gray mt-2 flex-col p-2">
            <div className="text-xl flex text-white">
              <h1 className="mr-4 font-bold">{token.name}</h1>
              <h1 className="text-light-green">{token.price}</h1>
              <a className="ml-auto text-sm underline cursor-pointer" href={`https://www.dextools.io/app/ether/pair-explorer/${token.pair}`}>Paint the Chart</a> 
            </div>
            <div className="flex">
              <h1 className="mr-2 font-bold text-grey-560">Balance</h1>
              <h1 className="">{token.bal}</h1>
            </div>
            <div>
              <button></button>
              <button></button>
            </div>
          </div>
        )
        })}
    </div>
  );
};
