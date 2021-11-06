// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract SimpleStorage {
    // Add the library methods
    using EnumerableSet for EnumerableSet.AddressSet;

    event StorageSet(string _message);

    // Declare a set state variable
    EnumerableSet.AddressSet private _addresses;

    uint256 public storedData;

    constructor() {
        _addresses.add(0x122258d97011141d9fBE419B351F543CdE826231);
    }

    function addressesLength() public view returns (uint256) {
        return _addresses.length();
    }

    function addresses() public view returns (address[] memory) {
        return _addresses.values();
    }

    function set(uint256 x) public {
        storedData = x;

        emit StorageSet("Data stored successfully!");
    }
}
