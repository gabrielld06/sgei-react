import express from "express";
import { getPresentations, newPresentation, updatePresentation, getUserPresentations, getPresentationsByEvent } from "../../src/controller/PresentationController/presentationController.js";

const router = express.Router();

router.route('/').post(getPresentations);
router.route('/newPresentation').post(newPresentation);
router.route('/updatePresentation').post(updatePresentation);
router.route('/getUserPresentations').post(getUserPresentations);
router.route('/getPresentationsByEvent').post(getPresentationsByEvent);

export default router;