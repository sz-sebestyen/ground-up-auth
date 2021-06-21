const express = require("express");
const router = express.Router();
const privateApiController = require("../controllers/api/private");
const publicApiController = require("../controllers/api/public");
const signupApiController = require("../controllers/api/signup");

router.get("/private", privateApiController);
router.get("/public", publicApiController);
router.post("/signup", signupApiController);

module.exports = router;
