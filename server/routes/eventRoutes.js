import express from "express";
import {getEventByName, getEventPresentationsByName, getEvents, getUserEvents, newEvent, updateEvent} from "../../src/controller/EventController/eventController.js";

const router = express.Router();

router.route('/').post(getEvents);
router.route('/getEventByName').post(getEventByName);
router.route('/getEventPresentationsByName').post(getEventPresentationsByName);
router.route('/getUserEvents').post(getUserEvents);
router.route('/newEvent').post(newEvent);
router.route('/updateEvent').post(updateEvent);

export default router;