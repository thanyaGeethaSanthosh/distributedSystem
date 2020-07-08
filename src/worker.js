const redis = require('redis');
const client = redis.createClient({ db: 1 });
const { getCricStats, getPlayerId } = require('./cricStats');
const { get, completedProcessing } = require('./processRequest');

const getJob = function () {
  return new Promise((resolve, reject) => {
    client.brpop('reqList', 1, (err, res) => {
      if (res) {
        resolve(res[1]);
      } else {
        reject('no job');
      }
    });
  });
};

const runLoop = function () {
  getJob()
    .then((id) => {
      get(client, id).then((cricSet) => {
        getPlayerId(cricSet)
          .then((json) => {
            completedProcessing(client, id, json);
            return id;
          })
          .then((id) => console.log('finished', id))
          .then(runLoop);
      });
    })
    .catch(runLoop);
};

runLoop();
