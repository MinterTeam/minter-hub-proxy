const hre = require("hardhat");

async function main() {
  const MinterHubProxy = await hre.ethers.getContractFactory("MinterHubProxy");
  const proxy = await MinterHubProxy.attach(process.env.MINTER_HUB_PROXY_ADDRESS);

  let wbnb = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd";
  let wbnbDepositData = "0xd0e30db0"
  let destination = "0x0000000000000000000000003f92f12268f24ee429954eec58431c1842c44535";
  let destinationChain = "0x6d696e7465720000000000000000000000000000000000000000000000000000";

  await proxy.connect((await hre.ethers.getSigners())[0]).callAndTransferToChain(wbnb, wbnbDepositData, wbnb, 0, wbnb, destinationChain, destination, 0, {value: 1});
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
