const hre = require("hardhat");

async function main() {
  // デプロイアカウントの取得
  console.log("Getting signers...");
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // まず、Utilsライブラリをデプロイ
  console.log("\nDeploying Utils library...");
  const Utils = await hre.ethers.getContractFactory("Utils");
  const utils = await Utils.deploy(
    {
      maxFeePerGas: hre.ethers.parseUnits("20", "gwei"),
      maxPriorityFeePerGas: hre.ethers.parseUnits("2", "gwei")
    }
  );
  await utils.waitForDeployment();
  
  const utilsAddress = await utils.getAddress();
  console.log("Utils library deployed to:", utilsAddress);

  // Attestorコントラクトのファクトリを作成し、ライブラリをリンク
  console.log("\nDeploying Attestor...");
  const Attestor = await hre.ethers.getContractFactory("Attestor", {
    libraries: {
      Utils: utilsAddress
    }
  });

  console.log("\nDeploying TestToken...");
  const TestToken = await hre.ethers.getContractFactory("TestToken");
  const testToken = await TestToken.deploy("TestToken", "TEST", 18);
  await testToken.waitForDeployment();

  const testTokenAddress = await testToken.getAddress();
  console.log("TestToken deployed to:", testTokenAddress);



  // Attestorコントラクトをデプロイ
  const attestor = await Attestor.deploy(
    {
      maxFeePerGas: hre.ethers.parseUnits("20", "gwei"),
      maxPriorityFeePerGas: hre.ethers.parseUnits("2", "gwei")
    }
  );
  await attestor.waitForDeployment();
  const attestorAddress = await attestor.getAddress();
  console.log("Attestor deployed to:", attestorAddress);

  console.log("\nDeploying MVPNft...");
  const MVPNft = await hre.ethers.getContractFactory("MVPNft");
  const mvpnft = await MVPNft.deploy("MVP HACKATHON NFT", "CHICAGO", attestorAddress);
  await mvpnft.waitForDeployment();

  const mvpnftAddress = await mvpnft.getAddress();
  console.log("MVPNft deployed to:", mvpnftAddress);



  // デプロイしたコントラクトアドレスを検証用に出力
  console.log("\nDeployment Summary:");
  console.log("Utils Library:", utilsAddress);
  console.log("Attestor Contract:", attestorAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });