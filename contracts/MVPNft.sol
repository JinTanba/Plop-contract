// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MVPNft is ERC721 {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;
    address public minter;
    string private _baseTokenURI = "ipfs://QmbFMke1KXqnYyBBWxB74N4c5SBnJMVAiMNRcGu6x1AwQH";
    
    constructor(
        string memory name,
        string memory symbol,
        address _minter
    ) ERC721(name, symbol) {
        minter = _minter;
    }
    
    modifier onlyMinter() {
        require(msg.sender == minter, "Only minter can call this function");
        _;
    }
    
    function mint(address to) public onlyMinter returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(to, newTokenId);
        return newTokenId;
    }
    
    function setMinter(address _newMinter) public onlyMinter {
        require(_newMinter != address(0), "New minter cannot be zero address");
        minter = _newMinter;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
}