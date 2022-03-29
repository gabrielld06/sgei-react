import express from "express";
import {getFilterEvents, newEvent} from "../../src/controller/EventController/eventController.js";

const router = express.Router();

// router.route('/').get(getEvents);
router.route('/').post(getFilterEvents);
router.route('/newEvent').post(newEvent);
// router.post('/api/users', registerUser);

export default router;