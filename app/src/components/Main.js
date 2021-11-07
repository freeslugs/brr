import React, { useState, useEffect, useContext } from "react";
import erc20Abi from '../contracts/ERC20.json'
import TokenList from "./TokenList";
import { Web3Context, MagicContext } from '../MagicContext';

const REDIRECT_URI = 'http://localhost:3000/'
const USDC_ADDRESS = '0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b'

const Loading = () => 
  <div className="w-full flex flex-col items-center content-center">
    <h1 className="text-white"> haha money printer loading</h1>
    <img src="/brr.png"/>
  </div>

const Main = () => {
  const magic = useContext(MagicContext);
  const web3 = useContext(Web3Context);

  const [user, setUser] = useState()
  const [usdcBal, setUsdcBal] = useState()
  const [topModal, setTopModal] = useState()

  const loading = false
  const handleTopUp = null

  async function fetchUsdcBal() {
    const myAccount = (await web3.eth.getAccounts())[0];

    const usdcContract = new web3.eth.Contract(erc20Abi.abi, USDC_ADDRESS)
    const usdcBal = await usdcContract.methods.balanceOf(myAccount).call()
    const usdcDecimals = await usdcContract.methods.decimals().call()
    setUsdcBal((usdcBal / 10**usdcDecimals).toFixed(2))
  }

  useEffect(() => {
    async function fetchMagicLinkUser() {
      const user = await magic.user.getMetadata()
      setUser(user)
    }
    fetchMagicLinkUser()

    fetchUsdcBal()
  }, [])

  const addFunds = () => {
    console.log('adding funds')
  }

  return (
    <div className="w-full md:w-3/5 mx-auto bg-light-main rounded p-2 md:p-4">
      { loading && <Loading /> } 

      {topModal &&
        <div className="absolute top-0 left-0 h-screen w-screen bg-filter p-2">
          <h1 className="font-bold p-4 text-xl cursor-pointer text-white absolute top-0 left-0" onClick={() => setTopModal(false)}>X</h1>
          <div className="w-full md:w-2/5 mx-auto bg-light-main rounded p-4 mt-10 md:p-4 text-center flex flex-col">
            <button className="bg-white text-black text-xl w-1/3 mx-auto rounded" onClick={() => addFunds('venmo')}>Venmo</button>
            <button className="bg-white text-black text-xl w-1/3 mx-auto rounded mt-4" onClick={() => addFunds('circle')}>Circle</button>
            <button className="bg-white text-black text-xl w-1/3 mx-auto rounded mt-4" onClick={() => addFunds('paypal')}>PayPal</button>
          </div>
        </div>
      } 

      <h1 className="font-bold text-3xl text-light-green">💸 brrrrr finance 💸</h1>
      <div className="">
        <h1 className="font-bold text-orange">{user ? user.email : '...'}</h1>
        <h1 className="font-bold text-orange">{user ? user.publicAddress : '...'}</h1>
      </div>

      <div className="flex mt-4 items-center w-full flex-wrap">
        <h2 className="text-white text-2xl font-bold w-1/2 lg:w-1/3">Balance</h2>
        <h2 className="text-white text-2xl text-white w-1/2 ml-auto lg:ml-0 text-right lg:text-left lg:w-1/3">{usdcBal || '...'} USDC</h2>
        <button className="rounded px-2 py-1 bg-white text-black cursor-pointer w-full lg:w-1/3" onClick={() => setTopModal(true)}>Top Up</button>
      </div>

      <TokenList refreshUSDC={fetchUsdcBal}/>
    </div>
  );
};

export default Main;
