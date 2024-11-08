const { ethers } = require("hardhat");
async function main() {
    const [signer] = await ethers.getSigners();
    const tokenAddress = "0x7a66c6Fc71e68b103D0bF29C207e23A72Cf0FC41"; //you may change the currency address, I'm using the currency address that I launched before
    const Token = await ethers.getContractFactory("TestTokenAlex");
    const token = await Token.attach(tokenAddress);
    async function stakeTokens(amount) {
        const stakeAmount = ethers.utils.parseUnits(amount.toString(), 18);
        await token.stakeTokens(stakeAmount);
        console.log(`Staked ${amount} TTKA`);
    }
    //Modify the amount you want yourself :)
    await stakeTokens(90000);
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error during staking:", error);
        process.exit(1);
    });
