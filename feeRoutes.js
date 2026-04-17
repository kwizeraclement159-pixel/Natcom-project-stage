const express = require("express");
const router = express.Router();

const feeController = require("../controllers/feeController");


router.post("/pay", feeController.payFee);
router.get("/transactions", feeController.getTransactions);

module.exports = router;