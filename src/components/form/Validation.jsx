function isEmail(string) {
  const re =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  return re.test(string);
}

export function email(value) {
  return value && !isEmail(value.trim()) ? "Invalid email" : null;
}

function isDirty(value) {
  return value || value === 0;
}

export function required(requiredFields, values) {
  return requiredFields.reduce(
    (fields, field) => ({
      ...fields,
      ...(isDirty(values[field]) ? undefined : { [field]: "Required" }),
    }),
    {}
  );
}

export function checkPasswords(values) {
  const { password, confirmPassword } = values;
  const errors = {};

  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}
