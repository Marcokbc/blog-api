import * as yup from "yup";

export const categorySchema = yup.object({
  name: yup.string().min(3).max(100).required(),
});
