const Token = artifacts.require("Token");
const PayItem = artifacts.require("PayItem");

module.exports = async function(deployer, network,  accounts) {
  await deployer.deploy(PayItem, Token.address);
};
