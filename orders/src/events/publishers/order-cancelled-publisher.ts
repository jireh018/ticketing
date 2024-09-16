import { Publisher, Subjects, OrderCancelledEvent } from "@thinkingcorp/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
