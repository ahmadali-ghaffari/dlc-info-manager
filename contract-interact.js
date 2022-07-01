'use strict';

const web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/v3/585c702a404445a3ac698bef40a64243"));
const CONTRACT_ADDRESS = "0x365441EC0974F6AC9871c704128e9da2BEdE10CE";
const API_KEY = "854HHTC4MKJAJWY9TK1FZYZ7NY3IJMKTDH";

const container = document.querySelector(".container");
const openDLCCountSpan = document.querySelector(".open-dlc-count");

if (!web3.utils.isAddress(CONTRACT_ADDRESS)) {
  console.log("Not Valid Contract Address");
};

axios.get(`https://api-kovan.etherscan.io/api?module=contract&action=getabi&address=${CONTRACT_ADDRESS}&apikey=${API_KEY}`)
  .then(response => {
    var contractABI = "";
    contractABI = JSON.parse(response.data.result);
    if (contractABI != '') {
      // console.log(contractABI[22]);
      console.log("\n\n");
      const contractDetails = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS);

      console.log(contractDetails.methods, '============> ALL THE METHODS');
      console.log(Math.floor(Date.now() / 1000), 'CURRENT TIME!');

      contractDetails.methods.allOpenDLC().call({ from: CONTRACT_ADDRESS }, function (error, result) {
        console.log("OPEN DLC's: ", result.length, Array.isArray(result));
        openDLCCountSpan.textContent = `The number of open DLC = ${result.length}`;
      });

      contractDetails.methods.requestCreateDLC(CONTRACT_ADDRESS, 1656700649, 1656700348).call({ from: CONTRACT_ADDRESS }, function (error, result) {
        console.log("Result of symbol: " + result);
      });
    } else {
      console.log(`Error fetching ABI contract for address ${CONTRACT_ADDRESS}`);
    }
  })
  .catch(error => {
    console.log(error);
  });

const btn = document.querySelector('button');

btn.onclick = () => {
  console.log('hello');
};
