# Minter Hub Proxy contract

## Description
Minter Hub Proxy is a smart contract in EVM networks that allows you to perform any operations on blockchains and return received coins to Minter DEX through Minter Hub.

The main function of Minter Hub Proxy is on-chain calculation of the amount of coins received as a result of a tx and sending them to Minter Hub in one transaction.

## How it works
```
  contractToCall = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd";
  contractData = "0xd0e30db0";
  tokenToSpend = "0x0000000000000000000000000000000000000001";
  maxAmountToSpend = "1";
  tokenToReceive = "0x0000000000000000000000000000000000000002";
  refundTo = "0x0000000000000000000000000000000000000000";
  hubDestination = "0x0000000000000000000000003f92f12268f24ee429954eec58431c1842c44535";
  hubDestinationChain = "0x6d696e7465720000000000000000000000000000000000000000000000000000";
  
  // Call contractToCall with contractData and send tokenToReceive to Minter Hub
  proxy.callAndTransferToChain(contractToCall, contractData, tokenToSpend, maxAmountToSpend, tokenToReceive, refundTo, destinationChain, destination, 0);
```

*Note*: you also can send an eth value to contract. In this case `tokenToSpend` and `maxAmountToSpend` must be equal to `0x0000000000000000000000000000000000000000` and `0`.

## Deploy testnet

```shell
PRIVATE_KEY=... ETHERSCAN_API_KEY=... hh run --network bscTestnet scripts/deploy-testnet.js  
```

## Test

```shell
PRIVATE_KEY=... MINTER_HUB_PROXY_ADDRESS=... hh run --network bscTestnet scripts/run-example-tx.js
```
