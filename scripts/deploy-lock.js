const hre = require("hardhat");

async function main() {
  const unlockTime = Math.floor(Date.now() / 1000) + 60;

  const Lock = await hre.ethers.getContractFactory("Lock");
  const lock = await Lock.deploy(unlockTime, { value: 0 });

  await lock.deployed();

  console.log("Lock deployed to:", lock.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});