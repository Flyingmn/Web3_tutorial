require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config

const SEPOLIA_URL = process.env.SEPOLIA_URL
const PRIMARY_KEY = process.env.PRIMARY_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    url: SEPOLIA_URL,
    accounts: [PRIMARY_KEY]
  }
};
