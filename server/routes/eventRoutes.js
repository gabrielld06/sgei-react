import express from "express";
import {getEventByName, getEvents, getUserEvents, newEvent, updateEvent} from "../../src/controller/EventController/eventController.js";

const router = express.Router();

router.route('/').post(getEvents);
router.route('/getEventByName').post(getEventByName);
router.route('/getUserEvents').post(getUserEvents);
router.route('/newEvent').post(newEvent);
router.route('/updateEvent').post(updateEvent);

export default router;