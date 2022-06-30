'use strict';

const btn = document.querySelector('button');

window.onload = () => {
  getAllDLC()
    .then(data => {
      const allDLC = data.result;
      const containerDiv = document.querySelector('.container');
      const dlcCount = document.createElement('span');
      const newHr = document.createElement('hr');
      const dlcCountParagraph = document.createElement('p');
      dlcCount.className = 'dlc-count';
      dlcCount.innerText = allDLC.length;
      dlcCountParagraph.textContent = `number of DLC's being tracked by the contract:`;
      dlcCountParagraph.className = 'dlc-count-info';
      containerDiv.appendChild(dlcCountParagraph);
      containerDiv.appendChild(dlcCount);
      containerDiv.appendChild(newHr);
      for (let i = 0; i < allDLC.length; i++) {
        const newUl = document.createElement('ul');
        const newLi = document.createElement('li');
        newLi.className = 'dlc-details';
        newLi.innerText = `DLC ${i+1} - blockNumber: ${allDLC[i].blockNumber}, timeStamp: ${allDLC[i].timeStamp}, gasUsed: ${allDLC[i].gasUsed}, 
        blockHash: ${allDLC[i].blockHash}`
        containerDiv.appendChild(newLi);
      };

      console.log(allDLC[4]);
    })
    .catch(err => console.log('rejected', err.message));
};

const getAllDLC = async () => {
  const response = await fetch
    (
      `https://api-kovan.etherscan.io/api?module=account&action=txlist&address=0x365441EC0974F6AC9871c704128e9da2BEdE10CE
    &startblock=0&endblock=99999999&page=1&offset=10000&sort=asc&apikey=854HHTC4MKJAJWY9TK1FZYZ7NY3IJMKTDH`
    );
  if (response.status !== 200) {
    throw new Error('Cannot fetch the data!');
  };
  const data = await response.json();
  return data;
};

// btn.addEventListener('click', () => {
//   getJokes()
//     .then(data => {
//       const containerDiv = document.querySelector('.container');
//       const newUl = document.createElement('ul');
//       const newLi = document.createElement('li');
//       newLi.innerText = data.value.joke;
//       newUl.appendChild(newLi);
//       containerDiv.appendChild(newUl);
//     })
//     .catch(err => console.log('rejected', err.message));
// });
