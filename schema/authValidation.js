import * as yup from "yup";

export const signUpSchema = yup.object({
  body: yup.object({
    userName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  }),
  params: yup.mixed().notRequired(),
  query: yup.mixed().notRequired(),
});

export const logInSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
    password: yup
      .string()
      .required()
      .min(4, "Password is too short - should be 8 chars minimum."),
  }),
  params: yup.mixed().notRequired(),
  query: yup.mixed().notRequired(),
});

export const refreshTokenSchema = yup.object({
  body: yup.object({
    refreshToken: yup.string().required(),
  }),
  params: yup.mixed().notRequired(),
  query: yup.mixed().notRequired(),
});
