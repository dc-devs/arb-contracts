const NameContract = artifacts.require('Name');

contract('Name', (accounts) => {
	const [ownerAccount, accountOne, acccountTwo] = accounts;

	it('should return name', async () => {
		const nameInstance = await NameContract.deployed();
		const name = await nameInstance.getName();

		expect(name).to.equal('David');
	});

	it('should be able to set name', async () => {
		const updatedName = 'Daavid';
		const nameInstance = await NameContract.deployed();

		await nameInstance.setName(updatedName);

		const name = await nameInstance.getName();

		expect(name).to.equal(updatedName);
	});
});
