const asyncHandler = require("../middleware/async");
const personalData = require("../db/db");

/**
 *@desc GET My Details (Homepage)
 *@routes GET /
 *@access Public
 */
exports.getMe = asyncHandler(async (req, res) => {
  const data = personalData;
  res.status(200).json({
    message: "My Rule-Validation API",
    success: "success",
    data: data,
  });
});

/**
 *@desc Validate a Rule
 *@routes POST /validate-rule
 *@access Public
 */
exports.validateRule = asyncHandler(async (req, res) => {
  // obtain data from the json passed to the body
  const { rule, data } = req.body;

  // check for rule field
  if (rule === undefined) {
    return res.status(400).json({
      message: `rule is required.`,
      success: "error",
      data: null,
    });
  }
  // check for data field
  if (data === undefined) {
    return res.status(400).json({
      message: `data is required.`,
      success: "error",
      data: null,
    });
  }

  if (rule.field in data) {
    console.log(data[rule.field]);
  }

  res.status(200).json({
    success: "success",
    data: data,
  });
});
