import express from "express";
import { newTicket } from "../../src/controller/TicketController/ticketController.js";

const router = express.Router();

router.route('/').post(newTicket);

export default router;