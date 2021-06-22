const express = require("express");
const router = express.Router();
const privateApiController = require("../controllers/api/private");
const publicApiController = require("../controllers/api/public");
const signupApiController = require("../controllers/api/signup");
const emailApiController = require("../controllers/api/email");
const usernameApiController = require("../controllers/api/username");

router.get("/private", privateApiController);
router.get("/public", publicApiController);
router.post("/signup", signupApiController);
router.post("/username", emailApiController);
router.post("/email", usernameApiController);

module.exports = router;
