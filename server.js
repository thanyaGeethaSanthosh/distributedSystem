const express = require('express');
const app = express();
const { getStatus } = require('./cricStats');

const PORT = 8000;

app.use((req, res, next) => {
  console.log(`${req.method}, ${req.url}`);
  next();
});

app.get('/status/', (req, res) => {
  getStatus().then((status) => {
    res.send(`status:${JSON.stringify(status)}`);
    res.end();
  });
});

app.listen(PORT, () => console.log(`server started listening on port ${PORT}`));
