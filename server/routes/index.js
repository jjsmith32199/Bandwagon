const router = require('express').Router();
const path = require('path');
const api = require('./api');

router.use('/api', api);

router.use((req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
  });

module.exports = router;