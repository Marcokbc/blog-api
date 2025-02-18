import * as yup from "yup";

export const userSchema = yup.object({
  username: yup.string().min(3).max(20).required(),
  password: yup.string().min(6).required(),
});
