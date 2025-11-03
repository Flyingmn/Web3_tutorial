// import ethers.js

const { ethers } = require("hardhat")

async function main() {
    const fundMeFactory = await ethers.getContractFactory("FundMe")

    console.log("fundMe deploying")

    const fundMe = await fundMeFactory.deploy(100)

    console.log("fundMe deploying step1")

    await fundMe.waitForDeployment()

    console.log(`fundMe deploy success, address is  ${fundMe.target}`)

    return
}

main().then().catch((error) => {
    console.error(`fundMe deploy fail: ${error}`)

    process.exit(0)
})