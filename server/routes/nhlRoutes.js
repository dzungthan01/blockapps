const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/summary', async (req, res) => {
  try {
    const response = await axios.get('https://api.nhle.com/stats/rest/en/team/summary');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching NHL summary data' });
  }
});

router.get('/stats/:teamAbbr', async (req, res) => {
  try {
    const { teamAbbr } = req.params;
    const response = await axios.get(`https://api-web.nhle.com/v1/club-stats-season/${teamAbbr}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: `Error fetching stats for team ${teamAbbr}` });
  }
});

router.get('/stats/:teamAbbr/:seasonId/:game', async (req, res) => {
  try {
    const { teamAbbr, seasonId, game } = req.params;
    const url = `https://api-web.nhle.com/v1/club-stats/${teamAbbr}/${seasonId}/${game}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: `Error fetching stats for team ${teamAbbr}` });
  }
});

module.exports = router;
