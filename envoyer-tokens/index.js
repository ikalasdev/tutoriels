const Web3 = require("web3")
const erc20ABI = require('./erc20ABI')



async function envoyerTokens(destinataire, nombreTokens) {
    let network = "https://data-seed-prebsc-1-s1.binance.org:8545";

    const web3 = new Web3(network);

    let erc20Address = "0x6d630CAA9bed9bB32F04e97e393E2C254ea95E17"

    let contract = new web3.eth.Contract(erc20ABI, erc20Address);


    let nombreTokensWei = web3.utils.toWei(nombreTokens);

    let contractTransaction = contract.methods["transfer"](
        destinataire,
        nombreTokensWei
    );

    let networkId = await web3.eth.net.getId();
    let gas = await contractTransaction.estimateGas({from: "0xb0eB4550D17c602Cdc5d86EdD9Ab0454fb44EdF6" });
    let gasPrice = await web3.eth.getGasPrice();

    let signedTransaction = await web3.eth.accounts.signTransaction(
        {
            to: contract.options.address,
            from: "0xb0eB4550D17c602Cdc5d86EdD9Ab0454fb44EdF6",
            data: contractTransaction.encodeABI(),
            gas,
            gasPrice,
            chainId: networkId
        },
        //privateKey
        "f55f77da7b6760c870c80ba17521fed22524c058df9dec0030b944378da5731f"

    )

    let retour = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);

    console.log(retour);

}


envoyerTokens("0xBCEc2380CebDc149B616691d080bA3f778fC7BE0", "250")