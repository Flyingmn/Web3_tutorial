// import ethers.js


const { ethers } = require("hardhat");

async function main() {
    const fundMeFactory = await ethers.getContractFactory("FundMe");

    console.log("fundMe deploying");

    const fundMe = await fundMeFactory.deploy(100);

    console.log("fundMe deploying step1");

    await fundMe.waitForDeployment();

    console.log(`fundMe deploy success, address is  ${fundMe.target}`);

    if (hre.network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        await fundMe.deploymentTransaction().wait(6);

        await verifyFundMe(fundMe.target, [100]);
    } else {
        console.log("verify fundMe skip");
    }

    return;
}

async function verifyFundMe(fundMeAddr, args) {
    console.log("verify fundMe start");

    await hre.run("verify:verify", {
        address: fundMeAddr,
        constructorArguments: args
    });

    console.log("fundMe verify success");
}

main().then().catch((error) => {
    console.error(`fundMe deploy fail: ${error}`);

    process.exit(0);
})