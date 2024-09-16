import { Publisher, Subjects, TicketUpdatedEvent } from "@thinkingcorp/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
