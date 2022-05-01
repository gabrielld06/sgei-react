import express from "express";
import { newPresentation, updatePresentation, getUserPresentations, getPresentationsByEvent, getUserPresentationByNameAndEvent, getPresentationByNameAndEvent } from "../../src/controller/PresentationController/presentationController.js";

const router = express.Router();
router.route('/newPresentation').post(newPresentation);
router.route('/updatePresentation').post(updatePresentation);
router.route('/getUserPresentations').post(getUserPresentations);
router.route('/getPresentationsByEvent').post(getPresentationsByEvent);
router.route('/getUserPresentationByNameAndEvent').post(getUserPresentationByNameAndEvent);
router.route('/getPresentationByNameAndEvent').post(getPresentationByNameAndEvent);

export default router;