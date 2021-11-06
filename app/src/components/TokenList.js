import React, { useState } from "react";

export default ({ drizzle, drizzleState, initialized }) => {
  const [tokens, setTokens] = useState(null);

  React.useEffect(() => {
    const tokensMock = [
      {name: 'IzumuInu', contract: '0xbedb8258687fb5216e66ab91150d22abc44751c2', 'pair': '0x09ac5a1a7f0f1ed08fdf15bb7ff5f8536ad0d15f', price: '$0.09299149', bal: 0}
      ,{name: 'SDOGEX', contract: '0x1bd32d05247071a08a1817575aa248aef8484501', 'pair': '0x49f3ae4fce8cf1d402f411e7bc391b981fb1c2d4', price: '$0.0000006995', bal: 100}
      ,{name: 'KIZASHI INU', contract: '0xee85de97e98e22163fbfbf2a5a34cf638ef22e71', 'pair': '0x29a370ef2fabe382ab1202f26df7c32756c1b86b', price: '$0.00000002625', bal: 1000000000}
    ]
  
    setTokens(tokensMock)
  }, []);

  const handleApe = token => {
    console.log('LOOK AT THAT GOD CANDLE ', token.contract)
  }

  const handleRug = token => {
    console.log('YEEOAAAAAAAAOWWWW IT WENT TO ZERO ', token.contract)
  }

  const gigaApe = () => {
    console.log('GIGA APE')
  }

  const paperHand = () => {
    console.log('paper hand bitch')
  }

  return (
    <div className="w-full mt-6">
      <button className="rounded px-2 py-1 bg-white text-black cursor-pointer w-full lg:w-1/3 mt-2 bg-light-green text-white" onClick={gigaApe}>Giga Ape</button>
      { tokens && tokens.map(token => {
        return (
          <div className="rounded bg-gray mt-2 flex-col p-2">
            <div className="text-xl flex text-white">
              <h1 className="mr-4 font-bold">{token.name}</h1>
              <h1 className="text-light-green ml-auto md:ml-0">{token.price}</h1>
              <a className="ml-auto text-sm underline cursor-pointer hidden md:block" href={`https://www.dextools.io/app/ether/pair-explorer/${token.pair}`}>Chart</a> 
            </div>
            <div className="flex items-center mt-2 text-white">
              <h1 className="mr-2">Balance</h1>
              <h1 className="font-bold">{token.bal}</h1>

              <div className="ml-auto hidden md:flex">
                <button className="bg-white text-black mr-2 py-1 px-2 rounded" onClick={() => handleApe(token)}>Ape</button>
                <button className="bg-white text-black py-1 px-2 rounded" onClick={() => handleRug(token)}>Rug</button>
              </div>
            </div>
            <div className="w-full flex md:hidden items-center">
            <a className="text-sm text-white underline cursor-pointer block md:hidden" href={`https://www.dextools.io/app/ether/pair-explorer/${token.pair}`}>Chart</a> 
              <button className="bg-white text-black mr-2 py-1 px-2 rounded ml-auto" onClick={() => handleApe(token)}>Ape</button>
              <button className="bg-white text-black py-1 px-2 rounded ml-2" onClick={() => handleRug(token)}>Rug</button>
            </div>
          </div>
        )
        })}
        <button className="rounded px-2 py-1 bg-white text-white cursor-pointer w-full lg:w-1/3 mt-2 bg-red" onClick={paperHand}>Paper Hand</button>
    </div>
  );
};
