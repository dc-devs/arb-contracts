const { default: to } = require('await-to-js');
const { INITIAL_TOKENS } = require('../constants/constants');
const HenFace = artifacts.require('HenFace');

contract('HenFace', async (accounts) => {
	const [ownerAccount, accountOne, acccountTwo] = accounts;

	describe('when the contract is deployed', () => {
		it('should return the name of the token', async () => {
			const contract = await HenFace.new(INITIAL_TOKENS);
			const name = await contract.name();

			expect(name).to.equal(
				'HenFace',
				'Expected name of token to be HenFace'
			);
		});

		it('should return the symbol of the token', async () => {
			const contract = await HenFace.new(INITIAL_TOKENS);
			const symbol = await contract.symbol();

			expect(symbol).to.equal(
				'HFC',
				'Expected symbol of token to be HFC'
			);
		});

		it('should return the number of decimals of the token', async () => {
			const contract = await HenFace.new(INITIAL_TOKENS);
			const decimalsBn = await contract.decimals();
			const decimalsString = decimalsBn.toString();

			expect(decimalsString).to.equal(
				'18',
				'Expected decimals to be the default (18)'
			);
		});

		it('should return the total supply of the token', async () => {
			const contract = await HenFace.new(INITIAL_TOKENS);
			const totalSupplyBn = await contract.totalSupply();
			const totalSupplyString = totalSupplyBn.toString();
			const expectedTotalSupplyString = INITIAL_TOKENS.toString();

			expect(totalSupplyString).to.equal(
				expectedTotalSupplyString,
				'Expected total supply to be the same number as inital tokens supplied'
			);
		});

		it('should put initial token supply in the owner account', async () => {
			const contract = await HenFace.new(INITIAL_TOKENS);
			const ownerBalance = await contract.balanceOf(ownerAccount);
			const readableOwnerBalance = ownerBalance.toString();
			const readableInitialSupply = INITIAL_TOKENS.toString();

			expect(readableOwnerBalance).to.equal(
				readableInitialSupply,
				`Expected owner account to hold initial supply (${readableInitialSupply})`
			);
		});

		it('should be able to be sent from acccount to another', async () => {
			const contract = await HenFace.new(INITIAL_TOKENS);
			const sendAmount = 1;
			const sendAmountBn = web3.utils.toBN(sendAmount);
			const sendAmountString = sendAmountBn.toString();

			await contract.transfer(accountOne, sendAmount);

			const ownerBalanceBn = await contract.balanceOf(ownerAccount);
			const ownerBalanceString = ownerBalanceBn.toString();
			const accountOneBalanceBn = await contract.balanceOf(accountOne);
			const accountOneBalanceString = accountOneBalanceBn.toString();
			const totalSupplyBn = await contract.totalSupply();

			const expectedOwnerBalanceBn = totalSupplyBn.sub(sendAmountBn);
			const expectedOwnerBalanceString = expectedOwnerBalanceBn.toString();

			expect(ownerBalanceString).to.equal(expectedOwnerBalanceString);
			expect(accountOneBalanceString).to.equal(sendAmountString);
		});

		it('should not be aloud to send more tokens than are available in total', async () => {
			const sendAmount = 1000001;
			const contract = await HenFace.new(INITIAL_TOKENS);

			const [error, result] = await to(
				contract.transfer(accountOne, sendAmount)
			);
			expect(error).to.not.be.null;
			console.log(result);

			const totalSupplyBn = await contract.totalSupply();
			const totalSupplyString = totalSupplyBn.toString();
			const ownerBalanceBn = await contract.balanceOf(ownerAccount);
			const ownerBalanceString = ownerBalanceBn.toString();
			const accountOneBalanceBn = await contract.balanceOf(accountOne);
			const accountOneBalanceString = accountOneBalanceBn.toString();

			expect(accountOneBalanceString).to.equal('0');
			expect(ownerBalanceString).to.equal(totalSupplyString);
		});
	});
});
