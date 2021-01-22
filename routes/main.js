const express = require('express');
const router = express.Router();
const { getPage, getCode, getAllCodes } = require('../controllers/main');



router.get('/', getPage);
router.post('/getCode', getCode);
router.post('/all', getAllCodes);

module.exports = router;