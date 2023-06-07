const ethers = require("ethers");
const fs = require("fs");

async function main() {
  // RPC Server http://127.0.0.1:7545
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );

  const wallet = new ethers.Wallet(
    "0x4a3c12de5ed1ffd1d8c81e1ea2aa26b463adc052778fb652d345c2f4638232d0",
    provider
  );

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

  console.log("Deploying please wait...");

  const contract = await contractFactory.deploy();
  await contract.deployTransaction.wait(1);

  // console.log("Deployment Transaction: ");
  // console.log(contract.deployTransaction);

  const currentFavoriteNumber = await contract.retrieve();
  console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`);

  const transactionResponse = await contract.store("7");
  await transactionResponse.wait(1);

  const updatedFavoiteNumber = await contract.retrieve();
  console.log(`Updated Favorite Number Is: ${updatedFavoiteNumber}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
