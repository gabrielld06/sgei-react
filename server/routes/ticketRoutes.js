import express from "express";
import { newTicket, getUserTickets, getTickets } from "../../src/controller/TicketController/ticketController.js";

const router = express.Router();

router.route('/').post(newTicket);
router.route('/getUserTickets').post(getUserTickets);
router.route('/getTickets').post(getTickets);

export default router;