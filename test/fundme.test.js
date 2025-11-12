const { assert } = require("chai");
const { deployments, ethers, getNamedAccounts } = require("hardhat");

const FUND_ME_LIMIT_TIME = 60 * 5

describe("test fundMe contract", async function () {
    let fundMe;
    let firstAccount;
    // let secondAccount;

    beforeEach(async function () {
        await deployments.fixture(["tag-fundMe"]);
        firstAccount = (await getNamedAccounts()).firstAccount;
        // secondAccount = await getNamedAccounts().secondAccount;

        const fundMeDeployment = await deployments.get("FundMe");
        fundMe = await ethers.getContractAt("FundMe", fundMeDeployment.address);
    });

    it("test if the owner is the deployer", async function () {

        await fundMe.waitForDeployment();
        assert.equal(await fundMe.owner(), firstAccount)
    })
})