const { ethers } = require("hardhat");
async function main() {
    const [signer] = await ethers.getSigners();
    const tokenAddress = "0x7a66c6Fc71e68b103D0bF29C207e23A72Cf0FC41";
    const Token = await ethers.getContractFactory("TestTokenAlex");
    const token = await Token.attach(tokenAddress);
    const mintAmount = ethers.utils.parseUnits("20000", 18); //Modify the amount you want yourself :)
    // Check initial balance
    const initialBalance = await token.balanceOf(signer.address);
    console.log(`Initial balance of ${signer.address}: ${ethers.utils.formatUnits(initialBalance, 18)} TTKA`);
    await token.mint(signer.address, mintAmount);
    // Check final balance
    const finalBalance = await token.balanceOf(signer.address);
    console.log(`Final balance of ${signer.address}: ${ethers.utils.formatUnits(finalBalance, 18)} TTKA`);
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error during minting:", error);
        process.exit(1);
    });