import express from "express";
import { getPresentations, newPresentation } from "../../src/controller/PresentationController/presentationController.js";

const router = express.Router();

router.route('/').post(getPresentations);
router.route('/newPresentation').post(newPresentation);

export default router;