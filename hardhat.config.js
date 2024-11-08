require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: "./environment.env" });
module.exports = {
    solidity: "0.8.20",
    networks: {
        sepolia: {
            url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`, // Use the API key from your env
            accounts: [`0x${process.env.SEPOLIA_PRIVATE_KEY}`] // Private key from your env
        }
    }
};
