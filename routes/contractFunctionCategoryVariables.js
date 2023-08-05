const express = require('express');
const router = express.Router();

const { createFCV, getFCVs, retrieveByAI, updateFCV } = require('../controllers/contractFunctionCategoryVariables');

router.get('/', getFCVs);
router.post('/', createFCV);
router.post('/retrieveByAI', retrieveByAI);
router.patch('/update', updateFCV);
// router.get('/:id', getContractFunction);
// router.get('/:id', getContractFunction);

module.exports = router;
