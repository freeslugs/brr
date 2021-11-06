const SimpleStorage = artifacts.require("SimpleStorage");
const TutorialToken = artifacts.require("TutorialToken"); 
// const ComplexStorage = artifacts.require("ComplexStorage");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(TutorialToken, web3.utils.toBN("10050000000000000000000000"));
  // deployer.deploy(ComplexStorage);
};
