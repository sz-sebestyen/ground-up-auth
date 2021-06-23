const express = require("express");
const router = express.Router();

router.get("/private", require("../controllers/private"));
router.get("/public", require("../controllers/public"));
router.get("/unique", require("../controllers/unique"));

router.post("/signup", require("../controllers/signup"));
router.post("/login", require("../controllers/login"));
router.post("/confirm", require("../controllers/confirm"));
router.post("/reset", require("../controllers/reset"));

module.exports = router;
