
const FUND_ME_LIMIT_TIME = 60 * 5

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { firstAccount } = await getNamedAccounts();
    const { secondAccount } = await getNamedAccounts();

    console.log(`firstAccount contract with the account: ${firstAccount}`);
    console.log(`secondAccount contract with the account: ${secondAccount}`);

    const { deploy } = deployments;

    await deploy("FundMe", {
        from: firstAccount,
        args: [FUND_ME_LIMIT_TIME],
        log: true,
    });
}

module.exports.tags = ["all", "tag-fundMe"] 