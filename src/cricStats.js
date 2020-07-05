const fetch = require('node-fetch');

const getCricketStats = function ({ pid, field, format }) {
  for (let i = 0; i < 1500; i++) {
    let a = 5 + 4;
  }
  return new Promise((resolve, reject) => {
    fetch(`https://cricapi.com/api/playerStats/?pid=${pid}`, {
      method: 'GET',
      headers: { apikey: 'cSxbHiiXYGXEKTF2ORbwuwWHvqH2' },
    })
      .then((res) => res.json())
      .then((res) => {
        console.table(res.data[field][format]);
        resolve(res.data[field][format]);
      });
  });
};

module.exports = getCricketStats;
