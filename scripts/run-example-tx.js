const hre = require("hardhat");

async function main() {
  const MinterHubProxy = await hre.ethers.getContractFactory("MinterHubProxy");
  const proxy = await MinterHubProxy.attach("0x615355Bc09Af0260d6fa3f09f1447e3e3dBED45c");

  console.log(proxy)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
