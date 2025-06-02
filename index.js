const express = require('express');
const axios = require('axios');
const app = express();

const AUTH_TOKEN = process.env.AUTH_TOKEN; // Set this in Render Dashboard

app.get('/', async (req, res) => {
  const token = req.headers['x-auth-token'];

  if (token !== AUTH_TOKEN) {
    return res.status(403).send('Forbidden: Invalid token');
  }

  const url = 'https://eo4r3r1fwqu0t31.m.pipedream.net' + req.originalUrl;

  try {
    const response = await axios.get(url);
    res.status(response.status).send(response.data);
  } catch (err) {
    console.error('Proxy error:', err.message);
    res.status(500).send('Proxy error: ' + err.message);
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
