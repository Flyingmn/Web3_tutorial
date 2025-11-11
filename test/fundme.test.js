const FUND_ME_LIMIT_TIME = 60 * 5;
const { assert } = require("chai");

describe("test fundMe contract", async function () {
    it("test if the owner is the deployer", async function () {
        const fundMeFactory = await ethers.getContractFactory("FundMe");

        const fundMe = await fundMeFactory.deploy(FUND_ME_LIMIT_TIME);

        await fundMe.waitForDeployment();

        const [firstAccount] = await ethers.getSigners();

        assert.equal(await fundMe.owner(), firstAccount.address)
    })
})