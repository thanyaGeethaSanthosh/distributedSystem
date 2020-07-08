const fetch = require('node-fetch');

const getPlayerId = function ({ playerName, type }) {
  return new Promise((resolve, reject) => {
    fetch(`https://cricapi.com/api/playerFinder/?name=${playerName}`, {
      method: 'GET',
      headers: { apikey: 'cSxbHiiXYGXEKTF2ORbwuwWHvqH2' },
    })
      .then((res) => res.json())
      .then((res) => {
        resolve(res.data);
      });
  });
};

const getCricketStats = function (pid) {
  return new Promise((resolve, reject) => {
    fetch(`https://cricapi.com/api/playerStats/?pid=${pid}`, {
      method: 'GET',
      headers: { apikey: 'cSxbHiiXYGXEKTF2ORbwuwWHvqH2' },
    })
      .then((res) => res.json())
      .then((res) => {
        resolve(res.data);
      });
  });
};

module.exports = { getCricketStats, getPlayerId };
