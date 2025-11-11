const { task } = require("hardhat/config");

const FUND_ME_LIMIT_TIME = 60 * 5

task("deploy-fundMe", "deploy and verify fundMe contract").setAction(async (taskArgs, hre) => {
    const fundMeFactory = await ethers.getContractFactory("FundMe");

    console.log("fundMe deploying");

    const fundMe = await fundMeFactory.deploy(FUND_ME_LIMIT_TIME);

    console.log("fundMe deploying step1");

    await fundMe.waitForDeployment();

    console.log(`fundMe deploy success, address is  ${fundMe.target}`);

    if (hre.network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        await fundMe.deploymentTransaction().wait(6);

        await verifyFundMe(fundMe.target, [FUND_ME_LIMIT_TIME]);
    } else {
        console.log("verify fundMe skip");
    }
});


async function verifyFundMe(fundMeAddr, args) {
    console.log("verify fundMe start");

    await hre.run("verify:verify", {
        address: fundMeAddr,
        constructorArguments: args
    });

    console.log("fundMe verify success");
}

module.exports = {};