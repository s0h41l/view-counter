const express = require('express');
const router = express.Router();
const { getPage, getCode } = require('../controllers/main');



router.get('/', getPage);
router.post('/getCode', getCode);


module.exports = router;