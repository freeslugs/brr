require('dotenv').config()

const path = require("path");
var HDWalletProvider = require("truffle-hdwallet-provider");

var mnemonic = process.env.MNEMONIC
var infuraApiKey = process.env.INFURA_API_KEY
if(!mnemonic) {
  console.log('🚫 Please add MNEMONIC to .env')
}
if(!infuraApiKey) {
  console.log('🚫 Please add INFURA_API_KEY to .env')
}

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  networks: {
    develop: { // default with truffle unbox is 7545, but we can use develop to test changes, ex. truffle migrate --network develop
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    rinkeby: {
      provider: function() { 
       return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/" + infuraApiKey);
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
};