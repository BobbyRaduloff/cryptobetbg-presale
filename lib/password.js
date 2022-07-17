import * as passwordValidator from "password-validator";

export const saltRounds = 10;

export function checkPassword(password) {
  const schema = new passwordValidator();
  schema
    .is()
    .min(8)
    .is()
    .max(100)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits(1);

  return schema.validate(password);
}
