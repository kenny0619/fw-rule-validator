// import express router as router
const router = require("express").Router();

const { getMe, validateRule } = require("../../controllers/index");

//mount routers
router.get("/", getMe);

router.post("/validate-rule", validateRule);

module.exports = router;
