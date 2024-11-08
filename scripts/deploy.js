const { ethers } = require("hardhat");
async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contract with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
    // Fetch the contract factory
    const Token = await ethers.getContractFactory("TestTokenAlex");
    // Wallets to receive the initial token distribution
    const wallets = [
        "0xAddress1", // Main Wallet, you may adjust the address yourself later
        "0xAddress2", // Wallet 2
        "0xAddress3"  // Wallet 3
    ];
    if (wallets.length === 0) {
        throw new Error("No wallets provided for initial token distribution.");
    }
    const initialSupply = ethers.utils.parseUnits("9000", 18); // 18 decimals (default), you may adjust the initial supply as much as you want
    console.log(`Deploying token with initial supply: ${initialSupply.toString()} (in wei)`);
    // Deploy the contract with a specified gas limit
    const gasLimit = 3000000; // Adjust as needed based on network and contract size
    const token = await Token.deploy(initialSupply, wallets, { gasLimit });
    await token.deployed();

    console.log("Token deployed to:", token.address);
    console.log("Owner:", deployer.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error during deployment:", error);
        process.exit(1);
    });
