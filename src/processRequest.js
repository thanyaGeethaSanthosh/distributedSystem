const get = function (client, id) {
  return new Promise((resolve, reject) => {
    client.hgetall(`job_${id}`, (err, res) => resolve(res));
  });
};

const getId = function (client) {
  return new Promise((resolve, reject) => {
    client.incr('id', (err, res) => {
      resolve(res);
    });
  });
};

const scheduleProcessing = function (client, id, params) {
  return new Promise((resolve, reject) => {
    const status = ['status', 'scheduled'];
    const receivedAt = ['receivedAt', new Date()];
    const list = Object.keys(params).reduce((list, key) => {
      return list.concat([key, params[key]]);
    }, []);
    client.hmset(`job_${id}`, list.concat(status, receivedAt), (err, res) => {
      resolve(id);
    });
  });
};

const completedProcessing = function (client, id, tags) {
  const status = ['status', 'completed'];
  const updatedTags = ['details', JSON.stringify(tags)];
  client.hmset(`job_${id}`, status.concat(updatedTags));
};

const addRequest = function (client, params) {
  return new Promise((resolve, reject) => {
    getId(client)
      .then((id) => scheduleProcessing(client, id, params))
      .then((resId) => resolve(resId));
  });
};

module.exports = { get, addRequest, getId, completedProcessing };
