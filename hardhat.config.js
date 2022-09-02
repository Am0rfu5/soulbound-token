require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-ethers")
require("hardhat-deploy")
require("@openzeppelin/hardhat-upgrades")
require("hardhat-gas-reporter")
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config()
require("./tasks/block-number")
require("hardhat-gas-reporter")
require("solidity-coverage") 
require("hardhat-deploy")
require("hardhat-deploy-ethers");
let secret = require("./.secret")

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY

module.exports = {
    paths: {
        artifacts: "./artifacts",
    },
    defaultNetwork: "hardhat",
    networks: {
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },
        rinkeby: {
            url: secret.rinkeby_url,
            accounts: [secret.rinkeby_key],
            chainId: 4,
            blockConfirmations: 2,
        },
    },

    solidity: {
        compilers: [
            {
                version: "0.8.13",
                settings: {
                  optimizer: {
                      enabled: true,
                      runs: 300,
                  },
                },
            },
            {
                version: "0.8.7",
                settings: {
                  optimizer: {
                      enabled: true,
                      runs: 300,
                  },
                },
            },
        ],
    },
    mocha: {
      timeout: 1000000000
    },
    etherscan: {
      apiKey: ETHERSCAN_API_KEY
    },
    gasReporter: {
      enabled: true,
      showTimeSpent: true,
      outputFile: "gas-report.txt",
      noColors: true,
      currency: "USD",
      coinmarketcap: COINMARKETCAP_API_KEY,
      // token: "MATIC", // how to check other currencies ETH
    }
}
