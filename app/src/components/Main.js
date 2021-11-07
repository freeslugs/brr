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

  const loading = false
  const handleTopUp = null

  useEffect(() => {
    async function fetchMagicLinkUser() {
      const user = await magic.user.getMetadata()
      setUser(user)
    }
    fetchMagicLinkUser()

    async function fetchUsdcBal() {
      const myAccount = (await web3.eth.getAccounts())[0];

      const usdcContract = new web3.eth.Contract(erc20Abi.abi, USDC_ADDRESS)
      const usdcBal = await usdcContract.methods.balanceOf(myAccount).call()
      const usdcDecimals = await usdcContract.methods.decimals().call()
      setUsdcBal(usdcBal / 10**usdcDecimals)

    }
    fetchUsdcBal()
  }, [])


  return (
    <div className="w-full md:w-3/5 mx-auto bg-light-main rounded p-2 md:p-4">
      { loading && <Loading /> } 
      <h1 className="font-bold text-3xl text-light-green">💸 brrrrr finance 💸</h1>
      <div className="">
        <h1 className="font-bold text-orange">{user ? user.email : '...'}</h1>
        <h1 className="font-bold text-orange">{user ? user.publicAddress : '...'}</h1>
      </div>

      <div className="flex mt-4 items-center w-full flex-wrap">
        <h2 className="text-white text-2xl font-bold w-1/2 lg:w-1/3">Balance</h2>
        <h2 className="text-white text-2xl text-white w-1/2 ml-auto lg:ml-0 text-right lg:text-left lg:w-1/3">{usdcBal || '...'} USDC</h2>
        <button className="rounded px-2 py-1 bg-white text-black cursor-pointer w-full lg:w-1/3" onClick={handleTopUp}>Top Up</button>
      </div>

      <TokenList />
    </div>
  );
};

export default Main;
