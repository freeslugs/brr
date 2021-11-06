import React, { useState, useEffect } from "react";
import { ChainId, UniswapPair } from 'simple-uniswap-sdk';

const USDC_ADDRESS = '0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b'

export default ({ drizzle, drizzleState, initialized }) => {

  // { 
  //   "0x8A1D5E9189e23B79e193AE69386f2cc43a12DCd7": { 
  //     price
  //     balance
  //     ...
  //   }
  // }

  const initTokens = {
    "0x8A1D5E9189e23B79e193AE69386f2cc43a12DCd7": null
  }
  const [tokens, setTokens] = useState(initTokens);

  useEffect(() => {
    async function fetchData() {
      const myAccount = (await drizzle.web3.eth.getAccounts())[0];

      Object.keys(tokens).map(async(address) => {
        const uniswapPair = new UniswapPair({
          fromTokenContractAddress: address,
          toTokenContractAddress: USDC_ADDRESS,
          ethereumAddress: myAccount,
          chainId: parseInt(drizzle.web3.currentProvider.chainId)
        });

        const uniswapPairFactory = await uniswapPair.createFactory();
        const trade = await uniswapPairFactory.trade('1');


        tokens[address] = { 
          price: trade.minAmountConvertQuote,
          bal: trade.fromBalance.balance,
          // name: trade.fromToken.name,
          name: trade.fromToken.symbol
        }

        setTokens(tokens)
        // console.log(tokens)

        // subscribe to quote changes this is just in example so your dont miss it
        // trade.quoteChanged$.subscribe((value) => {
        //   console.log(`new value for trade: ${value}`)
        // });
      })
    }

    console.log(`initialized: ${initialized}`)
    if(initialized) {
      console.log('initialized, fetch ')
      fetchData()
    }
  }, [initialized]);

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


  console.log('render')


  return (
    <div className="w-full mt-6">
      <button className="rounded px-2 py-1 bg-white text-black cursor-pointer w-full lg:w-1/3 mt-2 bg-light-green text-white" onClick={gigaApe}>Giga Ape</button>
      { tokens && Object.keys(tokens).map(address => {
        const token = tokens[address] || {}

        return (
          <div className="rounded bg-gray mt-2 flex-col p-2">
            <div className="text-xl flex text-white">
              <h1 className="mr-4 font-bold">{token.name}</h1>
              <h1 className="text-light-green ml-auto md:ml-0">${token.price}</h1>
              <a className="ml-auto text-sm underline cursor-pointer hidden md:block" href={`https://www.dextools.io/app/ether/pair-explorer/${token.pair}`}>Chart</a> 
            </div>
            <div className="flex items-center mt-2">
              <h1 className="mr-2 font-bold text-grey-560">Balance</h1>
              <h1 className="">{token.bal}</h1>

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
