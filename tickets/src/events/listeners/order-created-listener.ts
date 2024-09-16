import { Listener, OrderCreatedEvent, Subjects } from "@thinkingcorp/common";
import { queueGrouName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGrouName = queueGrouName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    //find ticket that order is reserving
    const ticket = await Ticket.findById(data.ticket.id);

    //if no ticket, throw error
    if (!ticket) {
      throw new Error("Ticket not found");
    }

    //mark ticket as being reserved by settings its orderId property
    ticket.set({ orderId: data.id });

    //save ticket
    await ticket.save();
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      version: ticket.version,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      orderId: ticket.orderId,
    });

    //ack message
    msg.ack();
  }
}
