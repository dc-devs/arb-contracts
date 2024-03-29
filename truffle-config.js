const dotenv = require('dotenv');
const HDWalletProvider = require('@truffle/hdwallet-provider');

dotenv.config();

module.exports = {
	// Uncommenting the defaults below
	// provides for an easier quick-start with Ganache.
	// You can also follow this format for other networks;
	// see <http://truffleframework.com/docs/advanced/configuration>
	// for more details on how to specify configuration options!
	//
	networks: {
		development: {
			host: '127.0.0.1',
			port: 7545,
			network_id: '5777',
		},
		// ganache_local: {
		// 	provider: function () {
		// 		return new HDWalletProvider(
		// 			process.env.MNEMONIC,
		// 			'http://127.0.0.1:7545',
		// 			0
		// 		);
		// 	},
		// 	network_id: 5777,
		// },
	},
	compilers: {
		solc: {
			version: '^0.6.0',
		},
	},
};
