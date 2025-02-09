import express from "express";
import {validationUserSchema} from "../middleware/validationUserSchema.js"
import {verifyToken} from "../middleware/verifyToken.js"
import {
  register,
  login,
  getCurrentUser,
  updateUser,
  deleteUser,
} from "../controller/user.controller.js";

const router = express.Router();

router.route("/")
                 .get(verifyToken,getCurrentUser)
                 .patch(verifyToken,validationUserSchema(),updateUser)
                 .delete(verifyToken,deleteUser);


router.route("/register")
                 .post(register);


router.route("/login")
                 .post(login);

export default router;