import express from "express";
import {getEvents, newEvent, updateEvent} from "../../src/controller/EventController/eventController.js";

const router = express.Router();

router.route('/').post(getEvents);
router.route('/newEvent').post(newEvent);
router.route('/updateEvent').post(updateEvent);

export default router;