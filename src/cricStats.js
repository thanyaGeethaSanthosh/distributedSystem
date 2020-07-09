const fetch = require('node-fetch');

const getPlayerId = function (playerName) {
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

const doRequiredOperation = function ({ playerName, type }) {
  if (type === 'query') {
    return new Promise((resolve, reject) => {
      getPlayerId(playerName).then((playerDetails) => {
        // console.log(`hello ${JSON.stringify(playerDetails)[0].pid}`)
        getCricketStats(playerDetails[0].pid).then((res) => resolve(res));
      });
    });
  }
  return new Promise((resolve, reject) => {
    getPlayerId(playerName).then((res) => {
      console.table(res);
      resolve(res);
    });
  });
};

module.exports = { getCricketStats, getPlayerId, doRequiredOperation };
