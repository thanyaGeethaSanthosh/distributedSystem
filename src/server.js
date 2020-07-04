const express = require('express');
const app = express();
const redis = require('redis');
const client = redis.createClient({ db: 1 });

const { get, addRequest } = require('./processRequest');

const PORT = 8000;

app.use((req, res, next) => {
  console.log(`${req.method}, ${req.url}`);
  next();
});

app.get('/status/:id', (req, res) => {
  get(client, req.params.id).then((cricStats) => {
    console.log(cricStats);
    res.send(JSON.stringify(cricStats));
  });
});

app.post('/cricInfo/:playerName', (req, res) => {
  addRequest(client, req.params).then((id) => {
    res.send(`id:${id}`);
    res.end();
    client.lpush('reqList', id, () => {});
  });
});

app.listen(PORT, () => console.log(`server started listening on port ${PORT}`));
