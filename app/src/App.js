import React, {useEffect, createContext, useContext, useState } from "react";
import Main from "./components/Main";

import { MagicContext } from './MagicContext';

import "./App.css";
const REDIRECT_URI = 'http://localhost:3000/'

const App = () => {
  const magic = useContext(MagicContext);
  const [loadingLogin, setLoadingLogin] = useState(true)
  const [loginModal, setLoginModal] = useState(false)
  const [email, setEmail] = useState('')

  async function magicLink() {
    const isLoggedIn = await magic.user.isLoggedIn();
    
    if (isLoggedIn) {
      const user = await magic.user.getMetadata()
      console.log('we are logged in')
      setLoadingLogin(false)
    } else {
      console.log('we are not logged in')

      const query = window?.location?.search
      const [, magicCred] = query.split('magic_credential=')
      console.log(`magicCred: ${magicCred}`)
        // TODO HANDLE FAILURE MORE GRACEFULLY HERE
      if (magicCred) {
        try {
          const user = await magic.auth.loginWithCredential(magicCred)
          setLoadingLogin(false)
        } catch (e) {
          window.location.reload();

          setLoginModal(true)
          setLoadingLogin(false)
        }
      } else {
        setLoginModal(true)
        setLoadingLogin(false)
      }
    }
  }

  useEffect(() => {
    console.log('use useEffect')
    magicLink()
  }, [])

  const login = async () => {
    await magic.auth.loginWithMagicLink({email, showUI: true, redirectURI: REDIRECT_URI})
  }

  const handleText = e => {
    setEmail(e.target.value)
  }

  return (
    <div className="min-h-screen min-w-screen bg-main px-2 md:px-6 py-4 relative">
      { !loadingLogin && !loginModal && <Main /> }

      {loginModal &&
        <div className="absolute top-0 left-0 h-screen w-screen bg-filter p-2">
          <h1 className="font-bold p-4 text-xl cursor-pointer text-white absolute top-0 left-0" onClick={() => setLoginModal(false)}>X</h1>
          <div className="w-80 md:w-2/5 mx-auto bg-light-main rounded p-4 mt-10 md:p-4 text-center flex flex-col">
            <div className="mb-4">
              <input 
                  placeholder="Email"
                  className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username" 
                  type="text"
                  value={email} 
                  onChange={handleText}/>
            </div>
            <button className="bg-white text-black text-xl mx-auto rounded w-full" onClick={login}>Login with magiclink</button>
          </div>
        </div>
      }
    </div>  
  );
}

export default App;
