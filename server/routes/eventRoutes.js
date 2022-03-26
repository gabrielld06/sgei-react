import express from "express";
import getEvents from "../../src/controller/EventController/eventController.js";

const router = express.Router();

router.route('/').get(getEvents);
// router.post('/api/users', registerUser);

export default router;