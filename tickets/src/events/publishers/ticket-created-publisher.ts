import { Publisher, Subjects, TicketCreatedEvent } from "@thinkingcorp/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
