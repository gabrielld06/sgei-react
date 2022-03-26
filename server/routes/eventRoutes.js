import express from "express";
import getFilterEvents from "../../src/controller/EventController/eventController.js";

const router = express.Router();

// router.route('/').get(getEvents);
router.route('/').post(getFilterEvents);
// router.post('/api/users', registerUser);

export default router;