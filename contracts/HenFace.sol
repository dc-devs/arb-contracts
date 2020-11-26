// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract HenFace is ERC20 {
	constructor(uint256 initialSupply) public ERC20('HenFace', 'HFC') {
		_mint(msg.sender, initialSupply);
	}
}
