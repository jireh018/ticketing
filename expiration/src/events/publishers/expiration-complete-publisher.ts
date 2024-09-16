import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@thinkingcorp/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
