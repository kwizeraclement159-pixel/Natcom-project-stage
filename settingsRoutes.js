const express = require("express");
const router = express.Router();

const settingsController = require("../controllers/settingsController");

router.get("/school-fee", settingsController.getSchoolFee);
router.put("/school-fee", settingsController.updateSchoolFee);

module.exports = router;