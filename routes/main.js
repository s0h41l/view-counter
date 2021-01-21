const express = require('express');
const router = express.Router();
const { getPage } = require('../controllers/main');



router.get('/', getPage);


module.exports = router;