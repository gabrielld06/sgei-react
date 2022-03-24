import express from "express";
import registerUser from "../controllers/userController.js";

const router = express.Router();

router.route('/').post(registerUser);
// router.post('/api/users', registerUser);

export default router;