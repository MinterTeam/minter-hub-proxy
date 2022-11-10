const hre = require("hardhat");

async function main() {
  const MinterHubMock = await hre.ethers.getContractFactory("MinterHubMock");
  const minterHubMock = await MinterHubMock.deploy();
  await minterHubMock.deployed();

  const MinterHubProxy = await hre.ethers.getContractFactory("MinterHubProxy");
  const proxy = await MinterHubProxy.deploy(minterHubMock.address);

  await proxy.deployed();

  console.log("Deployed to:", proxy.address);

  await proxy.deployTransaction.wait(10);

  await hre.run("verify:verify", {
      address: proxy.address,
      constructorArguments: [minterHubMock.address],
      contract: "contracts/MinterHubProxy.sol:MinterHubProxy"
  });

  await hre.run("verify:verify", {
      address: proxy.address,
      constructorArguments: [],
      contract: "contracts/MinterHubMock.sol:MinterHubMock"
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
