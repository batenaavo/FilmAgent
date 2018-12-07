const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/films', require('./films'));
router.use('/torrents', require('./torrents'));


module.exports = router;