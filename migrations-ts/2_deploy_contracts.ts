const { INITIAL_TOKENS } = require('../constants/constants');
const HenFace = artifacts.require('HenFace');
const StaloneBone = artifacts.require('StaloneBone');

module.exports = async function (deployer) {
	const initialTokenAmount = INITIAL_TOKENS;
	// const [ownerAccountAddress] = await web3.eth.getAccounts();

	await deployer.deploy(HenFace, initialTokenAmount);
	await deployer.deploy(StaloneBone, initialTokenAmount);
} as Truffle.Migration;

// because of https://stackoverflow.com/questions/40900791/cannot-redeclare-block-scoped-variable-in-unrelated-files
export {};
