const express = require("express");
const router = express.Router();

const { getContractFunctions } = require("../controllers/contractFunctions");
const { getContractFunction } = require("../controllers/contractFunctions");
const { updateContractFunction } = require("../controllers/contractFunctions");

// router.get('/search', getContractFunctionBySearch);
router.get('/', getContractFunctions);
router.get('/:id', getContractFunction);
router.patch('/:id', updateContractFunction);
// router.get('/:id', getContractFunction);

module.exports = router;