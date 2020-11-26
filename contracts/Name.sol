// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

contract Name {
	string private name = 'David';

	function getName() public view returns (string memory) {
		return name;
	}

	function setName(string memory newName) public {
		name = newName;
	}
}
