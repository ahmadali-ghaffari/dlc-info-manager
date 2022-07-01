'use strict';

const web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/v3/585c702a404445a3ac698bef40a64243"))

const CONTRACT_ADDRESS = "0x365441EC0974F6AC9871c704128e9da2BEdE10CE"
if(!web3.utils.isAddress(CONTRACT_ADDRESS)){
  console.log("Not Valid Contract Address")
}

axios.get(`https://api-kovan.etherscan.io/api?module=contract&action=getabi&address=0x365441EC0974F6AC9871c704128e9da2BEdE10CE&apikey=854HHTC4MKJAJWY9TK1FZYZ7NY3IJMKTDH`)
    .then(response => {
        var contractABI = "";
        contractABI = JSON.parse(response.data.result);
        if (contractABI != ''){
            console.log(contractABI) // prints ABI to reveal functions, event and other data we can play with.
            console.log("\n\n")
            const contractDetails = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS)

            //get symbol for given contract 
            contractDetails.methods.symbol().call({ from: CONTRACT_ADDRESS }, function (error, result) {
                console.log("Result of symbol: " + result)
            });

            //get isMintedBeforeReveal for given contract  against Index 1
            contractDetails.methods.isMintedBeforeReveal(1).call({ from: CONTRACT_ADDRESS }, function (error, result) {
                console.log("Result of isMintedBeforeReveal: " + result)
            });
        } 
        else {
            console.log(`Error fetching ABI contract for address ${CONTRACT_ADDRESS}`);
        }            
    })
    .catch(error => {
        console.log(error);
});











// const API_KEY = process.env.API_KEY;
// const PRIVATE_KEY = process.env.PRIVATE_KEY;
// const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const btn = document.querySelector('button');

btn.onclick = () => {
  console.log('hello');
};

// var Web3 = require('web3');
// var web3 = new Web3(new Web3.providers.HttpProvider());
// var version = web3.version.api;
        
// $.getJSON('https://api-kovan.etherscan.io/api?module=contract&action=getabi&address=0x365441EC0974F6AC9871c704128e9da2BEdE10CE', function (data) {
//     var contractABI = "";
//     contractABI = JSON.parse(data.result);
//     if (contractABI != ''){
//         var MyContract = web3.eth.contract(contractABI);
//         var myContractInstance = MyContract.at("0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359");
//         var result = myContractInstance.memberId("0xfe8ad7dd2f564a877cc23feea6c0a9cc2e783715");
//         console.log("result1 : " + result);            
//         var result = myContractInstance.members(1);
//         console.log("result2 : " + result);
//     } else {
//         console.log("Error" );
//     }            
// });