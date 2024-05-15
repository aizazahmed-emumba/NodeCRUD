import express from "express";
import validate from "../middleware/validateMiddleware.js";
import { logInSchema, refreshTokenSchema } from "../schema/authValidation.js";
import { login, logout, refreshToken } from "../controller/authController.js";

const router = express.Router();

router
  .route("/")
  .post(validate(logInSchema), login)
  .delete(validate(refreshTokenSchema), logout);

router.route("/refresh").post(validate(refreshTokenSchema), refreshToken);

export default router;
