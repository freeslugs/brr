pragma solidity ^0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SimpleStorage.sol";

contract TestSimpleStorage {
    function testItStoresAValue() public {
        SimpleStorage simpleStorage = SimpleStorage(DeployedAddresses.SimpleStorage());

        address expected = 0x122258d97011141d9fBE419B351F543CdE826231;

        Assert.equal(simpleStorage.addresses()[0], expected, "It should store the address.");
        Assert.equal(simpleStorage.addressesLength(), 1, "It should be right length.");        
    }
}