const validator = (condition, condition_value, rule_field) => {
  switch (condition) {
    case "eq":
      return rule_field === condition_value;
    case "neq":
      return rule_field !== condition_value;
    case "gt":
      return rule_field > condition_value;
    case "gte":
      return rule_field >= condition_value;
    case "contains":
      return rule_field.includes(condition_value);
    default:
      console.log(`${condition} is not accepted`);
  }
};
