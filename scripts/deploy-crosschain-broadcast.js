const hre = require("hardhat");

async function main() {
  const CrossChainBroadcast = await hre.ethers.getContractFactory("CrossChainBroadcast");
  const ccb = await CrossChainBroadcast.deploy();

  await ccb.deployed();

  console.log("Deployed to:", ccb.address);

  await ccb.deployTransaction.wait(10);

  await hre.run("verify:verify", {
      address: ccb.address,
      constructorArguments: [],
      contract: "contracts/CrossChainBroadcast.sol:CrossChainBroadcast"
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
