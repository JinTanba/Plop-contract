require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// AlchemyのRPC URLを定数として定義
const ALCHEMY_RPC_URL = "https://base-sepolia.infura.io/v3/05c6709f3eed48eb89c7e82d7a43c0dc";
const SEPOLIA_RPC_URL = "https://sepolia.infura.io/v3/4d95e2bfc962495dafdb102c23f0ec65";
const PRIVATE_KEY = process.env.PRIVATE_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      forking: {
        url: SEPOLIA_RPC_URL,
        blockNumber: 7041064,
        maxFeePerGas: 15000000000,  // ここに追加
        maxPriorityFeePerGas: 2000000000  // これも追加すると良い
      },
      chainId: 11155111,
      gasPrice: "auto",
      maxFeePerGas: 15000000000,  // ここに追加
      maxPriorityFeePerGas: 2000000000  // これも追加すると良い
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      gasPrice: "auto",
      maxFeePerGas: 15000000000,  // ここに追加
      maxPriorityFeePerGas: 2000000000  // これも追加すると良い
    },
    base_sepolia: {
      url: ALCHEMY_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 84532,
      gasPrice: "auto",
      verify: {
        etherscan: {
          apiUrl: "https://api-sepolia.basescan.org"
        }
      }
    },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 11155111,
      gasPrice: "auto",
      maxFeePerGas: 20000000000,  // 20 Gwei (現在の baseFeePerGas の約2倍)
      maxPriorityFeePerGas: 2000000000  // 2 Gwei
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.8.20"
      },
      {
        version: "0.8.4"
      }
    ]
  }
};