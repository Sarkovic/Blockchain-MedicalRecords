const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledRecord = require('./build/Record.json');

// Link to Goerli network using Infura and providing the seed phrase of a Goerli wallet
const provider = new HDWalletProvider(
    'lunch cube absurd soft piece across uncle tip brave bone neither loan',
    'https://goerli.infura.io/v3/4b5d05281dbd45c59c25ad6f29acc6f3'
);

const web3 = new Web3(provider);

const deploy = async () => {
    try {
        const accounts = await web3.eth.getAccounts();

        console.log('Attempting to deploy from account', accounts[0]);

        // Deploy contract to Goerli network
        const contract = await new web3.eth.Contract(JSON.parse(compiledRecord.interface))
            .deploy({ data: '0x' + compiledRecord.bytecode }) // Add '0x' prefix to bytecode
            .send({ gas: '5000000', from: accounts[0] }); // Adjust gas limit

        // Display the address of the deployed contract
        console.log('Contract deployed to', contract.options.address);

        // Always go to record.js after updating the solidity code
    } catch (error) {
        console.error('Error deploying contract:', error.message);
    }
};

deploy();
