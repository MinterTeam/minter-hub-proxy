//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "./Interfaces.sol";

contract MinterHubProxy {
    using SafeERC20 for IERC20;

    Hub public hub;

    constructor(Hub _hub) {
        hub = _hub;
    }

    function callAndTransferToChain(
        address to,
        bytes calldata data,
        IERC20 tokenFrom,
        uint256 tokenFromAmount,
        IERC20 tokenTo,
        bytes32 destinationChain,
        bytes32 destination,
        uint256 fee
    ) public payable {
        tokenFrom.transferFrom(msg.sender, address(this), tokenFromAmount);
        tokenFrom.approve(to, tokenFromAmount);
        uint256 balanceBefore = tokenTo.balanceOf(address(this));
        Address.functionCallWithValue(to, data, msg.value);
        uint256 toDeposit = tokenTo.balanceOf(address(this)) - balanceBefore;

        tokenTo.approve(address(hub), toDeposit);
        hub.transferToChain(address(tokenTo), destinationChain, destination, toDeposit, fee);
    }
}
