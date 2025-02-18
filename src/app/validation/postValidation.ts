import * as yup from "yup";

export const postSchema = yup.object({
  title: yup.string().min(3).max(255).required(),
  content: yup.string().nullable(),
  imageUrl: yup.string().url().nullable(),
  audioUrl: yup.string().url().nullable(),
  categories: yup
    .array()
    .of(yup.number().integer().positive())
    .min(1, "O post deve ter pelo menos uma categoria"),
});

export const postUpdateSchema = yup.object({
  title: yup.string().min(3).max(255),
  content: yup.string(),
  imageUrl: yup.string().url(),
  audioUrl: yup.string().url(),
  categories: yup
    .array()
    .of(yup.number().integer().positive())
    .min(1, "O post deve ter pelo menos uma categoria"),
});
