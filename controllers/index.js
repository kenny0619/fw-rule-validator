const asyncHandler = require("../middleware/async");
const personalData = require("../db/db");
const validator = require("../middleware/validation");

/**
 *@desc GET My Details (Homepage)
 *@routes GET /
 *@access Public
 */
exports.getMe = asyncHandler(async (req, res) => {
  const data = personalData;
  res.status(200).json({
    message: "My Rule-Validation API",
    status: "success",
    data: data,
  });
});

/**
 *@desc Validate a Rule
 *@routes POST /validate-rule
 *@access Public
 */
exports.validateRule = asyncHandler(async (req, res, next) => {
  // obtain data from the json passed to the body
  const passedData = req.body;

  const rule = passedData.rule;
  const data = passedData.data;

  // check for rule field
  if (!rule) {
    return res.status(400).json({
      message: `rule is required.`,
      status: "error",
      data: null,
    });
  }

  // check that rule is an object
  if (typeof rule !== "object") {
    console.log(typeof rule);
    return res.status(400).json({
      message: `rule should be an object.`,
      status: "error",
      data: null,
    });
  }

  //destructure fields from rule
  // { condition, condition_value, field } = rule;
  const condition_value = rule.condition_value;
  const field = rule.field;
  const condition = rule.condition;

  // check to see that all rule fields are provided
  if (!data[field]) {
    return res.status(400).json({
      message: `field ${field} is missing from data.`,
      status: "error",
      data: null,
    });
  }

  if (!condition) {
    return res.status(400).json({
      message: `condition is required.`,
      status: "error",
      data: null,
    });
  }

  if (!condition_value) {
    return res.status(400).json({
      message: `condition_value is required.`,
      status: "error",
      data: null,
    });
  }

  // check for data
  if (!data) {
    return res.status(400).json({
      message: `data is required.`,
      status: "error",
      data: null,
    });
  }

  // check for condition field in data provided
  if (!field in data) {
    return res.status(400).json({
      message: `field ${field} is missing from data.`,
      status: "error",
      data: null,
    });
  }

  const field_value = data[field];

  // check for data types of values of field with conditions gt, gte, eq, neq
  if (
    condition in ["gt", "gte", "eq", "neq"] &&
    typeof field_value !== "number"
  ) {
    return res.status(400).json({
      message: `${field} should be a number.`,
      status: "error",
      data: null,
    });
  }

  // check for data type of field with condition contains
  if (condition === "contains" && typeof field_value !== "string") {
    return res.status(400).json({
      message: `${field} should be a string.`,
      status: "error",
      data: null,
    });
  }

  // perform rule validation
  const isValid = validator(condition, condition_value, field_value);

  // check for validation success/fail
  if (!isValid) {
    return res.status(400).json({
      message: `field ${field} failed validation.`,
      status: "error",
      data: {
        validation: {
          error: true,
          field,
          condition,
          condition_value,
        },
      },
    });
  }

  // client response in jsend format
  return res.status(200).json({
    message: `field ${field} successfully validated.`,
    status: "success",
    data: {
      validation: {
        error: false,
        field,
        field_value,
        condition,
        condition_value,
      },
    },
  });
});
