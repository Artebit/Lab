const hre = require("hardhat");

async function main() {
    const Greeting = await hre.ethers.getContractFactory("Greeting");

    const greeting = await Greeting.deploy("Artem");

    await greeting.deployed();

    console.log("Greeting deployed to:", greeting.address);

    const result = await greeting.greet();
    console.log("Greeting says:", result);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});