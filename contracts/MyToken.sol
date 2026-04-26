pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("ArteomToken", "ART") {
        _mint(msg.sender, initialSupply);
    }
}