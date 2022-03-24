import express from "express";
import { registerUser, authUser } from "../../src/controller/UserController/userController.js";

const router = express.Router();

router.route('/').post(registerUser);
router.post("/login", authUser);
// router.post('/api/users', registerUser);

export default router;