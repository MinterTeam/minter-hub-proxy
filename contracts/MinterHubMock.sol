pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Interfaces.sol";

contract MinterHubMock is Hub {
    using SafeERC20 for IERC20;

    function transferToChain(
        address _tokenContract,
        bytes32 _destinationChain,
        bytes32 _destination,
        uint256 _amount,
        uint256 _fee
    ) public override {
        IERC20(_tokenContract).safeTransferFrom(msg.sender, address(this), _amount);
    }
}