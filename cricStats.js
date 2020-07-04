const fetch = require('node-fetch');

const getStatus = function () {
  for (let i = 0; i < 1500; i++) {
    let a = 5 + 4;
  }
  return new Promise((resolve, reject) => {
    fetch('https://cricapi.com/api/matches/', {
      method: 'GET',
      headers: { apikey: 'cSxbHiiXYGXEKTF2ORbwuwWHvqH2' },
    }).then((response) => {
      let status = response.json();
      resolve(status);
    });
  });
};

module.exports = { getStatus };
