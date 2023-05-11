require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const clientId = process.env.SEATGEEK_CLIENT_ID;

router.get('/', async (req, res) => {
  try {
    const query = req.query.query;
    const url = `https://api.seatgeek.com/2/events?client_id=${clientId}&q=${query}`;

    const response = await axios.get(url);

    const eventsData = response.data;

    // ... rest of the code
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
