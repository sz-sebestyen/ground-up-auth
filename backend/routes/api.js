const express = require("express");
const router = express.Router();

router.get("/private", require("../controllers/api/private"));
router.get("/public", require("../controllers/api/public"));
router.get("/unique", require("../controllers/api/unique"));

router.post("/signup", require("../controllers/api/signup"));
router.post("/login", require("../controllers/api/login"));
router.post("/confirm", require("../controllers/api/confirm"));

module.exports = router;
