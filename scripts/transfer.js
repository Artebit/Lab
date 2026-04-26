import { ethers } from "ethers";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const TOKEN_ADDRESS = "0x808686b57f5Dd1AA7efDaeEA40C7872EF6fAB473";
const RECEIVER = "0x1D2C82bf8eD94C52Ca3Ae7C89eF2C543D0997E94";

async function main() {
  const artifact = JSON.parse(
    fs.readFileSync("./artifacts/contracts/MyToken.sol/MyToken.json", "utf8")
  );

  const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const token = new ethers.Contract(TOKEN_ADDRESS, artifact.abi, wallet);

  const amount = ethers.parseUnits("100", 18);

  const tx = await token.transfer(RECEIVER, amount);
  console.log("Transfer tx:", tx.hash);

  await tx.wait();
  console.log("Transfer confirmed");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});