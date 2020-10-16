import * as yup from "yup";
import { UserRegisterInput } from "../resolvers/types";

let userRegisterSchema = yup.object().shape({
  username: yup.string().required().min(2).max(50),
  password: yup.string().required().min(2).max(50),
  email: yup.string().required().email()
});

const convertYupErrors = (yupErrors: yup.ValidationError) => {
  let errors: any = [];

  yupErrors.inner.forEach(e =>
    errors.push({ fieldname: e.path, message: e.message })
  );

  return errors;
};

export const validateUserCredentials = async (user: UserRegisterInput) => {
  try {
    await userRegisterSchema.validate(user, { abortEarly: false });
    return [];
  } catch (e) {
    return convertYupErrors(e);
  }
};
