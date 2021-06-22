const express = require("express");
const router = express.Router();

router.get("/private", require("../controllers/api/private"));
router.get("/public", require("../controllers/api/public"));
router.post("/signup", require("../controllers/api/signup"));
router.post("/login", require("../controllers/api/login"));
router.post("/username", require("../controllers/api/email"));
router.post("/email", require("../controllers/api/username"));

module.exports = router;
