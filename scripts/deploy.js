const hre = require("hardhat");

async function main() {
  const hubAddress = "0xF5b0ed82a0b3e11567081694cC66c3df133f7C8F";
  const MinterHubProxy = await hre.ethers.getContractFactory("MinterHubProxy");
  const proxy = await MinterHubProxy.deploy(hubAddress);

  await proxy.deployed();

  console.log("Deployed to:", proxy.address);

  await proxy.deployTransaction.wait(10);

  await hre.run("verify:verify", {
      address: proxy.address,
      constructorArguments: [hubAddress],
      contract: "contracts/MinterHubProxy.sol:MinterHubProxy"
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
