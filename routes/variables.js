const express = require("express");
const router = express.Router();

const { getVariables } = require("../controllers/variables");

// router.get('/search', getContractFunctionBySearch);
router.get('/', getVariables);
// router.get('/:id', getContractFunction);
// router.get('/:id', getContractFunction);

module.exports = router;