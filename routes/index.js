const router = require("express").Router();

// route api
router.use("/", require("./api"));

module.exports = router;
