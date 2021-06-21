const express = require("express");
const router = express.Router();
const privateApiController = require("../controllers/api/private");
const publicApiController = require("../controllers/api/public");

router.get("/private", privateApiController);
router.get("/public", publicApiController);

module.exports = router;
