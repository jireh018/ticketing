import { Publisher, OrderCreatedEvent, Subjects } from "@thinkingcorp/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
