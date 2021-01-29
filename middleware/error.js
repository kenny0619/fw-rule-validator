const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  //make a copy from the err object
  let error = { ...err };

  // set message of err to error
  error.message = err.message;

  // Invalid json payload
  if (err.name === "SyntaxError") {
    const message = `Invalid JSON payload passed.`;
    error = new ErrorResponse(message, 400);
  }

  // client response
  console.log(error);
  return res.status(error.statusCode).json({
    message: error.message,
    status: "error",
    data: null,
  });
};

module.exports = errorHandler;
