const express = require('express');

const app = express();
const port = 1337;

app.use(express.static('public'));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening at http://localhost:${port}`);
});
