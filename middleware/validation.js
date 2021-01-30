// create a validation function
const validator = (condition, condition_value, field_value) => {
  let isValid;
  switch (condition) {
    case "eq":
      return (isValid = field_value === condition_value);

    case "neq":
      return (isValid = field_value !== condition_value);

    case "gt":
      return (isValid = field_value > condition_value);

    case "gte":
      return (isValid = field_value >= condition_value);

    case "contains":
      return (isValid = field_value.includes(condition_value));

    default:
      console.log(`${condition} is not accepted`);
  }
};

module.exports = validator;
