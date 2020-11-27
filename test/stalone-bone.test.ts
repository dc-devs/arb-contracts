const { default: to } = require('await-to-js');
const { INITIAL_TOKENS } = require('../constants/constants');
const StaloneBone = artifacts.require('StaloneBone');

contract('StaloneBone', async (accounts) => {
	const [ownerAccount, accountOne] = accounts;

	describe('when the contract is deployed', () => {
		it('should return the name of the token', async () => {
			const contract = await StaloneBone.new(INITIAL_TOKENS);
			const name = await contract.name();

			expect(name).to.equal('StaloneBone');
		});

		it('should return the symbol of the token', async () => {
			const contract = await StaloneBone.new(INITIAL_TOKENS);
			const symbol = await contract.symbol();

			expect(symbol).to.equal('STBN');
		});

		it('should return the number of decimals of the token', async () => {
			const contract = await StaloneBone.new(INITIAL_TOKENS);
			const decimalsBn = await contract.decimals();
			const decimalsString = decimalsBn.toString();

			expect(decimalsString).to.equal('18');
		});

		it('should return the total supply of the token', async () => {
			const contract = await StaloneBone.new(INITIAL_TOKENS);
			const totalSupplyBn = await contract.totalSupply();
			const totalSupplyString = totalSupplyBn.toString();
			const expectedTotalSupplyString = INITIAL_TOKENS.toString();

			expect(totalSupplyString).to.equal(expectedTotalSupplyString);
		});

		it('should put initial token supply in the owner account', async () => {
			const contract = await StaloneBone.new(INITIAL_TOKENS);
			const ownerBalanceBn = await contract.balanceOf(ownerAccount);
			const ownerBalanceString = ownerBalanceBn.toString();
			const readableInitialSupply = INITIAL_TOKENS.toString();

			expect(ownerBalanceString).to.equal(readableInitialSupply);
		});

		it('should be able to be sent from acccount to another', async () => {
			const contract = await StaloneBone.new(INITIAL_TOKENS);
			const sendAmount = web3.utils.toWei('1');
			const sendAmountBn = web3.utils.toBN(sendAmount);

			await contract.transfer(accountOne, sendAmount);

			const ownerBalanceBn = await contract.balanceOf(ownerAccount);
			const ownerBalanceString = ownerBalanceBn.toString();
			const accountOneBalanceBn = await contract.balanceOf(accountOne);
			const accountOneBalanceString = accountOneBalanceBn.toString();
			const totalSupplyBn = await contract.totalSupply();

			const expectedOwnerBalanceBn = totalSupplyBn.sub(sendAmountBn);
			const expectedOwnerBalanceString = expectedOwnerBalanceBn.toString();

			expect(ownerBalanceString).to.equal(expectedOwnerBalanceString);
			expect(accountOneBalanceString).to.equal(sendAmount);
		});

		it('should not be aloud to send more tokens than are available in total', async () => {
			const sendAmount = web3.utils.toWei('1000001');
			const contract = await StaloneBone.new(INITIAL_TOKENS);

			const [error, transaction] = await to(
				contract.transfer(accountOne, sendAmount)
			);
			expect(error).to.not.be.null;

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
