import express from "express";
import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controller/userController.js";
import validate from "../middleware/validateMiddleware.js";
import {
  createUserSchema,
  deleteUserSchema,
  getUserByIdSchema,
  updateUserSchema,
} from "../schema/userSchema.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
const router = express.Router();

router
  .route("/")
  .get(isAuthenticated, getUsers)
  .post(validate(createUserSchema), createUser);
router
  .route("/:id")
  .get(validate(getUserByIdSchema), getUserById)
  .put(validate(updateUserSchema), updateUser)
  .delete(validate(deleteUserSchema), deleteUser);

export default router;
