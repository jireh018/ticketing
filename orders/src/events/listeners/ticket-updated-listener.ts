import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketUpdatedEvent } from "@thinkingcorp/common";
import { Ticket } from "../../models/ticket";
import { queueGrouName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGrouName = queueGrouName;

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const { id, title, price } = data;
    const ticket = await Ticket.findByEvent(data);

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    ticket.set({
      title,
      price,
    });
    await ticket.save();

    msg.ack();
  }
}
