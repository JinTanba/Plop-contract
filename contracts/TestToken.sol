// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20 {
    uint8 private _decimals;
    uint256 public constant INITIAL_SUPPLY = 1000000 * 10**18; // 1,000,000 tokens

    constructor(
        string memory name,
        string memory symbol,
        uint8 decimalsValue
    ) ERC20(name, symbol)  {
        _decimals = decimalsValue;
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    // テスト用に誰でもミントできる関数
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    // テスト用にトークンを破棄する関数
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
} 