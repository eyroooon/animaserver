const express = require("express");
const router = express.Router();

const { getCategories } = require("../controllers/categories");

// router.get('/search', getContractFunctionBySearch);
router.get('/', getCategories);
// router.get('/:id', getContractFunction);
// router.get('/:id', getContractFunction);

module.exports = router;