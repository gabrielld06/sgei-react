import express from "express";
import { registerUser, authUser, getUserInfos, updateUser } from "../../src/controller/UserController/userController.js";

const router = express.Router();

router.route('/').post(registerUser);
router.post("/login", authUser);
router.post("/getUserInfos", getUserInfos)
router.post("/updateUser", updateUser);
// router.post('/api/users', registerUser);

export default router;