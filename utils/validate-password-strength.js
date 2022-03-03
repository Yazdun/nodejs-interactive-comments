const { passwordStrength } = require("check-password-strength");
const { BadRequestError } = require("../errors");

const validatePasswordStrength = (password) => {
  if (passwordStrength(password).id < 1)
    throw new BadRequestError("Password is weak");
  return;
};

module.exports = validatePasswordStrength;
