// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract TestTokenAlex is ERC20 {
    // Staking structure
    struct Stake {
        uint256 amount;
        uint256 timestamp;
    }
    mapping(address => Stake) public stakes;
    uint256 public rewardRate = 10; // Fixed daily reward rate, you may change it
    //You guys may change the token name and acronym as you like
    constructor(uint256 initialSupply, address[] memory wallets) 
        ERC20("TestTokenAlex", "TTKA") 
    {
        require(wallets.length > 0, "At least one wallet required");
        // Mint the initial supply to specified wallets
        uint256 portion = initialSupply / wallets.length;
        for (uint256 i = 0; i < wallets.length; i++) {
            _mint(wallets[i], portion);
        }
    }
    // Mint function restricted to owner (if required in the future)
    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
    // Stake function to lock tokens
    function stakeTokens(uint256 amount) external {
        require(balanceOf(msg.sender) >= amount, "Not enough tokens to stake");
        require(amount > 0, "Amount must be greater than 0");

        // Transfer tokens to contract for staking
        _transfer(msg.sender, address(this), amount);
        stakes[msg.sender] = Stake(amount, block.timestamp);
    }

    // Unstake function with reward calculation
    function unstakeTokens() external {
        Stake memory userStake = stakes[msg.sender];
        require(userStake.amount > 0, "No tokens staked");
        uint256 stakingTime = block.timestamp - userStake.timestamp;
        uint256 reward = (userStake.amount * rewardRate * stakingTime) / (1 days); //adjust this part as needed
        delete stakes[msg.sender];
        _mint(msg.sender, reward);
        _transfer(address(this), msg.sender, userStake.amount);
    }
}
