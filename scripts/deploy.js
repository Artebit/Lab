import { ethers } from "ethers";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const artifact = JSON.parse(
    fs.readFileSync("./artifacts/contracts/MyToken.sol/MyToken.json", "utf8")
  );

  const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  console.log("Deploying from:", wallet.address);

  const factory = new ethers.ContractFactory(
    artifact.abi,
    artifact.bytecode,
    wallet
  );

  const initialSupply = ethers.parseUnits("1000000", 18);

  const token = await factory.deploy(initialSupply);
  await token.waitForDeployment();

  console.log("MyToken deployed to:", await token.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});