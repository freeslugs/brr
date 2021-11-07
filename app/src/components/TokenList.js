import React, { useState, useEffect, useContext } from "react";
import { ChainId, UniswapPair } from 'simple-uniswap-sdk';
import { Web3Context, MagicContext } from '../MagicContext';

const USDC_ADDRESS = '0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b'

export default () => {

  const initTokens = {
    "0x8A1D5E9189e23B79e193AE69386f2cc43a12DCd7": {},
    "0x6d91d94a3a327b13b369797821307efda9b28a8e": {},
    "0x20390573D9041e9dbFE19446662799a35501546f": {},
    "0x9315ABD2D21196d1Ed767A63C2BAdaCC3ee3f64f": {},
  }
  const [tokens, setTokens] = useState(initTokens);
  const magic = useContext(MagicContext);
  const web3 = useContext(Web3Context);

  async function fetchTokens() {
    const myAccount = (await web3.eth.getAccounts())[0];

    const updatedTokens = await Promise.all(Object.keys(initTokens).map(async(address) => {
      const uniswapPair = new UniswapPair({
        fromTokenContractAddress: address,
        toTokenContractAddress: USDC_ADDRESS,
        ethereumAddress: myAccount,
        chainId: 4 // parseInt(web3.currentProvider.chainId)
      });

      const uniswapPairFactory = await uniswapPair.createFactory();
      const trade = await uniswapPairFactory.trade('1');

      // // subscribe to quote changes this is just in example so your dont miss it
      // trade.quoteChanged$.subscribe((value) => {
      //   console.log('tokens')
      //   console.log(tokens)
      //   console.log('value.fromToken.contractAddress')
      //   console.log(value.fromToken.contractAddress)
      //   tokens[value.fromToken.contractAddress].price = value.minAmountConvertQuote
      //   setTokens(tokens)
      // });

      return { 
        price: trade.minAmountConvertQuote,
        bal: parseFloat(trade.fromBalance.balance).toFixed(2),
        // name: trade.fromToken.name,
        name: trade.fromToken.symbol,
        address: address
      }
    }))
  
    setTokens(updatedTokens)
  }

  useEffect(() => {
    fetchTokens()
  }, [])

  const handleApe = async (token) => {
    console.log(`APEing into ${token.name}`)
    const myAccount = (await web3.eth.getAccounts())[0];

    const uniswapPair = new UniswapPair({
      fromTokenContractAddress: USDC_ADDRESS,
      toTokenContractAddress: token.address,
      ethereumAddress: myAccount,
      chainId: 4 // parseInt(web3.currentProvider.chainId)
    });

    const uniswapPairFactory = await uniswapPair.createFactory();
    const trade = await uniswapPairFactory.trade(1);

    if (trade.approvalTransaction) {
      const approved = await web3.eth.sendTransaction(trade.approvalTransaction);
    }

    const tradeTransaction = await web3.eth.sendTransaction(trade.transaction);
    trade.destroy();
    fetchTokens()
  }

  const handleRug = async (token) => {
    console.log(`ape token: ${JSON.stringify(token)}`)
    const myAccount = (await web3.eth.getAccounts())[0];
  }

  return (
    <div className="w-full mt-6">
      <button className="rounded px-2 py-1 bg-white text-black cursor-pointer w-full lg:w-1/3 mt-2 bg-light-green text-white" onClick={'gigaApe'}>Giga Ape</button>
      { tokens && Object.keys(tokens).map(address => {
        const token = tokens[address]

        return (
          <div className="rounded bg-gray mt-2 flex-col p-2" key={address}>
            <div className="text-xl flex text-white">
              <h1 className="mr-4 font-bold">{token.name || '...'}</h1>
              <h1 className="text-light-green ml-auto md:ml-0">${token.price || '...'}</h1>
              <a className="ml-auto text-sm underline cursor-pointer hidden md:block" href={`https://www.dextools.io/app/ether/pair-explorer/${token.pair}`}>Chart</a> 
            </div>
            <div className="flex items-center mt-2 text-white">
              <h1 className="mr-2">Balance</h1>
              <h1 className="font-bold">{token.bal || '...'}</h1>

              <div className="ml-auto hidden md:flex">
                <button className="bg-white text-black mr-2 py-1 px-2 rounded" onClick={() => handleApe(token)}>Ape</button>
                <button className="bg-white text-black py-1 px-2 rounded" onClick={() => handleRug(token)}>Rug</button>
              </div>
            </div>
            <div className="w-full flex md:hidden items-center">
            <a className="text-sm text-white underline cursor-pointer block md:hidden" href={`https://www.dextools.io/app/ether/pair-explorer/${token.pair}`}>Chart</a> 
              <button className="bg-white text-black mr-2 py-1 px-2 rounded ml-auto" /*onClick={() => handleApe(token)}*/>Ape</button>
              <button className="bg-white text-black py-1 px-2 rounded ml-2" /*onClick={() => handleRug(token)}*/>Rug</button>
            </div>
          </div>
        )
      })}
      <button className="rounded px-2 py-1 bg-white text-white cursor-pointer w-full lg:w-1/3 mt-2 bg-red" /*onClick={paperHand}*/>Paper Hand</button>
    </div>
  );
}