import express from "express";
import {getEvents, getUserEvents, newEvent, updateEvent} from "../../src/controller/EventController/eventController.js";

const router = express.Router();

router.route('/').post(getEvents);
router.route('/getUserEvents').post(getUserEvents);
router.route('/newEvent').post(newEvent);
router.route('/updateEvent').post(updateEvent);

export default router;