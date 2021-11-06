import React, { useState, useEffect } from "react";
import erc20Abi from '../contracts/ERC20.json'
import { Magic } from "magic-sdk";

import TokenList from "./TokenList";

const REDIRECT_URI = 'http://localhost:3000/'

export default ({ drizzle, drizzleState, initialized }) => {
  const [addresses, setAddresses] = useState(null);
  const [usdcBal, setUsdcBal] = useState(0);
  const [topModal, setTopModal] = useState(null)
  const [loginModal, setLoginModal] = useState(null)
  const [email, setEmail] = useState('')
  const [user, setUser] = useState(null)
  const magic = new Magic('pk_live_925E22A1B237DBBB')

  // http://localhost:3000/?magic_credential=WyIweDczMGJlMGQwZGZkOTEwNmZmMmJiNWIwNzg4NjhmMjc0MGJlNmFmMzExZThiODE2ZWU1YzkyODYzNjYwNDY0MzM3MDY1MjliNDcxMDhmMTUyMmYzMTc3ODkyYTAxODM3ZTEzZTQzOTE1M2Q5ZTY0NWYxNTIyNDU4ZDBiNmE2ZWZmMWIiLCJ7XCJpYXRcIjoxNjM2MzI2Mzc4LFwiZXh0XCI6MTYzNjMyNzI3OCxcImlzc1wiOlwiZGlkOmV0aHI6MHgyZTU3NUVkOTQ3QjI2N0I4ZjhFMGRiY2I5MjNlRjZCYmI5NTBkMzkxXCIsXCJzdWJcIjpcIlZ5MEp4clFTTURhSV9rZ2dJY1FvM2pLaXd5cDhqOWF3ZmtYdGRTUlVfOHM9XCIsXCJhdWRcIjpcInJOZVlYaG52UjBXc29ZczNBckNGYlFYLUUyY19pNjFjV2hlTzdLMF9WQnc9XCIsXCJuYmZcIjoxNjM2MzI2Mzc4LFwidGlkXCI6XCIxODc4NmJiMy01MjE2LTQ0NTctYjkwMi1kMDExNjQzZDg0MGFcIixcImFkZFwiOlwiMHhkZmI5Y2VkZWRkZTQ4MWUxYjFkN2QzNDk4NmQxMjljNjg3ZDdhMWJmMzE4ZDQ0ZGViYzkzYjQwYjVlZWU4ODJiNTA1ZWFmZTc5OWYzNWU2YzhjNmZiNDA1MTZkNTdmNGNhODUyMmVjY2YyYmFiYjcwODM1MTY0ODBlZWM0YzVmODFiXCJ9Il0%3D
  useEffect(() => { 
    async function fetchData() {
      const addresses = await drizzle.contracts.SimpleStorage.methods.addresses().call()
      setAddresses(addresses)

      const myAccount = (await drizzle.web3.eth.getAccounts())[0];
      console.log(`myAccount: ${myAccount}`)
      const usdcBal = await drizzle.contracts.USDC.methods.balanceOf(myAccount).call()
      const usdcDecimals = await drizzle.contracts.USDC.methods.decimals().call()
      setUsdcBal(usdcBal / 10**usdcDecimals)
      console.log(`usdc bal: ${(usdcBal / 10**usdcDecimals)}`)
    }

    async function magicLink() {
      const isLoggedIn = await magic.user.isLoggedIn();
      
      if (isLoggedIn) {
        const user = await magic.user.getMetadata()
        setUser(user)
      } else {
        const query = window?.location?.search
        const [, magicCred] = query.split('magic_credential=')
        // TODO HANDLE FAILURE MORE GRACEFULLY HERE
        if (magicCred) {
          try {
            const user = await magic.auth.loginWithCredential(magicCred)
            setUser(user)
          } catch (e) {
            setLoginModal(true)  
          }
        } else {
          setLoginModal(true)
        }
      }
    }

    magicLink();

    if(initialized) {
      const usdcContract = new drizzle.web3.eth.Contract(erc20Abi.abi, "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b")
      drizzle.addContract({ contractName: "USDC", web3Contract: usdcContract })

      fetchData();    
    }
  },[initialized]);

  const handleTopUp = () => {
    setTopModal(true)
  }

  const addFunds = provider => {
    setUsdcBal(usdcBal + 500)
    console.log('add funds from: ', provider)
    setTopModal(false)
  }

  const login = async () => {
    await magic.auth.loginWithMagicLink({email, showUI: true, redirectURI: REDIRECT_URI})
  }

  const handleText = e => {
    setEmail(e.target.value)
  }

  console.log('user: ', user)
  const formatAddy = () => {
    const first5 = user.publicAddress.slice(0, 5)
    const last4 = user.publicAddress.slice(-4)
    return `${first5}....${last4}`
  }

  return (
    <>
    <div className="w-full md:w-3/5 mx-auto bg-light-main rounded p-2 md:p-4">
      {/* { !initialized ? 
        <div className="w-full flex flex-col items-center content-center">
          <h1 className="text-white"> haha money printer loading</h1>
          <img 
            src="/brr.png"/>
        </div>
      : */}
      <>
        <h1 className="font-bold text-3xl text-light-green">💸 brrrrr finance 💸</h1>
        { user ?
          <div className="flex flex-col">
            <h1 className="rounded-lg p-1 border-2 border-white">{formatAddy()}</h1>
            <h1 className="rounded-lg p-1">{user.email}</h1>
          </div>
          : 
          <button className="rounded px-2 py-1 bg-white text-black cursor-pointer w-full lg:w-1/3" onClick={() => setLoginModal(true)}>Login</button>
        }

        <div className="flex mt-4 items-center w-full flex-wrap">
          <h2 className="text-white text-2xl font-bold w-1/2 lg:w-1/3">Balance</h2>
          <h2 className="text-white text-2xl text-white w-1/2 ml-auto lg:ml-0 text-right lg:text-left lg:w-1/3">{usdcBal} USDC</h2>
          <button className="rounded px-2 py-1 bg-white text-black cursor-pointer w-full lg:w-1/3" onClick={handleTopUp}>Top Up</button>
        </div>

        <TokenList setUsdcBal={setUsdcBal}/>
      </>
      {/* } */}
    </div>

    {topModal ?
      <div className="absolute top-0 left-0 h-screen w-screen bg-filter p-2">
        <h1 className="font-bold p-4 text-xl cursor-pointer text-white absolute top-0 left-0" onClick={() => setTopModal(false)}>X</h1>
        <div className="w-full md:w-2/5 mx-auto bg-light-main rounded p-4 mt-10 md:p-4 text-center flex flex-col">
          <button className="bg-white text-black text-xl w-1/3 mx-auto rounded" onClick={() => addFunds('venmo')}>Venmo</button>
          <button className="bg-white text-black text-xl w-1/3 mx-auto rounded mt-4" onClick={() => addFunds('circle')}>Circle</button>
          <button className="bg-white text-black text-xl w-1/3 mx-auto rounded mt-4" onClick={() => addFunds('paypal')}>PayPal</button>
        </div>
      </div>
    : null}

    {loginModal ?
      <div className="absolute top-0 left-0 h-screen w-screen bg-filter p-2">
        <h1 className="font-bold p-4 text-xl cursor-pointer text-white absolute top-0 left-0" onClick={() => setLoginModal(false)}>X</h1>
        <div className="w-80 md:w-2/5 mx-auto bg-light-main rounded p-4 mt-10 md:p-4 text-center flex flex-col">
          <div class="mb-4">
              <input 
                  placeholder="Email"
                  class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username" 
                  type="text"
                  value={email} 
                  onChange={handleText}/>
          </div>
          <button className="bg-white text-black text-xl mx-auto rounded w-full" onClick={login}>Login with magiclink</button>
        </div>
      </div>
    : null}
    </>
  );
};
