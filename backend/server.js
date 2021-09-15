// Attention for launch this requested switched version Node js to 16.9.1
// Use nvm ls , nvm use node-version
// For launch this server API in directory amazona set --> npm start (launch express server)
// For automatic refresh server i install nodemon and in file package.json written script for start it

import express from 'express';
import data from './data.js';

const app = express();

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

app.get('/', (req, res) => {
  res.send('Server is ready');
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});