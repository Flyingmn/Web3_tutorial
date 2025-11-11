// import ethers.js



const { ethers } = require("hardhat");
const FUND_ME_LIMIT_TIME = 60 * 5

async function main() {
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

    // init 2 accounts
    const [account0, account1] = await ethers.getSigners();

    // fund contract with account1
    const fundTx = await fundMe.fund({ value: ethers.parseEther("0.001") })
    await fundTx.wait();

    // check balance of contract
    const balanceContract = await ethers.provider.getBalance(fundMe.target);
    console.log("balanceContract: ", balanceContract);

    // fund contract with account2
    const fundTx1 = await fundMe.connect(account1).fund({ value: ethers.parseEther("0.002") })
    await fundTx1.wait();

    // check balance of contract
    const balanceContract1 = await ethers.provider.getBalance(fundMe.target);
    console.log("balanceContract after second fund: ", balanceContract1);

    // check mapping of contract
    const account0BalanceInFundMe = await fundMe.funders(account0.address)
    const account1BalanceInFundMe = await fundMe.funders(account1.address)
    console.log("account_0_BalanceInFundMe: ", account0BalanceInFundMe);
    console.log("account_1_BalanceInFundMe: ", account1BalanceInFundMe);


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