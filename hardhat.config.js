require("@nomiclabs/hardhat-waffle");
require('hardhat-abi-exporter');
require("@nomiclabs/hardhat-etherscan");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

let accounts = []

if (process.env.PRIVATE_KEY) {
  accounts.push(`${process.env.PRIVATE_KEY}`)
}

let etherscanApiKeys = {}

if (process.env.ETHERSCAN_API_KEY) {
    etherscanApiKeys = {
        bscTestnet: process.env.ETHERSCAN_API_KEY,
        bsc: process.env.ETHERSCAN_API_KEY
    }
}


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.1",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  abiExporter: {
    path: './data/abi',
    runOnCompile: true
  },
  networks: {
    bscTestnet: {
      url: `https://data-seed-prebsc-2-s1.binance.org:8545/`,
      accounts: accounts,
      gasPrice: 10000000000
    },
    bsc: {
      url: `https://bscrpc.com`,
      accounts: accounts,
      gasPrice: 5000000000
    }
  },
  etherscan: {
    apiKey: etherscanApiKeys
  }
};
