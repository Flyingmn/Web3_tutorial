const { task } = require("hardhat/config");

task("interact-fundMe", "interact with fundMe contract").addParam("addr", "fundMe contract address").setAction(async (taskArgs, hre) => {
    const fundMeFactory = await ethers.getContractFactory("FundMe");
    const fundMe = fundMeFactory.attach(taskArgs.addr);

    // init 2 accounts
    const [account0, account1] = await ethers.getSigners();

    // fund contract with account1
    const fundTx = await fundMe.fund({ value: ethers.parseEther("0.001") })
    await fundTx.wait();

    // check balance of contract
    await ethers.provider.getBalance(fundMe.target).then(console.log());

    // fund contract with account2
    const fundTx1 = await fundMe.connect(account1).fund({ value: ethers.parseEther("0.002") })
    await fundTx1.wait();

    // check balance of contract
    await ethers.provider.getBalance(fundMe.target).then(console.log());

    // check mapping of contract
    const account0BalanceInFundMe = await fundMe.funders(account0.address)
    const account1BalanceInFundMe = await fundMe.funders(account1.address)
    console.log("account_0_BalanceInFundMe: ", account0BalanceInFundMe);
    console.log("account_1_BalanceInFundMe: ", account1BalanceInFundMe);
});

module.exports = {};