import { Router } from "express";
import { TicketController } from "./controller";
import { TicketService } from "../services/ticket.service";

export class TicketsRoutes {
    static get routes() {
        const router = Router();

        const ticketService = new TicketService();
        const controller = new TicketController(ticketService);

        router.get('/', controller.getTickets);
        router.get('/last', controller.getLastTicketNumber);
        router.get('/pending', controller.getPendingTickets);

        router.post('/', controller.createTicket);
        router.post('/draw/:desk', controller.drawTicket);

        router.put('/done/:ticketId', controller.ticketFinished);

        router.get('/working-on', controller.workingOn);

        return router;
    }
}