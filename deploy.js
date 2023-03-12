const ethers = require("ethers")
const fs = require("fs")
const ganache = require("ganache")
require("dotenv").config()

async function main() {
    //http://127.0.0.1:7545
    //0x730edd69F00b8EE47B80736f9b6f95379F1dB0B2
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
    //console.log(await provider.getBalance());

    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    // We can also create a wallet with encryptedkey.json so that we do not have private key hanging arounf
    // in our code
    // const encryptedJsonKey = fs.readFileSync("./.encryptedKey.json", "utf8")
    // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    //     encryptedJsonKey,
    //     process.env.PRIVATE_KEY_PASSWORD
    // )
    // wallet = wallet.connect(provider)
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")
    const binary = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin",
        "utf8"
    )
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log("deploying contract please wait")
    const contract = await contractFactory.deploy()
    console.log(`Contract address is: ${contract.address}`)
    //console.log(contract);
    // console.log("deployment transcation is");
    const deploymentTransaction = contract.deployTransaction
    //  console.log(deploymentTransaction);
    // console.log("deployment transcation receipt is");
    const transactionReciept = await contract.deployTransaction.wait(1)
    //console.log(transactionReciept);
    let currentFavoriteNumber = await contract.retrieveFavouriteNumber()
    console.log(`Current Favorite Number: ${currentFavoriteNumber}`)
    console.log("Updating favorite number...")
    let transactionResponse = await contract.store("1000000000000000000000000")
    let transactionReceipt = await transactionResponse.wait()
    currentFavoriteNumber = await contract.retrieveFavouriteNumber()
    console.log(`New Favorite Number: ${currentFavoriteNumber}`)
    // console.log("Let's deploy with only transaction data");
    // const nonce = await wallet.getTransactionCount();
    // const tx = {
    //   nonce: nonce,
    //   gasPrice: 2000000000,
    //   gasLimit: 1000000,
    //   to: null,
    //   value: 0,
    //   data: "0x608060405260016000806101000a81548160ff02191690831515021790555060056001556040518060400160405280600481526020017f46697665000000000000000000000000000000000000000000000000000000008152506002908051906020019061006e92919061011e565b507ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb60035573f3be332dc592f04fa10e9dfe27c809de09f52ed8600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f436174000000000000000000000000000000000000000000000000000000000060055534801561011857600080fd5b50610221565b82805461012a906101f0565b90600052602060002090601f01602090048101928261014c5760008555610193565b82601f1061016557805160ff1916838001178555610193565b82800160010185558215610193579182015b82811115610192578251825591602001919060010190610177565b5b5090506101a091906101a4565b5090565b5b808211156101bd5760008160009055506001016101a5565b5090565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061020857607f821691505b60208210810361021b5761021a6101c1565b5b50919050565b6107e2806102306000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80636f760f411161005b5780636f760f41146100da57806395ab4246146100f65780639b614d47146101145780639e7a13ad146101445761007d565b806343ede4ae146100825780634f2be91f146100a05780636057361d146100be575b600080fd5b61008a610175565b60405161009791906103ce565b60405180910390f35b6100a861017b565b6040516100b591906103ce565b60405180910390f35b6100d860048036038101906100d39190610429565b610184565b005b6100f460048036038101906100ef919061059c565b61018e565b005b6100fe61021e565b60405161010b91906103ce565b60405180910390f35b61012e600480360381019061012991906105f8565b610228565b60405161013b91906103ce565b60405180910390f35b61015e60048036038101906101599190610429565b610256565b60405161016c9291906106c9565b60405180910390f35b60015481565b60006002905090565b8060018190555050565b600660405180604001604052808381526020018481525090806001815401808255809150506001900390600052602060002090600202016000909190919091506000820151816000015560208201518160010190805190602001906101f4929190610312565b505050806007836040516102089190610735565b9081526020016040518091039020819055505050565b6000600154905090565b6007818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b6006818154811061026657600080fd5b906000526020600020906002020160009150905080600001549080600101805461028f9061077b565b80601f01602080910402602001604051908101604052809291908181526020018280546102bb9061077b565b80156103085780601f106102dd57610100808354040283529160200191610308565b820191906000526020600020905b8154815290600101906020018083116102eb57829003601f168201915b5050505050905082565b82805461031e9061077b565b90600052602060002090601f0160209004810192826103405760008555610387565b82601f1061035957805160ff1916838001178555610387565b82800160010185558215610387579182015b8281111561038657825182559160200191906001019061036b565b5b5090506103949190610398565b5090565b5b808211156103b1576000816000905550600101610399565b5090565b6000819050919050565b6103c8816103b5565b82525050565b60006020820190506103e360008301846103bf565b92915050565b6000604051905090565b600080fd5b600080fd5b610406816103b5565b811461041157600080fd5b50565b600081359050610423816103fd565b92915050565b60006020828403121561043f5761043e6103f3565b5b600061044d84828501610414565b91505092915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6104a982610460565b810181811067ffffffffffffffff821117156104c8576104c7610471565b5b80604052505050565b60006104db6103e9565b90506104e782826104a0565b919050565b600067ffffffffffffffff82111561050757610506610471565b5b61051082610460565b9050602081019050919050565b82818337600083830152505050565b600061053f61053a846104ec565b6104d1565b90508281526020810184848401111561055b5761055a61045b565b5b61056684828561051d565b509392505050565b600082601f83011261058357610582610456565b5b813561059384826020860161052c565b91505092915050565b600080604083850312156105b3576105b26103f3565b5b600083013567ffffffffffffffff8111156105d1576105d06103f8565b5b6105dd8582860161056e565b92505060206105ee85828601610414565b9150509250929050565b60006020828403121561060e5761060d6103f3565b5b600082013567ffffffffffffffff81111561062c5761062b6103f8565b5b6106388482850161056e565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561067b578082015181840152602081019050610660565b8381111561068a576000848401525b50505050565b600061069b82610641565b6106a5818561064c565b93506106b581856020860161065d565b6106be81610460565b840191505092915050565b60006040820190506106de60008301856103bf565b81810360208301526106f08184610690565b90509392505050565b600081905092915050565b600061070f82610641565b61071981856106f9565b935061072981856020860161065d565b80840191505092915050565b60006107418284610704565b915081905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061079357607f821691505b6020821081036107a6576107a561074c565b5b5091905056fea264697066735822122003090cf9883c266234e617ba8cd2ba0e3d98768e4e47c761ec54a51e41a8bbb464736f6c634300080e0033",
    //   chainId: 1337,
    // };
    // //sign the transaction
    // //const signedTransaction = await wallet.signTransaction(tx);
    // // send the transation
    // const sendTransaction = await wallet.sendTransaction(tx);
    // await sendTransaction.wait(1);
    // console.log(sendTransaction);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
