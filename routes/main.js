const express = require('express');
const router = express.Router();
const { getPage, getCode, getAllCodes } = require('../controllers/main');



router.get('/', getPage);
router.post('/getCode', getCode);
router.get('/all', getAllCodes);

module.exports = router;